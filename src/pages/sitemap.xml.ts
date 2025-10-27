import type { APIRoute } from 'astro';
import fs from 'fs/promises';

const siteUrl = 'https://www.rosemarymemorial.org';

// Static pages
const staticPages = [
  '/',
  '/obituary',
  '/education',
  '/family',
  '/adventure',
  '/gallery',
];

export const GET: APIRoute = async () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Add static pages
  for (const page of staticPages) {
    sitemap += `
  <url>
    <loc>${siteUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  }

  // Add dynamic gallery pages
  try {
    const inventoryPath = new URL('../../../public/gallery-inventory.json', import.meta.url);
    const inventory = JSON.parse(await fs.readFile(inventoryPath, 'utf-8'));

    for (const item of inventory) {
      const filename = item.fileName.replace('.jpg', '');
      const url = `${siteUrl}/gallery/${filename}`;
      const lastmod = item.lastModified.split('T')[0]; // YYYY-MM-DD

      sitemap += `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>never</changefreq>
    <priority>0.7</priority>
  </url>`;
    }
  } catch (error) {
    console.error('Error reading gallery inventory for sitemap:', error);
  }

  sitemap += `
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
