import { z, reference, defineCollection } from 'astro:content'

const chapter = defineCollection({
    type: 'data',
    schema: z.object({
        name: z.string(),
        slug: z.string().optional(),
    })
})

const handout = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        chapter: reference('chapter'),
        thumbnail: z.string().optional(),
        draft: z.boolean().optional().default(false),
        // TODO: add avatar and author name later
        // author: z.string(),
        // email: z.string(),
    })
})

export const collections = { handout, chapter }