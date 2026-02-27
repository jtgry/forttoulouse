import { getCollection, type CollectionEntry } from 'astro:content';

export type RouteEntry =
  | CollectionEntry<'pages'>
  | CollectionEntry<'events'>
  | CollectionEntry<'explore'>
  | CollectionEntry<'journal'>
  | CollectionEntry<'reenactors'>;

export type NavItem = { title: string; url: string };

const orderByDateDesc = <T extends { data: { date?: Date } }>(items: T[]) =>
  [...items].sort((a, b) => {
    const left = a.data.date?.getTime() ?? 0;
    const right = b.data.date?.getTime() ?? 0;
    return right - left;
  });

export const toBool = (value: unknown): boolean => value === true || value === 'true';

const toNumber = (value: unknown): number => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const n = Number.parseFloat(value);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
};

export const formatEventDate = (date?: Date): string => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  });
};

export const normalizePath = (path: string): string => {
  if (!path.startsWith('/')) return `/${path}`;
  return path;
};

const trimTrailingSlash = (path: string): string => {
  if (path === '/') return '/';
  return path.endsWith('/') ? path.slice(0, -1) : path;
};

export const pathToSlug = (path: string): string => {
  const normalized = trimTrailingSlash(normalizePath(path));
  if (normalized === '/') return '';
  return normalized.replace(/^\//, '');
};

export const getEntryUrl = (collection: RouteEntry['collection'], entry: RouteEntry): string => {
  const permalink = entry.data.permalink;
  if (typeof permalink === 'string' && permalink.trim()) return normalizePath(permalink.trim());

  if (collection === 'events') return `/events/${entry.slug}/`;
  if (collection === 'journal') return `/journal/${entry.slug}/`;
  if (collection === 'explore') return `/${entry.slug}/`;
  if (collection === 'reenactors') return `/reenactors/${entry.slug}/`;

  return `/${entry.slug}/`;
};

export const getNavigation = async (): Promise<NavItem[]> => {
  const pages = await getCollection('pages');

  return pages
    .filter((entry) => toBool(entry.data.menu))
    .sort((a, b) => toNumber(a.data.navigation_weight) - toNumber(b.data.navigation_weight))
    .map((entry) => ({
      title: entry.data.title ?? entry.slug,
      url: getEntryUrl('pages', entry)
    }));
};

export const getLatestJournalAlert = async (): Promise<{ title: string; url: string } | null> => {
  const journal = await getCollection('journal');
  const [latest] = orderByDateDesc(journal);
  if (!latest?.data.title) return null;
  return { title: latest.data.title, url: getEntryUrl('journal', latest) };
};

export const getRenderableEntries = async (): Promise<Array<{ entry: RouteEntry; url: string }>> => {
  const [pages, events, explore, journal, reenactors] = await Promise.all([
    getCollection('pages'),
    getCollection('events'),
    getCollection('explore'),
    getCollection('journal'),
    getCollection('reenactors')
  ]);

  const all: Array<{ entry: RouteEntry; url: string; rank: number }> = [];

  for (const entry of pages) all.push({ entry, url: getEntryUrl('pages', entry), rank: 5 });
  for (const entry of events) all.push({ entry, url: getEntryUrl('events', entry), rank: 4 });
  for (const entry of explore) all.push({ entry, url: getEntryUrl('explore', entry), rank: 3 });
  for (const entry of journal) all.push({ entry, url: getEntryUrl('journal', entry), rank: 2 });
  for (const entry of reenactors) all.push({ entry, url: getEntryUrl('reenactors', entry), rank: 1 });

  // Resolve URL collisions by preferring higher-rank collections (pages first).
  const byUrl = new Map<string, { entry: RouteEntry; url: string; rank: number }>();
  for (const item of all) {
    const key = trimTrailingSlash(item.url);
    const current = byUrl.get(key);
    if (!current || item.rank > current.rank) byUrl.set(key, item);
  }

  return [...byUrl.values()].map(({ entry, url }) => ({ entry, url }));
};
