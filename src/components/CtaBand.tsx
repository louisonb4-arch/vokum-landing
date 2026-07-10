'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CtaBand() {
  const t = useTranslations('contact');
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.cta-band-content', {
      autoAlpha: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.cta-band-content', start: 'top 85%', once: true },
    });
  }, { scope: containerRef });

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-32 px-6"
      style={{ background: 'var(--color-bg-dark)' }}
    >
      <div className="max-w-4xl mx-auto text-center cta-band-content">
        {/* Eyebrow */}
        <div
          className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-6"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          {t('badge')}
        </div>

        {/* Big headline */}
        <h2
          className="font-black leading-tight tracking-tight mb-6"
          style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            letterSpacing: '-0.03em',
            color: '#ffffff',
          }}
        >
          {t('title')}{' '}
          <span style={{ color: 'var(--color-accent)' }}>{t('titleAccent')}</span>
        </h2>

        <p
          className="text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          {t('subtitle')}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:hello@vokumagency.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.04]"
            style={{
              background: 'var(--color-accent)',
              color: '#000',
              boxShadow: '0 0 0 0 var(--color-accent)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,232,54,0.3)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 var(--color-accent)';
            }}
          >
            {t('submit')} →
          </a>
          <a
            href="mailto:hello@vokumagency.com"
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: 'rgba(255,255,255,0.45)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
          >
            hello@vokumagency.com
          </a>
        </div>
      </div>
    </section>
  );
}
