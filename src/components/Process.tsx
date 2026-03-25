'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Process() {
  const t = useTranslations('process');
  const steps = t.raw('steps') as Array<{ number: string; title: string; description: string }>;

  return (
    <section id="process" className="py-32 px-6 relative bg-[#050505]">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full bg-[#c9a84c]/3 blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2a2a2a] text-[#c9a84c] text-xs uppercase tracking-widest mb-5">
            {t('badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')} <span className="gold-gradient">{t('titleAccent')}</span>
          </h2>
          <p className="text-[#666] text-lg max-w-xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative text-center md:text-left"
              >
                {/* Number bubble */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded border border-[#c9a84c]/30 bg-[#0d0d0d] mb-6 relative">
                  <span className="text-2xl font-bold gold-gradient">{step.number}</span>
                  {/* Dot on connecting line */}
                  <div className="hidden md:block absolute -top-px left-1/2 -translate-x-1/2 -translate-y-full w-2 h-2 rounded-full bg-[#c9a84c]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-[#555] text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
