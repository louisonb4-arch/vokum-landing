'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const accents = [
  { text: '#c9a84c', glow: 'rgba(201,168,76,0.07)', url: 'nexus.finance' },
  { text: '#6eb5c0', glow: 'rgba(110,181,192,0.07)', url: 'aurastudio.co' },
  { text: '#a08ec4', glow: 'rgba(160,142,196,0.07)', url: 'pulsehealth.io' },
];

function BrowserChrome({ accent, url }: { accent: string; url: string }) {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Browser bar */}
      <div className="flex items-center gap-2 px-3 py-2.5 shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
        </div>
        {/* URL bar */}
        <div className="flex-1 mx-2 h-5 rounded-sm flex items-center px-2"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <span className="text-[9px] tracking-wide" style={{ color: 'rgba(255,255,255,0.25)' }}>{url}</span>
        </div>
      </div>

      {/* Page content mockup */}
      <div className="flex-1 p-4 flex flex-col gap-2.5 opacity-40">
        <div className="h-2.5 rounded-sm w-2/5" style={{ background: accent }} />
        <div className="h-1.5 rounded-sm w-3/5" style={{ background: 'rgba(255,255,255,0.25)' }} />
        <div className="h-1.5 rounded-sm w-1/2" style={{ background: 'rgba(255,255,255,0.15)' }} />
        <div className="mt-1 h-12 rounded-sm" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${accent}22` }} />
        <div className="flex gap-2">
          <div className="h-1.5 flex-1 rounded-sm" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <div className="h-1.5 flex-1 rounded-sm" style={{ background: 'rgba(255,255,255,0.07)' }} />
        </div>
        <div className="mt-auto flex items-center gap-2">
          <div className="h-6 w-20 rounded-sm" style={{ background: accent, opacity: 0.6 }} />
          <div className="h-6 w-14 rounded-sm" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const t = useTranslations('portfolio');
  const reduce = useReducedMotion();
  const projects = t.raw('projects') as Array<{ title: string; category: string; description: string }>;

  return (
    <section id="portfolio" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...(reduce ? {} : {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
          })}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <Badge variant="outline" className="mb-5 text-[10px] uppercase tracking-[0.18em] rounded-full px-3 py-1"
              style={{ background: 'var(--badge-bg)', borderColor: 'var(--badge-border)', color: 'var(--badge-text)' }}>
              {t('badge')}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display), var(--font-sans)', letterSpacing: '-0.02em' }}>
              {t('title')} <span className="vk-gradient-text">{t('titleAccent')}</span>
            </h2>
          </div>
          <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              {...(reduce ? {} : {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.5, delay: i * 0.1 },
              })}
            >
              <Card
                className="group h-full cursor-pointer transition-all duration-300"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${accents[i].glow}, var(--card-bg))`,
                  border: '1px solid var(--card-border)',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--card-hover-border)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--card-border)')}
              >
                <CardContent className="p-0 flex flex-col">
                  {/* Browser mockup preview */}
                  <div className="relative h-44 overflow-hidden rounded-t-[calc(var(--radius)-1px)]"
                    style={{ background: 'var(--color-bg)' }}>
                    <BrowserChrome accent={accents[i].text} url={accents[i].url} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `radial-gradient(circle at 50% 50%, ${accents[i].glow}, transparent)` }} />
                  </div>

                  {/* Info */}
                  <div className="p-5 flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] mb-1.5"
                        style={{ color: accents[i].text }}>
                        {project.category}
                      </div>
                      <h3 className="font-semibold mb-1.5" style={{ color: 'var(--color-text-primary)' }}>
                        {project.title}
                      </h3>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                        {project.description}
                      </p>
                    </div>
                    <div className="shrink-0 w-8 h-8 rounded flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:border-[var(--color-accent-border)]"
                      style={{
                        border: '1px solid var(--color-border-emphasis)',
                        color: 'var(--color-text-muted)',
                      }}>
                      <ArrowUpRight size={13} />
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
