'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const HOTSPOTS = [
  {
    id: 'kdf',
    top: '8%',
    left: '62%',
    title: 'KDF-55 Filter',
    stage: 'STAGE 01',
    description: 'High-purity copper-zinc alloy that neutralises contaminants through a redox reaction at the point of contact.',
    stats: [
      'Removes up to 99% of chlorine',
      'Up to 98% of heavy metals — Lead, Mercury, Nickel, Chromium',
      'Inhibits bacteria & scale',
    ],
  },
  {
    id: 'dial',
    top: '38%',
    left: '64%',
    title: 'Pressure Control Dial',
    stage: 'FEATURE',
    description: 'Rotate to dial in your perfect water pressure — from a gentle mist to a powerful stream.',
    stats: [
      '3 pressure settings',
      'Textured grip for easy adjustment',
      'Works at all water pressures',
    ],
  },
  {
    id: 'pp',
    top: '62%',
    left: '62%',
    title: 'PP Cotton Filter',
    stage: 'STAGE 02',
    description: 'Precision mechanical barrier capturing fine sediment, rust, and suspended solids before they reach your skin.',
    stats: [
      '5mm precision filtration',
      'Captures rust & sediment',
      'Multi-layer gradient structure',
      '10,000 litre filter lifespan',
    ],
  },
  {
    id: 'thread',
    top: '88%',
    left: '60%',
    title: 'Universal ½″ BSP Thread',
    stage: 'UNIVERSAL FIT',
    description: 'Standard connector compatible with all shower arms worldwide. No tools or adaptors required.',
    stats: [
      '½″ BSP standard thread',
      'Fits all standard shower arms',
      'Installs in under 60 seconds',
    ],
  },
];

const BENEFITS = [
  {
    label: 'Chemical Filtration',
    desc: 'KDF-55 neutralises chlorine and heavy metals at the point of contact.',
  },
  {
    label: 'Mechanical Filtration',
    desc: 'PP Cotton captures sediment, rust, and suspended solids before they reach your skin.',
  },
  {
    label: 'Pressure Control',
    desc: 'Three settings let you dial in the perfect shower, every time.',
  },
];

