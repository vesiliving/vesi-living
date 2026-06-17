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

const HEADLINE_1 = ['Filter', 'your', 'water', 'at', 'the', 'source.'];
const HEADLINE_2 = ['Protect', 'your', 'skin', '&', 'hair.'];

const PRODUCTS = [
  { src: '/product-black-copper.png', label: 'Black / Copper', available: true },
  { src: '/product-white-chrome.png', label: 'White / Chrome', available: true },
  { src: '/product-white-copper.png', label: 'White / Copper', available: false },
];

function ProductCarousel() {
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setActive(i => (i + 1) % PRODUCTS.length);
        setTransitioning(false);
      }, 750);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getPos = (index) => (index - active + PRODUCTS.length) % PRODUCTS.length;

  const getStyle = (pos) => {
    const base = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '320px',
      height: '480px',
      transition: 'transform 1.5s cubic-bezier(0.4,0,0.2,1), opacity 1.5s ease',
    };
    if (pos === 0) return { ...base, transform: 'translate(-50%, -50%) translateX(0px) scale(1)', zIndex: 2, opacity: 1 };
    if (pos === 1) return { ...base, transform: 'translate(-50%, -50%) translateX(240px) scale(0.65)', zIndex: 1, opacity: 1 };
    return          { ...base, transform: 'translate(-50%, -50%) translateX(-240px) scale(0.65)', zIndex: 1, opacity: 1 };
  };

  const activeProduct = PRODUCTS[active];

  return (
    <div className="bg-[#0D0D0D]" style={{ paddingBottom: '0.75rem' }}>
      {/* Stage */}
      <div className="relative overflow-hidden mx-auto" style={{ height: '420px', maxWidth: '860px' }}>
        {PRODUCTS.map((product, index) => {
          const pos = getPos(index);
          const isSide = pos !== 0;
          return (
            <div key={product.src} style={getStyle(pos)}>
              <Image src={product.src} alt={product.label} fill className="object-contain" unoptimized />
              {isSide && (
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: 'rgba(13,13,13,0.65)', zIndex: 1 }} />
              )}
            </div>
          );
        })}
      </div>
      {/* Caption */}
      <div className="text-center" style={{ marginTop: '0.5rem' }}>
        <p
          className="text-[10px] tracking-[0.4em] uppercase font-light"
          style={{ color: '#C4885A', opacity: transitioning ? 0 : 1, transition: 'opacity 0.75s ease' }}
        >
          {activeProduct.label}
        </p>
        <p
          className="text-[10px] tracking-[0.25em] uppercase font-light mt-1"
          style={{ color: '#9E9791', opacity: transitioning ? 0 : 1, transition: 'opacity 0.75s ease' }}
        >
          Coming Soon
        </p>
      </div>
    </div>
  );
}

