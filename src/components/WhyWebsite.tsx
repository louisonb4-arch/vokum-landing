'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Card = { tag: string; title: string; text: string; list?: string[] };

export default function WhyWebsite() {
  const t = useTranslations('why');
  const containerRef = useRef<HTMLElement>(null);
  const cards = t.raw('cards') as Card[];

  useGSAP(() => {
    gsap.from('.why-heading', {
      autoAlpha: 0,
      y: 24,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.why-heading', start: 'top 85%', once: true },
    });

    ScrollTrigger.batch('.why-card', {
      start: 'top 88%',
      once: true,
      onEnter: batch => {
        gsap.from(batch, {
          y: 24,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
        });
      },
    });

    gsap.from('.why-conclusion', {
      autoAlpha: 0,
      y: 24,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.why-conclusion', start: 'top 88%', once: true },
    });
  }, { scope: containerRef });

  return (
    <section
      id="why"
      ref={containerRef}
      className="py-28 px-6"
      style={{ background: 'var(--color-bg-surface)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="why-heading mb-14">
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-4"
            style={{ color: 'var(--color-text-muted)' }}
          >
            02 — {t('badge')}
          </div>
          <h2
            className="font-black leading-tight tracking-tight max-w-2xl"
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
            className="font-bold mt-8 max-w-2xl"
            style={{
              fontSize: 'clamp(18px, 2.2vw, 22px)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.015em',
            }}
          >
            {t('introTitle')}
          </p>
          <p
            className="text-sm leading-relaxed mt-3 max-w-2xl"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t('introText')}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map(card => (
            <div
              key={card.tag}
              className="why-card rounded-2xl p-7"
              style={{
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: 'var(--color-accent)' }}
                />
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {card.tag}
                </span>
              </div>
              <h3
                className="font-bold mb-2"
                style={{
                  fontSize: '17px',
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.01em',
                }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {card.text}
              </p>
              {card.list && (
                <ul className="mt-3 flex flex-col gap-1.5">
                  {card.list.map(item => (
                    <li
                      key={item}
                      className="text-sm leading-relaxed flex items-baseline gap-2"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      <span
                        aria-hidden="true"
                        className="text-xs"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        →
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Conclusion + CTA */}
        <div className="why-conclusion text-center mt-16 max-w-2xl mx-auto">
          <p
            className="font-bold leading-snug mb-8"
            style={{
              fontSize: 'clamp(20px, 2.8vw, 28px)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            {t('conclusion')}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-85 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-text)',
            }}
          >
            {t('cta')} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
