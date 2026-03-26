'use client';

import { motion, useReducedMotion } from 'framer-motion';

function MockWebsite() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: '#080808', fontFamily: 'var(--font-sans)' }}>
      {/* Fake navbar */}
      <div className="flex items-center justify-between px-5 py-3 shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-sm" style={{ background: 'linear-gradient(135deg, #e8c97e, #8a6c28)' }} />
          <div className="h-2 w-14 rounded-sm" style={{ background: 'rgba(255,255,255,0.5)' }} />
        </div>
        <div className="hidden sm:flex items-center gap-4">
          {[48, 40, 44, 36].map((w, i) => (
            <div key={i} className="h-1.5 rounded-sm" style={{ width: w, background: 'rgba(255,255,255,0.2)' }} />
          ))}
        </div>
        <div className="h-6 w-20 rounded-md" style={{ background: 'linear-gradient(135deg, #c9a84c, #8a6c28)' }} />
      </div>

      {/* Fake hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.08), transparent)' }} />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'linear-gradient(rgba(201,168,76,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.12) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%)',
          }} />

        {/* Badge */}
        <div className="mb-3 px-3 py-1 rounded-full text-[8px] uppercase tracking-widest relative"
          style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', color: '#c9a84c' }}>
          Agence Web Premium
        </div>

        {/* Headline */}
        <div className="text-center mb-3 relative">
          <div className="h-3.5 rounded-sm w-64 mb-2 mx-auto" style={{ background: 'rgba(255,255,255,0.85)' }} />
          <div className="h-3.5 rounded-sm w-48 mx-auto"
            style={{ background: 'linear-gradient(90deg, #f5e6c0, #c9a84c, #8a6c28)', opacity: 0.9 }} />
        </div>

        {/* Subtitle lines */}
        <div className="flex flex-col gap-1.5 items-center mb-5 relative">
          <div className="h-1.5 rounded-sm w-52" style={{ background: 'rgba(255,255,255,0.2)' }} />
          <div className="h-1.5 rounded-sm w-44" style={{ background: 'rgba(255,255,255,0.15)' }} />
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3 relative">
          <div className="h-7 w-28 rounded-md" style={{ background: 'linear-gradient(135deg, #c9a84c, #8a6c28)' }} />
          <div className="h-7 w-24 rounded-md" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }} />
        </div>
      </div>

      {/* Fake cards row */}
      <div className="px-5 pb-4 grid grid-cols-3 gap-2 shrink-0">
        {[
          { accent: '#c9a84c', w1: '60%', w2: '80%' },
          { accent: '#6eb5c0', w1: '70%', w2: '55%' },
          { accent: '#a08ec4', w1: '50%', w2: '75%' },
        ].map((card, i) => (
          <div key={i} className="rounded-lg p-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="w-5 h-5 rounded-sm mb-2" style={{ background: `${card.accent}22`, border: `1px solid ${card.accent}44` }} />
            <div className="h-1.5 rounded-sm mb-1.5" style={{ width: card.w1, background: 'rgba(255,255,255,0.5)' }} />
            <div className="h-1 rounded-sm" style={{ width: card.w2, background: 'rgba(255,255,255,0.2)' }} />
            <div className="h-1 rounded-sm mt-1" style={{ width: '65%', background: 'rgba(255,255,255,0.15)' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroMockup() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-4xl px-6"
      {...(reduce ? {} : {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] },
      })}
    >
      {/* Glow under mockup */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-24 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.15), transparent 70%)', filter: 'blur(20px)' }} />

      {/* Browser chrome */}
      <div className="relative rounded-xl overflow-hidden"
        style={{
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
          background: '#111',
        }}>

        {/* Browser top bar */}
        <div className="flex items-center gap-3 px-4 py-3"
          style={{ background: '#161616', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
          </div>
          {/* URL bar */}
          <div className="flex-1 flex items-center gap-2 mx-2 h-6 rounded-md px-3"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: 'rgba(201,168,76,0.6)' }} />
            <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>vokum.fr/projet-nexus</span>
          </div>
          {/* Tab icons */}
          <div className="flex items-center gap-2 shrink-0">
            {[14, 18, 14].map((w, i) => (
              <div key={i} className="h-1.5 rounded-sm" style={{ width: w, background: 'rgba(255,255,255,0.15)' }} />
            ))}
          </div>
        </div>

        {/* Website content */}
        <div className="h-72 sm:h-80 md:h-96 overflow-hidden">
          <MockWebsite />
        </div>
      </div>

      {/* Reflection / bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none rounded-b-xl"
        style={{ background: 'linear-gradient(to top, var(--color-bg), transparent)' }} />
    </motion.div>
  );
}
