export default function robots() {
  const origin = (process.env.SITE_ORIGIN || 'https://azelia.site').replace(/\/+$/, '');
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: origin + '/sitemap.xml',
    host: origin,
  };
}
