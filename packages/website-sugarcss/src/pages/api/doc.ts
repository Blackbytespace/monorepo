import { getCollection } from 'astro:content';

export async function GET() {
  const allDoc = await getCollection('sugarcss');
  return new Response(JSON.stringify(allDoc));
}
