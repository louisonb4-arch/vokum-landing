import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Vokum — Agence web';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#19171c',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 9999,
              background: '#00E836',
            }}
          />
          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              letterSpacing: 18,
            }}
          >
            VOKUM
          </div>
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 34,
            color: 'rgba(255,255,255,0.6)',
            maxWidth: 900,
            textAlign: 'center',
          }}
        >
          {t('ogAlt')}
        </div>
      </div>
    ),
    size
  );
}
