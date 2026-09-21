import SeoLandingPage from '../../components/SeoLandingPage';
import { seoPageMap } from '../../lib/seo-pages';

export const metadata = {
  title: seoPageMap.sitemap.title,
  description: seoPageMap.sitemap.description,
  keywords: ['Azelia Sitemap', 'Discord Music Bot Sitemap', 'Azelia'],
  alternates: { canonical: '/sitemap' },
};

export default function SitemapPage() {
  return <SeoLandingPage page={seoPageMap.sitemap} />;
}
