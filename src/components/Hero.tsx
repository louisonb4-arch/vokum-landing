'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-[#c9a84c]/5 blur-[120px]" />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-px h-32 bg-gradient-to-b from-[#c9a84c]/40 to-transparent" />
      <div className="absolute top-0 left-0 h-px w-32 bg-gradient-to-r from-[#c9a84c]/40 to-transparent" />
      <div className="absolute top-0 right-0 w-px h-32 bg-gradient-to-b from-[#c9a84c]/40 to-transparent" />
      <div className="absolute top-0 right-0 h-px w-32 bg-gradient-to-l from-[#c9a84c]/40 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6 text-center pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/5 text-[#c9a84c] text-sm mb-8"
        >
          <Sparkles size={12} />
          <span>{t('badge')}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
        >
          <span className="text-white">{t('title')} </span>
          <span className="gold-gradient">{t('titleAccent')}</span>
          <br />
          <span className="text-white">{t('titleEnd')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg text-[#888] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group flex items-center gap-2 px-6 py-3 bg-[#c9a84c] text-black font-semibold rounded hover:bg-[#e8c97e] transition-all duration-200"
          >
            {t('cta')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#portfolio"
            className="px-6 py-3 border border-[#2a2a2a] text-[#888] hover:text-white hover:border-[#444] rounded transition-all duration-200"
          >
            {t('ctaSecondary')}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: '50+', label: 'Projects' },
            { value: '100%', label: 'Satisfaction' },
            { value: '48h', label: 'First draft' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold gold-gradient">{stat.value}</div>
              <div className="text-xs text-[#555] mt-1 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent" />
    </section>
  );
}
