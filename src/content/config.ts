import { defineCollection, reference, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    subTitle: z.string().optional(),
    topic: z.string(),
    tags: z.array(z.string()),
    image: z.object({
      src: image() /* .refine((img) => img.width >= 800, {
        message: 'Image should be at least 800 pixels',
      }) */,
      alt: z.string(),
    }),
    author: reference('authors'),
    pubDate: z.date(),
    draft: z.boolean(),
  })
});

const authors = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    avatar: z.string(),
  })
});

export const collections = {
  'blog': blogCollection,
  'authors': authors,
};
