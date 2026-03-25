'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as Array<{ quote: string; author: string; role: string }>;

  return (
    <section className="py-32 px-6 bg-[#050505] relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[300px] rounded-full bg-[#c9a84c]/3 blur-[120px]" />
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
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {t('title')} <span className="gold-gradient">{t('titleAccent')}</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-7 hover:border-[#2a2a2a] transition-colors"
            >
              <Quote size={24} className="text-[#c9a84c]/30 mb-5" />
              <p className="text-[#aaa] text-sm leading-relaxed mb-6">&ldquo;{item.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c9a84c]/20 to-[#8a6c28]/20 border border-[#c9a84c]/20 flex items-center justify-center text-[#c9a84c] text-sm font-semibold">
                  {item.author[0]}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{item.author}</div>
                  <div className="text-[#555] text-xs">{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
