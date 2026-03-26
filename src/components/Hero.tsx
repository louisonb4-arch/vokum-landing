'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, TrendingUp, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import HeroMockup from '@/components/HeroMockup';

const stats = [
  { value: '50+', label: 'Projets' },
  { value: '100%', label: 'Satisfaction' },
  { value: '48h', label: 'Premier rendu' },
];

const springTransition = { type: 'spring' as const, stiffness: 60, damping: 18 };

export default function Hero() {
  const t = useTranslations('hero');
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 vk-grid-bg" />
      {/* Radial glow */}
      <div className="absolute inset-0 vk-glow pointer-events-none" />

      {/* Corner marks — top left */}
      <div className="absolute top-0 left-0 pointer-events-none">
        <div className="w-px h-28" style={{ background: 'linear-gradient(to bottom, var(--color-accent), transparent)' }} />
        <div className="h-px w-28 absolute top-0 left-0" style={{ background: 'linear-gradient(to right, var(--color-accent), transparent)' }} />
      </div>
      {/* Corner marks — top right */}
      <div className="absolute top-0 right-0 pointer-events-none">
        <div className="w-px h-28 ml-auto" style={{ background: 'linear-gradient(to bottom, var(--color-accent), transparent)' }} />
        <div className="h-px w-28 absolute top-0 right-0" style={{ background: 'linear-gradient(to left, var(--color-accent), transparent)' }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center pt-24 pb-16">
        {/* Badge */}
        <motion.div {...(reduce ? {} : {
          initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: 'easeOut' },
        })}>
          <Badge
            variant="outline"
            className="mb-8 px-4 py-1.5 text-xs uppercase tracking-[0.15em] rounded-full"
            style={{ background: 'var(--badge-bg)', borderColor: 'var(--badge-border)', color: 'var(--badge-text)' }}
          >
            {t('badge')}
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...(reduce ? {} : {
            initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
          })}
          className="text-5xl md:text-7xl lg:text-[88px] font-bold leading-[1.04] tracking-tight mb-6"
          style={{ fontFamily: 'var(--font-display), var(--font-sans)', letterSpacing: '-0.02em' }}
        >
          <span style={{ color: 'var(--color-text-primary)' }}>{t('title')} </span>
          <span className="vk-gradient-text">{t('titleAccent')}</span>
          <br />
          <span style={{ color: 'var(--color-text-primary)' }}>{t('titleEnd')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...(reduce ? {} : {
            initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] },
          })}
          className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...(reduce ? {} : {
            initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, delay: 0.34, ease: [0.16, 1, 0.3, 1] },
          })}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'group gap-2 font-semibold uppercase tracking-widest text-xs px-7 cursor-pointer'
            )}
            style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)', border: 'none' }}
          >
            {t('cta')}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a
            href="#portfolio"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'uppercase tracking-widest text-xs px-7 cursor-pointer transition-colors duration-200'
            )}
            style={{ background: 'transparent', borderColor: 'var(--btn-ghost-border)', color: 'var(--btn-ghost-text)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--btn-ghost-text)')}
          >
            {t('ctaSecondary')}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...(reduce ? {} : {
            initial: { opacity: 0 }, animate: { opacity: 1 },
            transition: { duration: 1, delay: 0.7 },
          })}
          className="mt-20 grid grid-cols-3 gap-8 max-w-sm mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold vk-gradient-text">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] mt-1.5"
                style={{ color: 'var(--color-text-muted)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Floating card — bottom left (desktop only) */}
      {!reduce && (
        <motion.div
          className="hidden lg:flex absolute left-8 xl:left-16 bottom-28 items-center gap-3 rounded-xl px-4 py-3"
          initial={{ opacity: 0, x: -28, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ ...springTransition, delay: 1.1 }}
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'var(--color-accent-subtle)', border: '1px solid var(--color-accent-border)' }}>
            <TrendingUp size={15} style={{ color: 'var(--color-accent)' }} />
          </div>
          <div>
            <div className="text-sm font-bold vk-gradient-text leading-none mb-0.5">+340%</div>
            <div className="text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--color-text-muted)' }}>Conversions</div>
          </div>
        </motion.div>
      )}

      {/* Floating card — bottom right (desktop only) */}
      {!reduce && (
        <motion.div
          className="hidden lg:flex absolute right-8 xl:right-16 bottom-28 items-center gap-3 rounded-xl px-4 py-3"
          initial={{ opacity: 0, x: 28, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ ...springTransition, delay: 1.25 }}
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'var(--color-accent-subtle)', border: '1px solid var(--color-accent-border)' }}>
            <Zap size={15} style={{ color: 'var(--color-accent)' }} />
          </div>
          <div>
            <div className="text-sm font-bold vk-gradient-text leading-none mb-0.5">48h</div>
            <div className="text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--color-text-muted)' }}>Livraison</div>
          </div>
        </motion.div>
      )}

      {/* Browser mockup */}
      <div className="relative w-full mt-16 pb-8">
        <HeroMockup />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--color-bg), transparent)' }} />
    </section>
  );
}
