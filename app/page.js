'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const PRODUCTS = [
  { src: '/product-black-copper.png', label: 'Black / Copper' },
  { src: '/product-white-chrome.png', label: 'White / Chrome' },
  { src: '/product-white-copper.png', label: 'White / Copper' },
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
      }, 750); // halfway through transition
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // pos: 0 = centre, 1 = right, 2 = left
  const getPos = (index) => (index - active + PRODUCTS.length) % PRODUCTS.length;

  const getStyle = (pos) => {
    const base = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '340px',
      height: '520px',
      transition: 'transform 1.5s cubic-bezier(0.4,0,0.2,1), opacity 1.5s ease',
    };
    if (pos === 0) return { ...base, transform: 'translate(-50%, -50%) translateX(0px) scale(1)', zIndex: 2, opacity: 1 };
    if (pos === 1) return { ...base, transform: 'translate(-50%, -50%) translateX(260px) scale(0.65)', zIndex: 1, opacity: 1 };
    return          { ...base, transform: 'translate(-50%, -50%) translateX(-260px) scale(0.65)', zIndex: 1, opacity: 1 };
  };

  return (
    <div style={{ backgroundColor: '#0D0D0D', paddingBottom: '2.5rem' }}>
      {/* Stage */}
      <div className="relative overflow-hidden mx-auto" style={{ height: '560px', maxWidth: '900px' }}>
        {PRODUCTS.map((product, index) => {
          const pos = getPos(index);
          const isSide = pos !== 0;
          return (
            <div key={product.src} style={getStyle(pos)}>
              {/* Product image */}
              <Image
                src={product.src}
                alt={product.label}
                fill
                className="object-contain"
                unoptimized
              />
              {/* Side overlay */}
              {isSide && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ backgroundColor: 'rgba(13,13,13,0.6)', zIndex: 1 }}
                />
              )}
            </div>
          );
        })}
      </div>
      {/* Caption */}
      <div className="text-center" style={{ marginTop: '1rem' }}>
        <span
          className="text-[11px] tracking-[0.3em] uppercase font-light"
          style={{
            color: '#C4885A',
            display: 'inline-block',
            opacity: transitioning ? 0 : 1,
            transition: 'opacity 0.75s ease',
          }}
        >
          {PRODUCTS[active].label}
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '' });

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

  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <header className="bg-[#0D0D0D] pt-8 pb-4 md:pt-4 md:pb-0 flex justify-center items-center">
        <Image src="/logo.png" alt="Vesi Living" width={279} height={179} className="object-contain" style={{ marginTop: "-16px" }} unoptimized priority />
      </header>

      {/* Hero with crossfading background images */}
      <section className="relative overflow-hidden px-6 pt-0 pb-16 text-center flex flex-col justify-center" style={{ backgroundColor: '#0D0D0D', minHeight: '100vh' }}>

        {/* Background image layers — each fades in and out in sequence */}
        {[
          { src: '/lifestyle-1.png', delay: '0s' },
          { src: '/lifestyle-2.png', delay: '6s' },
          { src: '/lifestyle-3.png', delay: '12s' },
          { src: '/lifestyle-4.png', delay: '18s' },
        ].map(({ src, delay }) => (
          <div
            key={src}
            className="hero-bg-image"
            style={{
              backgroundImage: `url(${src})`,
              animationDelay: delay,
            }}
          />
        ))}

        {/* Dark overlay so images stay atmospheric, not dominant */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: 'rgba(13,13,13,0.75)', zIndex: 1 }}
        />

        {/* Content sits above backgrounds */}
        <div className="relative" style={{ zIndex: 2 }}>
          <h1
            className="text-4xl md:text-5xl font-light text-[#F5F3EF] leading-tight max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            The Vesi Filtered Showerhead.<br className="block md:hidden" /> Launching Soon.
          </h1>

          <div className="mx-auto mt-6 mb-6 w-12 h-px bg-[#C4885A]" />

          <p className="text-[#9E9791] text-base md:text-lg max-w-lg mx-auto leading-relaxed font-light">
            Hard water is damaging your skin and hair every time you shower.<br /><br />Vesi&apos;s multi-stage filtration removes chlorine, heavy metals and impurities, so your water works with you, not against you.<br /><br />Join the waitlist for an exclusive discount when we launch.
          </p>
        </div>

      </section>

      {/* Form / Success */}
      <section className="bg-[#F5F3EF] px-6 py-16 flex-1">
        <div className="max-w-md mx-auto">

          {submitted ? (
            <div className="text-center py-8">
              <div className="mx-auto mb-6 w-12 h-12 rounded-full border border-[#C4885A] flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#C4885A]"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
                className="text-2xl font-light text-[#0D0D0D] mb-8 text-center"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Join the waitlist
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-[#9E9791] font-light">
                    First Name
                  </label>
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
                  <label className="text-xs tracking-widest uppercase text-[#9E9791] font-light">
                    Email Address
                  </label>
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

                {error && (
                  <p className="text-red-500 text-xs mt-1">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full bg-[#0D0D0D] text-[#F5F3EF] py-4 text-xs tracking-[0.25em] uppercase font-light transition-colors duration-300 hover:bg-[#C4885A] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? 'Sending...' : 'Join the Waitlist'}
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      {/* Product carousel */}
      <ProductCarousel />

      {/* Footer */}
      <footer className="bg-[#0D0D0D] py-8 text-center">
        <p className="text-[#9E9791] text-xs tracking-widest">
          © 2025 Vesi Living. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
