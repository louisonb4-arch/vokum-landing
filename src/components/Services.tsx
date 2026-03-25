'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Globe, Building2, UserCircle, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useReducedMotion } from 'framer-motion';

const icons = [Globe, Building2, UserCircle, ShoppingBag];

export default function Services() {
  const t = useTranslations('services');
  const reduce = useReducedMotion();
  const items = t.raw('items') as Array<{ title: string; description: string }>;

  return (
    <section id="services" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...(reduce ? {} : {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
          })}
          className="mb-16 max-w-2xl"
        >
          <Badge variant="outline" className="mb-5 text-[10px] uppercase tracking-[0.18em] rounded-full px-3 py-1"
            style={{ background: 'var(--badge-bg)', borderColor: 'var(--badge-border)', color: 'var(--badge-text)' }}>
            {t('badge')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            {t('title')} <span className="vk-gradient-text">{t('titleAccent')}</span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{t('subtitle')}</p>
        </motion.div>

        {/* 2×2 grid with shared border */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px rounded-xl overflow-hidden"
          style={{ background: 'var(--color-border)' }}>
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                {...(reduce ? {} : {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.5, delay: i * 0.08 },
                })}
              >
                <Card className="group h-full rounded-none border-0 transition-all duration-300 cursor-pointer"
                  style={{ background: 'var(--card-bg)' }}>
                  <CardContent className="p-8 relative overflow-hidden">
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: 'radial-gradient(circle at 20% 20%, var(--card-hover-glow), transparent 70%)' }} />

                    <div className="relative">
                      {/* Icon box */}
                      <div className="w-11 h-11 rounded flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-105"
                        style={{
                          background: 'var(--color-bg-surface-2)',
                          border: '1px solid var(--color-border-emphasis)',
                        }}>
                        <Icon size={18} style={{ color: 'var(--color-accent)' }} />
                      </div>

                      <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }} />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