export default function Technology() {
  const [active, setActive] = useState(null);
  const [benefitsRef, benefitsVisible] = useReveal();

  function toggle(id) {
    setActive(prev => (prev === id ? null : id));
  }

  const activeHotspot = HOTSPOTS.find(h => h.id === active);

  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D0D]">

      {/* Logo */}
      <header className="bg-[#0D0D0D] pt-0 pb-0 md:pt-4 flex justify-center items-center">
        <Image src="/logo.png" alt="Vesi Living" width={279} height={179} className="object-contain" style={{ marginTop: '-16px' }} unoptimized priority />
      </header>

      {/* Hero text */}
      <section className="bg-[#0D0D0D] px-6 pt-3 pb-10 text-center">
        <p className="text-[10px] tracking-[0.45em] uppercase font-light mb-4" style={{ color: '#C4885A' }}>
          The Technology
        </p>
        <div className="mx-auto mb-6 w-12 h-px bg-[#C4885A]" />
        <h1
          className="text-4xl md:text-5xl font-light text-[#F5F3EF] leading-tight max-w-2xl mx-auto mb-5"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          Engineered for purity. Built to last.
        </h1>
        <p className="text-[#9E9791] text-sm md:text-base font-light leading-relaxed max-w-sm mx-auto">
          Tap each element to explore the technology inside every Vesi showerhead.
        </p>
      </section>

      {/* Interactive product section */}
      <section className="bg-[#0D0D0D] px-6 pb-16" style={{ borderTop: '1px solid rgba(245,243,239,0.07)' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 pt-10">

          {/* Product image with hotspots */}
          <div className="relative flex-shrink-0 mx-auto" style={{ width: '280px', height: '520px' }}>
            <Image
              src="/product-white-copper.png"
              alt="Vesi Showerhead"
              fill
              className="object-contain"
              unoptimized
            />
            {HOTSPOTS.map(h => (
              <button
                key={h.id}
                onClick={() => toggle(h.id)}
                aria-label={h.title}
                style={{
                  position: 'absolute',
                  top: h.top,
                  left: h.left,
                  transform: 'translate(-50%, -50%)',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                }}
                className="group focus:outline-none"
              >
                {/* Outer pulse ring */}
                {active !== h.id && (
                  <span
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      backgroundColor: 'rgba(196,136,90,0.25)',
                      animation: 'hotspotPulse 2s ease-out infinite',
                      width: '36px',
                      height: '36px',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )}
                {/* Inner dot */}
                <span
                  className="relative block rounded-full transition-all duration-200 group-hover:scale-125"
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#C4885A',
                    boxShadow: active === h.id ? '0 0 0 4px rgba(196,136,90,0.5)' : '0 0 0 2px rgba(196,136,90,0.3)',
                  }}
                />
              </button>
            ))}
          </div>

          {/* Info panel */}
          <div className="flex-1 w-full md:w-auto min-h-[200px] flex items-start">
            {activeHotspot ? (
              <div
                key={activeHotspot.id}
                className="w-full p-6 md:p-8"
                style={{
                  background: 'rgba(20,18,16,0.95)',
                  border: '1px solid rgba(196,136,90,0.35)',
                  animation: 'panelFadeIn 0.3s ease forwards',
                }}
              >
                <p className="text-[10px] tracking-[0.4em] uppercase font-light mb-3" style={{ color: '#C4885A' }}>
                  {activeHotspot.stage}
                </p>
                <h2
                  className="text-2xl md:text-3xl font-light text-[#F5F3EF] mb-4 leading-snug"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  {activeHotspot.title}
                </h2>
                <div className="w-8 h-px bg-[#C4885A] mb-5" />
                <p className="text-[#9E9791] text-sm leading-relaxed font-light mb-6">
                  {activeHotspot.description}
                </p>
                <ul className="flex flex-col gap-3">
                  {activeHotspot.stats.map(stat => (
                    <li key={stat} className="flex items-start gap-3 text-sm font-light" style={{ color: '#9E9791' }}>
                      <span className="mt-[5px] flex-shrink-0 w-[6px] h-[6px] rounded-full bg-[#C4885A]" />
                      {stat}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center py-16">
                <p className="text-[#9E9791]/40 text-xs tracking-widest uppercase font-light">
                  Select a component
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits columns */}
      <section
        className="bg-[#0D0D0D] px-6 py-16"
        style={{ borderTop: '1px solid rgba(245,243,239,0.07)' }}
        ref={benefitsRef}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {BENEFITS.map(({ label, desc }, i) => (
            <div
              key={label}
              style={{
                opacity: benefitsVisible ? 1 : 0,
                transform: benefitsVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
                transitionDelay: benefitsVisible ? `${i * 0.18}s` : '0s',
              }}
            >
              <div className="flex justify-center mb-4">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <circle cx="13" cy="13" r="9" stroke="#C4885A" strokeWidth="1.2" />
                  <circle cx="13" cy="13" r="2" fill="#C4885A" />
                </svg>
              </div>
              <h3
                className="font-light text-[#F5F3EF] mb-3 leading-snug"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.15rem' }}
              >
                {label}
              </h3>
              <p className="text-xs leading-relaxed font-light" style={{ color: '#9E9791' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D0D0D] py-8 text-center" style={{ borderTop: '1px solid rgba(245,243,239,0.07)' }}>
        <a href="https://www.instagram.com/vesiliving" target="_blank" rel="noopener noreferrer" className="inline-block text-[#9E9791] hover:text-[#C4885A] transition-colors duration-200 mb-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
        </a>
        <p className="text-[#9E9791] text-xs tracking-widest">© 2025 Vesi Living. All rights reserved.</p>
      </footer>

      <style>{`
        @keyframes hotspotPulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          70% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
        @keyframes panelFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
}
