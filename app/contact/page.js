'use client';

import { useState } from 'react';

import Image from 'next/image';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

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
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          orderNumber: form.message,
          listType: 'contact',
        }),
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
      <header className="bg-[#0D0D0D] pt-0 pb-0 md:pt-4 flex justify-center items-center">
        <Image src="/logo.png" alt="Vesi Living" width={279} height={179} className="object-contain" style={{ marginTop: "-16px" }} unoptimized priority />
      </header>

      {/* Hero */}
      <section className="bg-[#0D0D0D] px-6 pt-3 pb-10 text-center">
        <h1
          className="text-4xl md:text-5xl font-light text-[#F5F3EF] leading-tight"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          Get In Touch
        </h1>
        <div className="mx-auto mt-6 mb-6 w-12 h-px bg-[#C4885A]" />
        <p className="text-[#9E9791] text-base max-w-md mx-auto leading-relaxed font-light">
          We&apos;d love to hear from you. Whether you have a question about the Vesi product range, or just want to say hello.
        </p>
      </section>

      {/* Form */}
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
                className="text-2xl font-light text-[#0D0D0D] mb-4"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Message received.
              </h2>
              <p className="text-[#9E9791] text-sm leading-relaxed max-w-xs mx-auto">
                Thank you for getting in touch. We&apos;ll respond within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs tracking-widest uppercase text-[#9E9791] font-light">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="bg-transparent border-b border-[#9E9791]/40 py-2.5 text-[#0D0D0D] text-sm outline-none transition-colors duration-200 focus:border-[#C4885A] placeholder:text-[#9E9791]/40"
                  placeholder="Jane Smith"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs tracking-widest uppercase text-[#9E9791] font-light">Email</label>
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

              <div className="flex flex-col gap-1.5">
                <label className="text-xs tracking-widest uppercase text-[#9E9791] font-light">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="bg-transparent border-b border-[#9E9791]/40 py-2.5 text-[#0D0D0D] text-sm outline-none transition-colors duration-200 focus:border-[#C4885A] placeholder:text-[#9E9791]/40 resize-none"
                  placeholder="Your message..."
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
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}

          {/* Email address */}
          <div className="mt-12 pt-8 border-t border-[#9E9791]/20 text-center">
            <p className="text-xs tracking-widest uppercase text-[#9E9791] font-light mb-2">Email us directly</p>
            <a
              href="mailto:hello@vesiliving.com"
              className="text-[#C4885A] text-sm font-light hover:text-[#0D0D0D] transition-colors duration-200"
            >
              hello@vesiliving.com
            </a>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D0D0D] py-8 text-center">
        <a href="https://www.instagram.com/vesiliving" target="_blank" rel="noopener noreferrer" className="inline-block text-[#9E9791] hover:text-[#C4885A] transition-colors duration-200 mb-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
        </a>
        <p className="text-[#9E9791] text-xs tracking-widest">© 2025 Vesi Living. All rights reserved.</p>
      </footer>

    </div>
  );
}
