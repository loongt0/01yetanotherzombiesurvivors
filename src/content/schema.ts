import {z} from 'zod';

const isoDate = /^\d{4}-\d{2}-\d{2}$/;

export const frontmatterSchema = z
  .object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    eyebrow: z.string().trim().min(1),
    published: z.string().regex(isoDate),
    updated: z.string().regex(isoDate),
    slug: z.string().trim().min(1)
  })
  .strict();

export type ContentFrontmatter = z.infer<typeof frontmatterSchema>;

export function parseContentFrontmatter(
  frontmatter: unknown,
  sourceFilename: string
): ContentFrontmatter {
  const parsed = frontmatterSchema.safeParse(frontmatter);

  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in ${sourceFilename}: ${parsed.error.message}`,
      {cause: parsed.error}
    );
  }

  return parsed.data;
}
