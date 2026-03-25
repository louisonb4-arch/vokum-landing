'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  const links = [
    { href: '#services', label: t('links.services') },
    { href: '#process', label: t('links.process') },
    { href: '#portfolio', label: t('links.portfolio') },
    { href: '#contact', label: t('links.contact') },
  ];

  return (
    <footer className="border-t border-[#111] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-gradient-to-br from-[#e8c97e] to-[#8a6c28] flex items-center justify-center">
            <span className="text-black font-bold text-xs">V</span>
          </div>
          <span className="font-semibold text-white tracking-wide text-sm">VOKUM</span>
          <span className="text-[#333] mx-3">—</span>
          <span className="text-[#444] text-sm">{t('tagline')}</span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#444] hover:text-[#888] text-xs uppercase tracking-widest transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <div className="text-[#333] text-xs">
          © {new Date().getFullYear()} Vokum. {t('rights')}
        </div>
      </div>
    </footer>
  );
}