const BENEFITS = [
  {
    heading: 'Removes Chlorine & Heavy Metals',
    body: 'KDF-55 filtration neutralises contaminants before they reach your skin.',
  },
  {
    heading: 'Softer Skin & Healthier Hair',
    body: 'Filtered water reduces dryness, irritation, and colour fade over time.',
  },
  {
    heading: 'Easy Filter Replacement',
    body: 'Swap your filter in under 30 seconds. No tools, no plumber required.',
  },
];

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '' });
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  const [productsRef, productsVisible] = useReveal();
  const [benefitsRef, benefitsVisible] = useReveal();
  const [formRef, formVisible] = useReveal();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, listType: 'waitlist' }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const wordCount = HEADLINE_1.length + HEADLINE_2.length;

  return (
    <div className="flex flex-col min-h-screen">

      {/* Logo */}
      <header className="bg-[#0D0D0D] pt-4 pb-0 md:pt-4 md:pb-0 flex justify-center items-center">
        <Image
          src="/logo.png"
          alt="Vesi Living"
          width={279}
          height={179}
          className="object-contain"
          style={{ marginTop: '-16px' }}
          unoptimized
          priority
        />
      </header>

      {/* SECTION 1 — PRODUCT CAROUSEL */}
      <section className="bg-[#0D0D0D] pt-2 pb-0">
        <p className="text-center text-[10px] tracking-[0.45em] uppercase font-light mb-3" style={{ color: '#C4885A' }}>
          The Collection
        </p>
        <ProductCarousel />
      </section>

      {/* SECTION 2 — MESSAGE */}
      <section className="relative bg-[#0D0D0D] px-6 pt-8 pb-10 text-center overflow-hidden" style={{ borderTop: '1px solid rgba(245,243,239,0.07)' }}>
        {/* Radial copper glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '700px', height: '400px',
            background: 'radial-gradient(ellipse at center, rgba(196,136,90,0.09) 0%, transparent 68%)',
          }}
        />
        <div className="relative">
          <h1
            className="text-3xl md:text-[2.6rem] font-light text-[#F5F3EF] leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            <span className="block">
              {HEADLINE_1.map((word, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    marginRight: i < HEADLINE_1.length - 1 ? '0.28em' : 0,
                    opacity: heroVisible ? 1 : 0,
                    transform: heroVisible ? 'translateY(0)' : 'translateY(14px)',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                    transitionDelay: `${i * 0.08}s`,
                  }}
                >
                  {word}
                </span>
              ))}
            </span>
            <span className="block mt-1">
              {HEADLINE_2.map((word, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    marginRight: i < HEADLINE_2.length - 1 ? '0.28em' : 0,
                    opacity: heroVisible ? 1 : 0,
                    transform: heroVisible ? 'translateY(0)' : 'translateY(14px)',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                    transitionDelay: `${(HEADLINE_1.length + i) * 0.08}s`,
                  }}
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>
          <div
            className="mx-auto h-px bg-[#C4885A] mt-5"
            style={{
              width: heroVisible ? '3rem' : '0',
              transition: 'width 0.9s ease',
              transitionDelay: `${wordCount * 0.08 + 0.1}s`,
            }}
          />
          <p
            className="mt-4 text-[#9E9791] text-base md:text-lg font-light tracking-wide"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: 'opacity 0.8s ease',
              transitionDelay: `${wordCount * 0.08 + 0.35}s`,
            }}
          >
            The Vesi Filtered Showerhead.<br />Launching Soon.
          </p>
        </div>
      </section>

      {/* SECTION 3 — WHY VESI */}
      <section
        className="bg-[#0D0D0D] px-6 py-10"
        style={{ borderTop: '1px solid rgba(245,243,239,0.07)' }}
        ref={benefitsRef}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {BENEFITS.map(({ heading, body }, i) => (
            <div
              key={heading}
              style={{
                opacity: benefitsVisible ? 1 : 0,
                transform: benefitsVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
                transitionDelay: benefitsVisible ? `${i * 0.18}s` : '0s',
              }}
            >
              <div className="flex justify-center mb-3">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <circle cx="13" cy="13" r="9" stroke="#C4885A" strokeWidth="1.2" />
                  <circle cx="13" cy="13" r="2" fill="#C4885A" />
                </svg>
              </div>
              <h3
                className="font-light text-[#F5F3EF] mb-3 leading-snug"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.15rem' }}
              >
                {heading}
              </h3>
              <p className="text-xs leading-relaxed font-light" style={{ color: '#9E9791' }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — WAITLIST */}
      <section className="bg-[#F5F3EF] px-6 py-12" ref={formRef}>
        <div
          className="max-w-md mx-auto"
          style={{
            opacity: formVisible ? 1 : 0,
            transform: formVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {submitted ? (
            <div className="text-center py-8">
              <div className="mx-auto mb-6 w-12 h-12 rounded-full border border-[#C4885A] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#C4885A]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 10 8 14 16 6" />
                </svg>
              </div>
              <h2
                className="text-3xl md:text-4xl font-light text-[#0D0D0D] mb-4"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                You&apos;re on the list.
              </h2>
              <p className="text-[#9E9791] text-sm leading-relaxed max-w-xs mx-auto">
                We&apos;ll be in touch before launch with your exclusive discount.
              </p>
            </div>
          ) : (
            <>
              <h2
                className="text-4xl md:text-5xl font-light text-[#0D0D0D] mb-4 text-center leading-tight"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Be among the first.
              </h2>
              <p className="text-[#9E9791] text-sm md:text-base text-center mb-6 leading-relaxed font-light">
                Join the waitlist for early access and an exclusive discount when we launch.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-[#9E9791] font-light">First Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="bg-transparent border-b border-[#9E9791]/40 py-2.5 text-[#0D0D0D] text-sm outline-none transition-colors duration-200 focus:border-[#C4885A] placeholder:text-[#9E9791]/40"
                    placeholder="Jane"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-[#9E9791] font-light">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="bg-transparent border-b border-[#9E9791]/40 py-2.5 text-[#0D0D0D] text-sm outline-none transition-colors duration-200 focus:border-[#C4885A] placeholder:text-[#9E9791]/40"
                    placeholder="jane@example.com"
                  />
                </div>
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full bg-[#C4885A] text-[#F5F3EF] py-4 text-xs tracking-[0.25em] uppercase font-light transition-colors duration-300 hover:bg-[#0D0D0D] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? 'Sending...' : 'Join the Waitlist'}
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D0D0D] py-6 text-center">
        <a href="https://www.instagram.com/vesiliving" target="_blank" rel="noopener noreferrer" className="inline-block text-[#9E9791] hover:text-[#C4885A] transition-colors duration-200 mb-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
        </a>
        <p className="text-[#9E9791] text-xs tracking-widest">
          © 2025 Vesi Living. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
