import type { APIRoute } from 'astro';

const robotsTxt = `
User-agent: *
Allow: /

# Sitemap
Sitemap: https://www.rosemarymemorial.org/sitemap.xml

# Disallow admin or private areas if any
# Disallow: /admin/
# Disallow: /private/

# Allow specific paths if needed
Allow: /gallery/
Allow: /obituary/
Allow: /education/
Allow: /family/
Allow: /adventure/
`;

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
