import { SEO_PAGE_ORDER_ALL } from '../lib/seo-pages';

export default function sitemap() {
  const origin = (process.env.SITE_ORIGIN || 'https://azelia.site').replace(/\/+$/, '');
  const staticPaths = ['/', '/features', '/commands', '/premium', '/status', '/faq', '/servers', '/top-songs', '/team'];
  const seoPaths = SEO_PAGE_ORDER_ALL
    .filter((slug) => !['features', 'commands', 'premium'].includes(slug))
    .map((slug) => '/' + slug);
  const paths = [...new Set([...staticPaths, ...seoPaths])];

  return paths.map((path) => ({
    url: origin + path,
    lastModified: new Date(),
    changeFrequency: path === '/azeliaStatus' ? 'hourly' : 'weekly',
    priority: path === '/' ? 1 : path === '/commands' || path === '/features' ? 0.9 : 0.7,
  }));
}
