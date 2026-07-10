import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyWebsite from '@/components/WhyWebsite';
import Process from '@/components/Process';
import Pricing from '@/components/Pricing';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import Footer from '@/components/Footer';
import { SITE_URL, SITE_NAME, CONTACT_EMAIL } from '@/lib/seo';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tMeta = await getTranslations({ locale, namespace: 'meta' });
  const tFaq = await getTranslations({ locale, namespace: 'faq' });
  const tServices = await getTranslations({ locale, namespace: 'services' });

  const faqItems = tFaq.raw('items') as Array<{ q: string; a: string }>;
  const serviceItems = tServices.raw('items') as Array<{
    title: string;
    description: string;
  }>;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        email: CONTACT_EMAIL,
        logo: `${SITE_URL}/icon.svg`,
        description: tMeta('description'),
        areaServed: { '@type': 'Country', name: 'France' },
        contactPoint: {
          '@type': 'ContactPoint',
          email: CONTACT_EMAIL,
          contactType: 'sales',
          availableLanguage: ['fr', 'en', 'es'],
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: tServices('badge'),
          itemListElement: serviceItems.map((s) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: s.title,
              description: s.description,
              provider: { '@id': `${SITE_URL}/#organization` },
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: locale,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/${locale}/#webpage`,
        url: `${SITE_URL}/${locale}`,
        name: tMeta('title'),
        description: tMeta('description'),
        inLanguage: locale,
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/${locale}/#faq`,
        inLanguage: locale,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };

  return (
    <main style={{ background: '#ffffff' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <Services />
      <WhyWebsite />
      <Process />
      <Pricing />
      <Faq />
      <CtaBand />
      <Footer />
    </main>
  );
}
