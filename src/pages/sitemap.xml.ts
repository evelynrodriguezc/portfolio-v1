import type { APIRoute } from 'astro';

// Built once at deploy time, so new pages under src/pages appear automatically.
export const prerender = true;

const SITE = 'https://evelynr.dev';

const pages = Object.keys(import.meta.glob('./**/*.astro'))
  .filter((file) => !file.includes('/404') && !file.includes('['))
  .map((file) => file.replace(/^\.\//, '').replace(/\.astro$/, '').replace(/(^|\/)index$/, ''))
  .sort();

export const GET: APIRoute = () => {
  const urls = pages
    .map((path) => `  <url><loc>${SITE}/${path}</loc></url>`)
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
