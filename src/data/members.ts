import rawMembers from '../../data/members.json';

export interface Member {
  id: string;
  name: string;
  bio: string;
  icon: string;
  skills?: string[];
  portfolios?: Portfolio[];
  socials?: {
    twitter?: string;
    youtube?: string;
    discord?: string;
    github?: string;
    other?: string[];
  };
}

export interface Portfolio {
  title: string;
  url?: string;
  description?: string;
  tags?: string[];
}

// 外部編集されるJSONの内容を、画面で使えるメンバー形式として検証する。
function isMember(value: unknown): value is Member {
  if (!value || typeof value !== 'object') return false;
  const member = value as Record<string, unknown>;
  const portfolios = member.portfolios;
  const validPortfolios = portfolios === undefined || (
    Array.isArray(portfolios)
    && portfolios.every((portfolio) => {
      if (!portfolio || typeof portfolio !== 'object') return false;
      const entry = portfolio as Record<string, unknown>;
      return typeof entry.title === 'string'
        && (entry.url === undefined || typeof entry.url === 'string')
        && (entry.description === undefined || typeof entry.description === 'string')
        && (entry.tags === undefined || (Array.isArray(entry.tags) && entry.tags.every((tag) => typeof tag === 'string')));
    })
  );
  const skills = member.skills;
  return typeof member.id === 'string'
    && typeof member.name === 'string'
    && typeof member.bio === 'string'
    && typeof member.icon === 'string'
    && (skills === undefined || (Array.isArray(skills) && skills.every((skill) => typeof skill === 'string')))
    && validPortfolios;
}

export const members: Member[] = rawMembers.filter(isMember);

if (members.length !== rawMembers.length) {
  throw new Error('data/members.json contains an invalid member entry');
}

export function findMember(id: string): Member | undefined {
  return members.find((member) => member.id === id);
}
