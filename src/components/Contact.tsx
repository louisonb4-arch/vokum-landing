'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const t = useTranslations('contact');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <section id="contact" className="py-32 px-6 relative">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#c9a84c]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2a2a2a] text-[#c9a84c] text-xs uppercase tracking-widest mb-5">
            {t('badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')} <span className="gold-gradient">{t('titleAccent')}</span>
          </h2>
          <p className="text-[#555] leading-relaxed">{t('subtitle')}</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl p-8"
        >
          {sent ? (
            <div className="text-center py-8">
              <CheckCircle size={48} className="text-[#c9a84c] mx-auto mb-4" />
              <h3 className="text-white text-xl font-semibold mb-2">{t('successTitle')}</h3>
              <p className="text-[#555]">{t('successSubtitle')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-[#555] uppercase tracking-widest">{t('name')}</label>
                  <input
                    type="text"
                    required
                    className="bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white text-sm placeholder-[#444] focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-[#555] uppercase tracking-widest">{t('email')}</label>
                  <input
                    type="email"
                    required
                    className="bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white text-sm placeholder-[#444] focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-[#555] uppercase tracking-widest">{t('project')}</label>
                <textarea
                  required
                  rows={5}
                  className="bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-white text-sm placeholder-[#444] focus:outline-none focus:border-[#c9a84c]/50 transition-colors resize-none"
                  placeholder="I need a landing page for..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex items-center justify-center gap-2 px-6 py-3 bg-[#c9a84c] text-black font-semibold rounded-lg hover:bg-[#e8c97e] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={14} />
                    {t('submit')}
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
