import type { ImageMetadata } from 'astro';

type ContentComponent = (...args: unknown[]) => unknown;

interface Frontmatter {
  title: string;
  description?: string;
  date: Date | string;
  tags?: string[];
  authors?: string[];
  thumbnail?: string;
}

interface MarkdownModule {
  frontmatter: Frontmatter;
  Content: ContentComponent;
}

// 記事本文と記事ディレクトリ内の画像を、ビルド時にまとめて読み込む。
const markdownModules = import.meta.glob<MarkdownModule>('../../posts/*/index.md', { eager: true });
const assetModules = import.meta.glob<ImageMetadata>('../../posts/*/*.{png,jpg,jpeg,gif,webp,svg}', {
  eager: true,
  import: 'default',
});

export interface Post {
  slug: string;
  data: {
    title: string;
    description?: string;
    date: Date;
    tags: string[];
    authors?: string[];
    thumbnail?: ImageMetadata;
  };
  render: () => Promise<{ Content: ContentComponent }>;
}

function assetUrl(slug: string, path: string | undefined): ImageMetadata | undefined {
  if (!path) return undefined;
  if (path.startsWith('/')) return undefined;
  const key = `../../posts/${slug}/${path.replace('./', '')}`;
  return assetModules[key];
}

// MarkdownのFrontmatterを画面で扱いやすい記事データへ正規化する。
export const posts: Post[] = Object.entries(markdownModules).map(([path, module]) => {
  const match = path.match(/\/posts\/([^/]+)\/index\.md$/);
  if (!match) throw new Error(`Invalid post path: ${path}`);
  const slug = match[1];

  return {
    slug,
    data: {
      ...module.frontmatter,
      date: new Date(module.frontmatter.date),
      tags: module.frontmatter.tags ?? [],
      thumbnail: assetUrl(slug, module.frontmatter.thumbnail),
    },
    render: async () => ({ Content: module.Content }),
  };
});

export function getPosts(): Post[] {
  return posts;
}

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
