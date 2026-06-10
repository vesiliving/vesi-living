'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Products', href: '/products' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-[#0D0D0D] relative z-50">
      <div className="px-6 flex items-center justify-center h-12">

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 list-none m-0 p-0">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-[10px] tracking-[0.22em] uppercase font-light transition-colors duration-200 ${
                  pathname === href
                    ? 'text-[#B07D5A]'
                    : 'text-[#F5F3EF] hover:text-[#B07D5A]'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] cursor-pointer p-1 ml-auto"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-[#F5F3EF] transition-all duration-300 ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-5 h-px bg-[#F5F3EF] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-[#F5F3EF] transition-all duration-300 ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <ul className="md:hidden flex flex-col list-none m-0 px-6 pb-6 gap-5 border-t border-[#F5F3EF]/10">
          {links.map(({ label, href }) => (
            <li key={href} className="pt-4">
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className={`text-[11px] tracking-[0.22em] uppercase font-light transition-colors duration-200 ${
                  pathname === href
                    ? 'text-[#B07D5A]'
                    : 'text-[#F5F3EF] hover:text-[#B07D5A]'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
