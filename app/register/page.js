'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Register() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', orderNumber: '' });

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
        body: JSON.stringify({ ...form, listType: 'customer' }),
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
      <header className="bg-[#0D0D0D] pt-2 pb-0 flex justify-center items-center">
        <Image src="/logo.png" alt="Vesi Living" width={398} height={256} className="object-contain" unoptimized priority />
      </header>

      {/* Hero */}
      <section className="bg-[#0D0D0D] px-6 pt-0 pb-10 text-center">
        <h1
          className="text-4xl md:text-5xl font-light text-[#F5F3EF] leading-tight max-w-2xl mx-auto"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          Thank You For Your Purchase
        </h1>

        <div className="mx-auto mt-6 mb-6 w-12 h-px bg-[#B07D5A]" />

        <p className="text-[#9E9791] text-base md:text-lg max-w-md mx-auto leading-relaxed font-light">
          Register your Vesi Showerhead and claim your free replacement filter — our gift to you.
        </p>

      </section>

      {/* Form / Success */}
      <section className="bg-[#F5F3EF] px-6 py-16 flex-1">
        <div className="max-w-md mx-auto">

          {submitted ? (
            <div className="text-center py-8">
              <div className="mx-auto mb-6 w-12 h-12 rounded-full border border-[#B07D5A] flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#B07D5A]"
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
                You&apos;re registered.
              </h2>
              <p className="text-[#9E9791] text-sm leading-relaxed max-w-xs mx-auto">
                Check your inbox — we&apos;ll be in touch shortly with your free filter details.
              </p>
            </div>
          ) : (
            <>
              <h2
                className="text-2xl font-light text-[#0D0D0D] mb-8 text-center"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Claim your free filter
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-[#9E9791] font-light">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="bg-transparent border-b border-[#9E9791]/40 py-2.5 text-[#0D0D0D] text-sm outline-none transition-colors duration-200 focus:border-[#B07D5A] placeholder:text-[#9E9791]/40"
                    placeholder="Jane Smith"
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
                    className="bg-transparent border-b border-[#9E9791]/40 py-2.5 text-[#0D0D0D] text-sm outline-none transition-colors duration-200 focus:border-[#B07D5A] placeholder:text-[#9E9791]/40"
                    placeholder="jane@example.com"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-[#9E9791] font-light">
                    Amazon Order Number
                  </label>
                  <input
                    type="text"
                    name="orderNumber"
                    required
                    value={form.orderNumber}
                    onChange={handleChange}
                    className="bg-transparent border-b border-[#9E9791]/40 py-2.5 text-[#0D0D0D] text-sm outline-none transition-colors duration-200 focus:border-[#B07D5A] placeholder:text-[#9E9791]/40"
                    placeholder="114-1234567-1234567"
                  />
                  <p className="text-[#9E9791] text-xs mt-0.5">
                    Found in Your Orders on Amazon
                  </p>
                </div>

                {error && (
                  <p className="text-red-500 text-xs mt-1">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full bg-[#0D0D0D] text-[#F5F3EF] py-4 text-xs tracking-[0.25em] uppercase font-light transition-colors duration-300 hover:bg-[#B07D5A] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? 'Sending...' : 'Claim My Free Filter'}
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D0D0D] py-8 text-center">
        <p className="text-[#9E9791] text-xs tracking-widest">
          © 2025 Vesi Living. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
