'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Globe, Building2, User, ShoppingBag } from 'lucide-react';

const icons = [Globe, Building2, User, ShoppingBag];

export default function Services() {
  const t = useTranslations('services');
  const items = t.raw('items') as Array<{ title: string; description: string }>;

  return (
    <section id="services" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2a2a2a] text-[#c9a84c] text-xs uppercase tracking-widest mb-5">
            {t('badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')} <span className="gold-gradient">{t('titleAccent')}</span>
          </h2>
          <p className="text-[#666] text-lg leading-relaxed">{t('subtitle')}</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl overflow-hidden">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-[#0d0d0d] p-8 hover:bg-[#111] transition-colors duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-10 h-10 rounded bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center mb-5 group-hover:border-[#c9a84c]/40 transition-colors">
                    <Icon size={18} className="text-[#c9a84c]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-[#666] leading-relaxed text-sm">{item.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
