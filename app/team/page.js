import SeoLandingPage from '../../components/SeoLandingPage';
import { seoPageMap } from '../../lib/seo-pages';

export const metadata = {
  title: seoPageMap.azeliaTeam.title,
  description: seoPageMap.azeliaTeam.description,
  keywords: [seoPageMap.azeliaTeam.keyword, 'ZorveX Development', 'Azelia developer'],
  alternates: { canonical: '/team' },
};

export default function TeamPage() {
  return <SeoLandingPage page={seoPageMap.azeliaTeam} />;
}
