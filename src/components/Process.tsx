'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Process() {
  const t = useTranslations('process');
  const containerRef = useRef<HTMLElement>(null);
  const steps = t.raw('steps') as Array<{ number: string; title: string; description: string }>;

  useGSAP(() => {
    gsap.from('.process-heading', {
      autoAlpha: 0,
      y: 24,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.process-heading', start: 'top 85%', once: true },
    });

    gsap.from('.process-step', {
      autoAlpha: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: { trigger: '.process-step', start: 'top 85%', once: true },
    });

    // Giant numbers fade in slowly
    gsap.from('.process-step-number', {
      autoAlpha: 0,
      duration: 1.2,
      ease: 'power2.out',
      stagger: 0.15,
      scrollTrigger: { trigger: '.process-step-number', start: 'top 85%', once: true },
    });
  }, { scope: containerRef });

  return (
    <section
      id="process"
      ref={containerRef}
      className="py-28 px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="process-heading mb-16">
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-4"
            style={{ color: 'var(--color-text-muted)' }}
          >
            03 — {t('badge')}
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
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="process-step relative">
              {/* Giant background number */}
              <div
                className="process-step-number font-black leading-none select-none mb-4"
                style={{
                  fontSize: 'clamp(72px, 8vw, 100px)',
                  letterSpacing: '-0.04em',
                  color: 'var(--primitive-gray-100)',
                  lineHeight: '1',
                }}
              >
                {step.number}
              </div>
              {/* Content */}
              <h3
                className="font-bold mb-2"
                style={{
                  fontSize: '17px',
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.01em',
                }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
