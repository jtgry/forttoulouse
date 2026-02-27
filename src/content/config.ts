import { defineCollection, z } from 'astro:content';

const nullableString = z.string().nullable().optional();

const shared = z
  .object({
    title: nullableString,
    _layout: nullableString,
    permalink: nullableString,
    image_path: nullableString,
    subtitle: nullableString,
    menu: z.union([z.string(), z.boolean()]).nullable().optional(),
    navigation_weight: z.union([z.string(), z.number()]).nullable().optional(),
    featured: z.union([z.string(), z.boolean()]).nullable().optional(),
    date: z.coerce.date().optional(),
    display_date: nullableString,
    type: nullableString,
    link: nullableString,
    header: nullableString,
    cta: nullableString,
    background_image: nullableString,
    author: nullableString,
    categories: z.array(z.string()).nullable().optional(),
    excerpt: nullableString
  })
  .passthrough();

const pages = defineCollection({ type: 'content', schema: shared });
const events = defineCollection({ type: 'content', schema: shared });
const explore = defineCollection({ type: 'content', schema: shared });
const journal = defineCollection({ type: 'content', schema: shared });
const home = defineCollection({ type: 'content', schema: shared });
const frontierdays = defineCollection({ type: 'content', schema: shared });
const reenactors = defineCollection({ type: 'content', schema: shared });
const site = defineCollection({ type: 'content', schema: shared });

export const collections = { pages, events, explore, journal, home, frontierdays, reenactors, site };
