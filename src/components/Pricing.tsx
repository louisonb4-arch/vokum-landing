'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Pricing() {
  const t = useTranslations('pricing');
  const containerRef = useRef<HTMLElement>(null);
  const mainFeatures = t.raw('main.features') as string[];
  const subFeatures = t.raw('sub.features') as string[];

  useGSAP(() => {
    gsap.from('.pricing-heading', {
      autoAlpha: 0,
      y: 24,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.pricing-heading', start: 'top 85%', once: true },
    });

    ScrollTrigger.batch('.pricing-card', {
      start: 'top 88%',
      once: true,
      onEnter: batch => {
        gsap.from(batch, {
          y: 28,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
        });
      },
    });
  }, { scope: containerRef });

  return (
    <section
      id="pricing"
      ref={containerRef}
      className="py-28 px-6"
      style={{ background: 'var(--color-bg-surface)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="pricing-heading mb-14">
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-4"
            style={{ color: 'var(--color-text-muted)' }}
          >
            04 — {t('badge')}
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
            className="text-sm leading-relaxed mt-4 max-w-md"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {/* Main offer — dark card */}
          <div
            className="pricing-card rounded-2xl p-8 md:p-10 flex flex-col"
            style={{ background: 'var(--color-bg-dark)' }}
          >
            <div
              className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-6"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              {t('main.label')}
            </div>
            <div className="flex items-baseline gap-3 mb-8">
              <span
                className="text-sm font-medium"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {t('main.pricePrefix')}
              </span>
              <span
                className="font-black leading-none"
                style={{
                  fontSize: 'clamp(44px, 5vw, 64px)',
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                }}
              >
                {t('main.price')}
              </span>
            </div>
            <ul className="flex flex-col gap-2.5 mb-8">
              {mainFeatures.map(item => (
                <li
                  key={item}
                  className="text-sm leading-relaxed flex items-baseline gap-2.5"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  <span
                    aria-hidden="true"
                    className="text-xs font-bold"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p
              className="text-xs leading-relaxed mb-8"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {t('main.note')}
            </p>
            <div className="mt-auto">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-[1.03]"
                style={{
                  background: 'var(--color-accent)',
                  color: '#000000',
                }}
              >
                {t('main.cta')} →
              </a>
            </div>
          </div>

          {/* Subscription — light card */}
          <div
            className="pricing-card rounded-2xl p-8 md:p-10 flex flex-col"
            style={{
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            <div
              className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-6"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {t('sub.label')}
            </div>
            <div className="flex items-baseline gap-2 mb-8">
              <span
                className="font-black leading-none"
                style={{
                  fontSize: 'clamp(44px, 5vw, 64px)',
                  letterSpacing: '-0.03em',
                  color: 'var(--color-text-primary)',
                }}
              >
                {t('sub.price')}
              </span>
              <span
                className="text-sm font-medium"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {t('sub.priceSuffix')}
              </span>
            </div>
            <ul className="flex flex-col gap-2.5 mb-8">
              {subFeatures.map(item => (
                <li
                  key={item}
                  className="text-sm leading-relaxed flex items-baseline gap-2.5"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <span
                    aria-hidden="true"
                    className="text-xs font-bold"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p
              className="text-sm leading-relaxed mt-auto font-medium"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {t('sub.note')}
            </p>
          </div>
        </div>

        {/* Quote mention */}
        <p
          className="text-xs leading-relaxed mt-6 text-center"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {t('mention')}
        </p>
      </div>
    </section>
  );
}
