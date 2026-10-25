import { members } from './members';
import { getPosts } from './posts';

// URLのパス区切りやクエリ・フラグメント開始文字を含むタグは検索対象外にする。
export const isSearchableTag = (tag: string) => tag.length > 0 && !/[/?#]/.test(tag);

export const getTagHref = (tag: string) => (
  isSearchableTag(tag) ? `/tags/${encodeURIComponent(tag)}/` : undefined
);

export const getAllTags = () => {
  const memberTags = members.flatMap((member) => [
    ...(member.skills ?? []),
    ...(member.portfolios ?? []).flatMap((portfolio) => portfolio.tags ?? []),
  ]);
  return [...new Set([...getPosts().flatMap((post) => post.data.tags), ...memberTags])].sort();
};
