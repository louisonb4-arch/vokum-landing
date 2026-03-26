'use client';

import { useReducedMotion } from 'framer-motion';

const items = [
  'Landing Pages',
  'Sites d\'entreprise',
  'Portfolios',
  'E-commerce',
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'UI Premium',
  'Performance',
  'SEO',
];

export default function Marquee() {
  const reduce = useReducedMotion();

  const list = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-5 border-y"
      style={{ borderColor: 'var(--color-border)' }}>
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--color-bg), transparent)' }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--color-bg), transparent)' }} />

      <div
        className="flex items-center gap-0 whitespace-nowrap"
        style={{
          animation: reduce ? 'none' : 'marquee 30s linear infinite',
          width: 'max-content',
        }}
      >
        {list.map((item, i) => (
          <span key={i} className="flex items-center gap-0">
            <span
              className="text-xs uppercase tracking-[0.2em] px-6"
              style={{ color: i % 3 === 0 ? 'var(--color-accent)' : 'var(--color-text-muted)' }}
            >
              {item}
            </span>
            <span style={{ color: 'var(--color-border-emphasis)' }}>·</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
