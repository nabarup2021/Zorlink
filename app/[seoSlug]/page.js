import { notFound } from 'next/navigation';
import SeoLandingPage from '../../components/SeoLandingPage';
import { SEO_KEYWORDS, SEO_PAGE_ORDER_ALL, seoPageMap } from '../../lib/seo-pages';

export const dynamicParams = false;

export function generateStaticParams() {
  return SEO_PAGE_ORDER_ALL.filter((seoSlug) => !['features', 'commands', 'premium'].includes(seoSlug)).map((seoSlug) => ({ seoSlug }));
}

export async function generateMetadata({ params }) {
  const page = seoPageMap[params.seoSlug];
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    keywords: [
      page.keyword,
      ...SEO_KEYWORDS,
      'Azelia',
      'ZorveX Development',
      'Discord music bot',
      'music bot Discord',
      ...(page.keywords || []),
    ],
    alternates: {
      canonical: '/' + page.slug,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'website',
      siteName: 'Azelia',
      images: ['/azelia-banner.gif'],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
    },
  };
}

export default function SeoSlugPage({ params }) {
  const page = seoPageMap[params.seoSlug];
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
