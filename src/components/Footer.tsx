'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  const links = [
    { href: '#services', label: t('links.services') },
    { href: '#process', label: t('links.process') },
    { href: '#faq', label: t('links.faq') },
    { href: '#contact', label: t('links.contact') },
  ];

  return (
    <footer
      className="px-6 py-10 border-t"
      style={{
        background: 'var(--color-bg)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span
            className="font-black text-sm uppercase tracking-[0.15em]"
            style={{ color: 'var(--color-text-primary)' }}
          >
            VOKUM
          </span>
          <span style={{ color: 'var(--color-border-subtle)' }}>—</span>
          <span
            className="text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {t('tagline')}
          </span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.18em] transition-colors duration-200"
              style={{ color: 'var(--color-text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <div
          className="text-[11px]"
          style={{ color: 'var(--color-text-muted)' }}
        >
          © {new Date().getFullYear()} Vokum. {t('rights')}
        </div>
      </div>
    </footer>
  );
}
