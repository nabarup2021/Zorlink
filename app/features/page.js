import SeoLandingPage from '../../components/SeoLandingPage';
import { seoPageMap } from '../../lib/seo-pages';

export const metadata = {
  title: seoPageMap.features.title,
  description: seoPageMap.features.description,
  keywords: [seoPageMap.features.keyword, 'discord music bot', 'music bot discord', 'Azelia'],
  alternates: { canonical: '/features' },
};

export default function FeaturesPage() {
  return <SeoLandingPage page={seoPageMap.features} />;
}
