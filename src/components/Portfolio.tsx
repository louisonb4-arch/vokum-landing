'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const gradients = [
  'from-[#1a1008] to-[#0d0d0d]',
  'from-[#0d1a1a] to-[#0d0d0d]',
  'from-[#0d0d1a] to-[#0d0d0d]',
];

const accentColors = [
  'text-[#c9a84c]',
  'text-[#4cc9c9]',
  'text-[#9b8ec4]',
];

export default function Portfolio() {
  const t = useTranslations('portfolio');
  const projects = t.raw('projects') as Array<{ title: string; category: string; description: string }>;

  return (
    <section id="portfolio" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2a2a2a] text-[#c9a84c] text-xs uppercase tracking-widest mb-5">
              {t('badge')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              {t('title')} <span className="gold-gradient">{t('titleAccent')}</span>
            </h2>
          </div>
          <p className="text-[#555] text-sm max-w-xs leading-relaxed">{t('subtitle')}</p>
        </motion.div>

        {/* Projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative rounded-xl overflow-hidden border border-[#1a1a1a] bg-gradient-to-br ${gradients[i]} p-6 aspect-[4/3] flex flex-col justify-between hover:border-[#2a2a2a] transition-all duration-300 cursor-pointer`}
            >
              {/* Mock website preview lines */}
              <div className="flex flex-col gap-2 opacity-20">
                <div className="h-2 bg-white/30 rounded w-3/4" />
                <div className="h-1.5 bg-white/20 rounded w-1/2" />
                <div className="mt-3 h-12 bg-white/10 rounded" />
                <div className="h-1.5 bg-white/15 rounded w-2/3" />
                <div className="h-1.5 bg-white/15 rounded w-1/2" />
              </div>

              {/* Info */}
              <div>
                <div className={`text-xs uppercase tracking-widest mb-1 ${accentColors[i]}`}>
                  {project.category}
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                    <p className="text-[#555] text-xs mt-1 leading-relaxed">{project.description}</p>
                  </div>
                  <div className="shrink-0 w-8 h-8 rounded border border-[#2a2a2a] flex items-center justify-center text-[#555] group-hover:border-[#c9a84c]/40 group-hover:text-[#c9a84c] transition-all">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
