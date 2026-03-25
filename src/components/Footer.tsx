'use client';

import { useTranslations } from 'next-intl';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');

  const links = [
    { href: '#services', label: t('links.services') },
    { href: '#process', label: t('links.process') },
    { href: '#portfolio', label: t('links.portfolio') },
    { href: '#contact', label: t('links.contact') },
  ];

  return (
    <footer className="px-6 pb-10 pt-0">
      <Separator style={{ background: 'var(--color-border)' }} />
      <div className="max-w-6xl mx-auto pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + tagline */}
        <div className="flex items-center gap-3">
          <Image src="/vokum-logo.svg" alt="Vokum" width={28} height={28} />
          <span className="font-semibold text-sm uppercase tracking-[0.12em]"
            style={{ color: 'var(--color-text-primary)' }}>
            Vokum
          </span>
          <span style={{ color: 'var(--color-border-emphasis)', margin: '0 4px' }}>—</span>
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{t('tagline')}</span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[10px] uppercase tracking-[0.18em] transition-colors duration-200"
              style={{ color: 'var(--color-text-disabled)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-disabled)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <div className="text-[11px]" style={{ color: 'var(--color-text-disabled)' }}>
          © {new Date().getFullYear()} Vokum. {t('rights')}
        </div>
      </div>
    </footer>
  );
}
