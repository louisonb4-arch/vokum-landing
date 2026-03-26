'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as Array<{ quote: string; author: string; role: string }>;

  return (
    <section className="py-32 px-6 relative" style={{ background: 'var(--color-bg-elevated)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, color-mix(in srgb, var(--color-accent) 4%, transparent), transparent)' }} />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <Badge variant="outline" className="mb-5 text-[10px] uppercase tracking-[0.18em] rounded-full px-3 py-1"
            style={{ background: 'var(--badge-bg)', borderColor: 'var(--badge-border)', color: 'var(--badge-text)' }}>
            {t('badge')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display), var(--font-sans)', letterSpacing: '-0.02em' }}>
            {t('title')} <span className="vk-gradient-text">{t('titleAccent')}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <Card className="h-full transition-colors duration-300"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
                <CardContent className="p-7 flex flex-col h-full">
                  <Quote size={22} className="mb-5" style={{ color: 'var(--color-accent-border)' }} />
                  <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold"
                      style={{
                        background: 'var(--color-accent-subtle)',
                        border: '1px solid var(--color-accent-border)',
                        color: 'var(--color-accent)',
                      }}>
                      {item.author[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                        {item.author}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        {item.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
