'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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

  const inputStyle = {
    background: 'var(--input-bg)',
    borderColor: 'var(--input-border)',
    color: 'var(--input-text)',
  };

  return (
    <section id="contact" className="py-32 px-6 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom, color-mix(in srgb, var(--color-accent) 6%, transparent), transparent 70%)' }} />

      <div className="max-w-xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <Badge variant="outline" className="mb-5 text-[10px] uppercase tracking-[0.18em] rounded-full px-3 py-1"
            style={{ background: 'var(--badge-bg)', borderColor: 'var(--badge-border)', color: 'var(--badge-text)' }}>
            {t('badge')}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display), var(--font-sans)', letterSpacing: '-0.02em' }}>
            {t('title')} <span className="vk-gradient-text">{t('titleAccent')}</span>
          </h2>
          <p className="leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{t('subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Card style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
            <CardContent className="p-8">
              {sent ? (
                <div className="text-center py-10">
                  <CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: 'var(--color-accent)' }} />
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                    {t('successTitle')}
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)' }}>{t('successSubtitle')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-[0.18em]"
                        style={{ color: 'var(--color-text-muted)' }}>
                        {t('name')}
                      </label>
                      <Input
                        required
                        placeholder="John Doe"
                        style={inputStyle}
                        className="focus-visible:ring-[var(--color-accent-border)] placeholder:text-[var(--input-placeholder)]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-[0.18em]"
                        style={{ color: 'var(--color-text-muted)' }}>
                        {t('email')}
                      </label>
                      <Input
                        type="email"
                        required
                        placeholder="john@company.com"
                        style={inputStyle}
                        className="focus-visible:ring-[var(--color-accent-border)] placeholder:text-[var(--input-placeholder)]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-[0.18em]"
                      style={{ color: 'var(--color-text-muted)' }}>
                      {t('project')}
                    </label>
                    <Textarea
                      required
                      rows={5}
                      placeholder="I need a landing page for..."
                      style={inputStyle}
                      className="resize-none focus-visible:ring-[var(--color-accent-border)] placeholder:text-[var(--input-placeholder)]"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="mt-1 gap-2 font-semibold uppercase tracking-widest text-xs disabled:opacity-50"
                    style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
                  >
                    {loading ? (
                      <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                    ) : (
                      <>
                        <Send size={13} />
                        {t('submit')}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
