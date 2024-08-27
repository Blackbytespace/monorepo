import { getCollection } from 'astro:content';

export async function GET() {
  const allDoc = await getCollection('sugar');
  return new Response(JSON.stringify(allDoc));
}
