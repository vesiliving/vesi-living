import Image from 'next/image';

export const metadata = {
  title: 'Contact — Vesi Living',
};

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <header className="bg-[#0D0D0D] pt-6 pb-3 flex justify-center items-center">
        <Image src="/logo.png" alt="Vesi Living" width={398} height={256} className="object-contain" unoptimized priority />
      </header>

      {/* Hero */}
      <section className="bg-[#0D0D0D] px-6 pt-3 pb-10 text-center">
        <h1
          className="text-4xl md:text-5xl font-light text-[#F5F3EF] leading-tight"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          Get In Touch
        </h1>
        <div className="mx-auto mt-6 mb-6 w-12 h-px bg-[#B07D5A]" />
        <p className="text-[#9E9791] text-base max-w-md mx-auto leading-relaxed font-light">
          We&apos;d love to hear from you — whether you have a question about your Vesi product, a wholesale enquiry, or just want to say hello.
        </p>
      </section>

      {/* Form */}
      <section className="bg-[#F5F3EF] px-6 py-16 flex-1">
        <div className="max-w-md mx-auto">

          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-widest uppercase text-[#9E9791] font-light">Name</label>
              <input
                type="text"
                name="name"
                required
                className="bg-transparent border-b border-[#9E9791]/40 py-2.5 text-[#0D0D0D] text-sm outline-none transition-colors duration-200 focus:border-[#B07D5A] placeholder:text-[#9E9791]/40"
                placeholder="Jane Smith"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-widest uppercase text-[#9E9791] font-light">Email</label>
              <input
                type="email"
                name="email"
                required
                className="bg-transparent border-b border-[#9E9791]/40 py-2.5 text-[#0D0D0D] text-sm outline-none transition-colors duration-200 focus:border-[#B07D5A] placeholder:text-[#9E9791]/40"
                placeholder="jane@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-widest uppercase text-[#9E9791] font-light">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                className="bg-transparent border-b border-[#9E9791]/40 py-2.5 text-[#0D0D0D] text-sm outline-none transition-colors duration-200 focus:border-[#B07D5A] placeholder:text-[#9E9791]/40 resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-[#0D0D0D] text-[#F5F3EF] py-4 text-xs tracking-[0.25em] uppercase font-light transition-colors duration-300 hover:bg-[#B07D5A] cursor-pointer"
            >
              Send Message
            </button>
          </form>

          {/* Email address */}
          <div className="mt-12 pt-8 border-t border-[#9E9791]/20 text-center">
            <p className="text-xs tracking-widest uppercase text-[#9E9791] font-light mb-2">Email us directly</p>
            <a
              href="mailto:hello@vesiliving.com"
              className="text-[#B07D5A] text-sm font-light hover:text-[#0D0D0D] transition-colors duration-200"
            >
              hello@vesiliving.com
            </a>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D0D0D] py-8 text-center">
        <p className="text-[#9E9791] text-xs tracking-widest">© 2025 Vesi Living. All rights reserved.</p>
      </footer>

    </div>
  );
}
