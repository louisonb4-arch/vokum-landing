'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Faq() {
  const t = useTranslations('faq');
  const containerRef = useRef<HTMLElement>(null);
  const items = t.raw('items') as Array<{ q: string; a: string }>;

  useGSAP(() => {
    gsap.from('.faq-heading', {
      autoAlpha: 0,
      y: 20,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.faq-heading', start: 'top 85%', once: true },
    });

    ScrollTrigger.batch('.faq-row', {
      start: 'top 88%',
      once: true,
      onEnter: batch => {
        gsap.from(batch, {
          y: 20,
          autoAlpha: 0,
          duration: 0.55,
          ease: 'power3.out',
          stagger: 0.08,
        });
      },
    });
  }, { scope: containerRef });

  return (
    <section
      id="faq"
      ref={containerRef}
      className="py-28 px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="faq-heading mb-14">
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-4"
            style={{ color: 'var(--color-text-muted)' }}
          >
            05 — {t('badge')}
          </div>
          <h2
            className="font-black leading-tight tracking-tight max-w-xl"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              letterSpacing: '-0.025em',
              color: 'var(--color-text-primary)',
            }}
          >
            {t('title')}{' '}
            <span style={{ color: 'var(--color-accent)' }}>{t('titleAccent')}</span>
          </h2>
          <p
            className="text-sm max-w-md leading-relaxed mt-4"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Questions */}
        <div className="max-w-3xl">
          {items.map((item, i) => (
            <details
              key={item.q}
              className="faq-row group"
              style={{
                borderBottom: '1px solid var(--color-border)',
                borderTop: i === 0 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              <summary
                className="flex items-center justify-between gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden"
              >
                <h3
                  className="font-bold"
                  style={{
                    fontSize: 'clamp(16px, 2vw, 19px)',
                    color: 'var(--color-text-primary)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.q}
                </h3>
                <span
                  className="shrink-0 text-xl transition-transform duration-200 group-open:rotate-45"
                  style={{ color: 'var(--color-accent)' }}
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p
                className="text-sm leading-relaxed pb-6 max-w-2xl"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
