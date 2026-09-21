import SeoLandingPage from '../../components/SeoLandingPage';
import { seoPageMap } from '../../lib/seo-pages';

export const metadata = {
  title: seoPageMap.commands.title,
  description: seoPageMap.commands.description,
  keywords: [seoPageMap.commands.keyword, 'discord music bot commands', 'discord music commands', 'Azelia'],
  alternates: { canonical: '/commands' },
};

export default function CommandsPage() {
  return <SeoLandingPage page={seoPageMap.commands} />;
}
