'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Services() {
  const t = useTranslations('services');
  const containerRef = useRef<HTMLElement>(null);
  const items = t.raw('items') as Array<{ title: string; description: string }>;

  useGSAP(() => {
    gsap.from('.services-number', {
      autoAlpha: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.services-number', start: 'top 85%', once: true },
    });

    gsap.from('.services-heading', {
      autoAlpha: 0,
      y: 20,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.services-heading', start: 'top 85%', once: true },
    });

    ScrollTrigger.batch('.service-row', {
      start: 'top 88%',
      once: true,
      onEnter: batch => {
        gsap.from(batch, {
          x: 40,
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
      id="services"
      ref={containerRef}
      className="py-28 px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">

          {/* Left — sticky label */}
          <div className="md:w-44 shrink-0 md:pt-3">
            <div className="md:sticky md:top-28">
              <div
                className="services-number font-black leading-none mb-3 select-none"
                style={{
                  fontSize: 'clamp(64px, 8vw, 96px)',
                  color: 'var(--primitive-gray-100)',
                  letterSpacing: '-0.04em',
                }}
              >
                01
              </div>
              <div
                className="services-heading text-[11px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {t('badge')}
              </div>
            </div>
          </div>

          {/* Right — list */}
          <div className="flex-1">
            <div className="services-heading mb-10">
              <h2
                className="font-black leading-tight tracking-tight"
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

            <div>
              {items.map((item, i) => (
                <div
                  key={item.title}
                  className="service-row group flex items-center justify-between py-6 rounded-lg px-4 -mx-4 cursor-pointer transition-colors duration-200"
                  style={{
                    borderBottom: i < items.length - 1 ? '1px solid var(--color-border)' : 'none',
                    borderTop: i === 0 ? '1px solid var(--color-border)' : 'none',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-surface)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  <div className="flex-1 pr-8">
                    <h3
                      className="font-bold mb-1"
                      style={{
                        fontSize: 'clamp(20px, 2.5vw, 26px)',
                        color: 'var(--color-text-primary)',
                        letterSpacing: '-0.015em',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed max-w-lg"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {item.description}
                    </p>
                  </div>
                  <span
                    className="shrink-0 text-xl font-light transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
