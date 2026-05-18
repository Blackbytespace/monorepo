export function toSlug(str: string): string {
  return str.replace(/\//gm, '.').replace(/\.mdx$/, '').replace(/^@/, '');
}
