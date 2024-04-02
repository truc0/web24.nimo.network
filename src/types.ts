import type { MarkdownHeading } from 'astro'
export type HeadingObject = MarkdownHeading & { subheadings: HeadingObject[] }
