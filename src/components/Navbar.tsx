'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const locales = ['en', 'fr', 'es'] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentLocale = locales.find(l => pathname.startsWith(`/${l}`)) ?? 'fr';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = (locale: string) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    router.push(segments.join('/'));
  };

  const navLinks = [
    { href: '#services', label: t('services') },
    { href: '#process', label: t('process') },
    { href: '#portfolio', label: t('portfolio') },
    { href: '#contact', label: t('contact') },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: scrolled ? 'var(--nav-bg-scrolled)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <Image src="/vokum-logo.svg" alt="Vokum" width={32} height={32} />
          <span className="font-semibold tracking-[0.12em] text-sm uppercase"
            style={{ color: 'var(--color-text-primary)' }}>
            Vokum
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm transition-colors duration-200"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-[11px] tracking-widest uppercase">
            {locales.map((l, i) => (
              <span key={l} className="flex items-center gap-1.5">
                {i > 0 && <span style={{ color: 'var(--color-border-emphasis)' }}>·</span>}
                <button
                  onClick={() => switchLocale(l)}
                  className="transition-colors duration-200"
                  style={{ color: currentLocale === l ? 'var(--color-accent)' : 'var(--color-text-muted)' }}
                >
                  {l}
                </button>
              </span>
            ))}
          </div>
          <a
            href="#contact"
            className={cn(buttonVariants({ size: 'sm' }), 'font-semibold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity')}
            style={{
              background: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-text)',
              borderRadius: 'var(--radius)',
            }}
          >
            {t('cta')}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          style={{ color: 'var(--color-text-primary)' }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'var(--card-bg)', borderTop: '1px solid var(--color-border)' }}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-1 text-sm transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-3 pt-2 text-xs tracking-widest uppercase">
                {locales.map((l) => (
                  <button key={l} onClick={() => switchLocale(l)}
                    style={{ color: currentLocale === l ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>
                    {l}
                  </button>
                ))}
              </div>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className={cn(buttonVariants({ size: 'sm' }), 'mt-1 font-semibold uppercase tracking-widest text-xs')}
                style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
              >
                {t('cta')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
