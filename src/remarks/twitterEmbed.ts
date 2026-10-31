import type { Plugin } from 'unified';
import type { Root, Paragraph, Html } from 'mdast';
import type { Parent } from 'unist';

interface TweetOEmbedResponse {
  url: string;
  author_name: string;
  author_url: string;
  html: string;
  width: number | null;
  height: number | null;
  type: 'rich' | 'photo' | 'video' | 'link';
  cache_age: string;
  provider_name: string;
  provider_url: string;
  version: string;
}

const TWITTER_HOSTS = new Set([
  'x.com',
  'www.x.com',
  'mobile.x.com',
  'twitter.com',
  'www.twitter.com',
  'mobile.twitter.com',
]);

const isValidUrl = (urlString: string): boolean => {
  return URL.canParse(urlString);
}

const isTwitterUrl = (urlString: string): boolean => {
  if (!isValidUrl(urlString)) {
    return false;
  }
  const hostname = new URL(urlString).hostname.toLowerCase();
  return TWITTER_HOSTS.has(hostname);
}

const isTweetUrl = (urlString: string): boolean => {
  if (!isTwitterUrl(urlString)) {
    return false;
  }
  const regex = /^\/[^/]+\/status\/\d+/;
  const pathname = new URL(urlString).pathname;
  return regex.test(pathname);
}

const fetchOEmbed = async (url: string): Promise<string> => {
    const endpoint = new URL("https://publish.x.com/oembed");
    endpoint.searchParams.set("url", url);
    endpoint.searchParams.set("omit_script", "true");

    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`oEmbed API: HTTP ${response.status}`);

    const data: TweetOEmbedResponse = await response.json();
    if (typeof data.html !== "string") throw new Error("Invalid oEmbed response");

    return data.html;
}

const getRawUrl = (p: Paragraph): string | null => {
    if (p.children.length !== 1) return null;
    const child = p.children[0];

    if (child.type === "text") return child.value.trim();
    if (child.type === "link" && child.children.length === 1 && child.children[0].type === "text" && child.children[0].value.trim() === child.url) return child.url;
    return null;
}

export const remarkTwitterEmbed: Plugin<[], Root> = () => {
  const cache = new Map<string, Promise<string>>();
  const getOEmbed = (url: string) => {
    if (!cache.has(url)) cache.set(url, fetchOEmbed(url));
    return cache.get(url)!;
  };

  return async (tree, file) => {
    async function visit(parent: Parent): Promise<void> {
      for (let i = 0; i < parent.children.length; i++) {
        const node = parent.children[i];

        if (node.type === "paragraph") {
          const url = getRawUrl(node as Paragraph);
          if (url && isTweetUrl(url)) {
            try {
              parent.children[i] = { type: "html", value: await getOEmbed(url) } as Html;
            }
            catch (error) {
              console.warn(`[remark-twitter-embed] ${file.path}: ${url}`, error);
            }
            continue;
          }
        }

        if ("children" in node && Array.isArray(node.children)) await visit(node as Parent);
      }
    }

    await visit(tree);
  };
};
