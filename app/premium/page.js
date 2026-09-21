import SeoLandingPage from '../../components/SeoLandingPage';
import { seoPageMap } from '../../lib/seo-pages';

export const metadata = {
  title: seoPageMap.premium.title,
  description: seoPageMap.premium.description,
  keywords: [seoPageMap.premium.keyword, 'discord music bot premium', 'Azelia premium', 'discord music bot pricing'],
  alternates: { canonical: '/premium' },
};

export default function PremiumPage() {
  return <SeoLandingPage page={seoPageMap.premium} />;
}
