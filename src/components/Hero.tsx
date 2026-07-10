'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const t = useTranslations('hero');
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'back.out(0.8)' } });

    // Jitter exact pattern: tag→headline→subtitle→cta, all delay 0.2s, overshoot
    tl.from(badgeRef.current, { scale: 0.75, autoAlpha: 0, duration: 0.8 }, 0.2)
      .from(headlineRef.current, { scale: 0.93, autoAlpha: 0, duration: 0.6 }, 0.2)
      .from(subtitleRef.current, { autoAlpha: 0, y: 16, ease: 'power3.out', duration: 0.55 }, 0.55)
      .from(ctaRef.current, { scale: 0, autoAlpha: 0, duration: 0.8 }, 0.2);
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Badge */}
      <div ref={badgeRef} className="mb-8">
        <span
          className="inline-flex items-center gap-2.5 text-[13px] font-medium px-4 py-2 rounded-full"
          style={{
            background: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: 'var(--color-accent)' }}
          />
          {t('badge')}
          <a
            href="#services"
            className="font-semibold transition-colors duration-200"
            style={{ color: 'var(--color-accent)' }}
          >
            {t('badgeLink')}
          </a>
        </span>
      </div>

      {/* Headline */}
      <h1
        ref={headlineRef}
        className="font-black leading-[1.02] tracking-tight mb-6 max-w-5xl"
        style={{
          fontSize: 'clamp(52px, 8vw, 96px)',
          letterSpacing: '-0.03em',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-inter)',
        }}
      >
        {t('title')}
        <br />
        {t('titleEnd')}
      </h1>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="text-lg leading-relaxed max-w-xl mb-10"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {t('subtitle')}
      </p>

      {/* CTA */}
      <div ref={ctaRef}>
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

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'var(--color-border)' }}
      />
    </section>
  );
}
