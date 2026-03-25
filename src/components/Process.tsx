'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function Process() {
  const t = useTranslations('process');
  const steps = t.raw('steps') as Array<{ number: string; title: string; description: string }>;

  return (
    <section id="process" className="py-32 px-6 relative"
      style={{ background: 'var(--color-bg-elevated)' }}>
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 100%, color-mix(in srgb, var(--color-accent) 4%, transparent), transparent)' }} />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <Badge variant="outline" className="mb-5 text-[10px] uppercase tracking-[0.18em] rounded-full px-3 py-1"
            style={{ background: 'var(--badge-bg)', borderColor: 'var(--badge-border)', color: 'var(--badge-text)' }}>
            {t('badge')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            {t('title')} <span className="vk-gradient-text">{t('titleAccent')}</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>{t('subtitle')}</p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex flex-col items-center text-center px-4"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-px"
                  style={{ background: 'linear-gradient(to right, var(--color-accent-border), transparent)' }} />
              )}

              {/* Number */}
              <div className="relative z-10 w-16 h-16 rounded flex items-center justify-center mb-6"
                style={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-accent-border)',
                }}>
                <span className="text-xl font-bold vk-gradient-text">{step.number}</span>
              </div>

              <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {step.description}
              </p>

              {/* Mobile separator */}
              {i < steps.length - 1 && (
                <Separator className="my-8 md:hidden w-px h-8 mx-auto"
                  style={{ background: 'var(--color-accent-border)' }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
