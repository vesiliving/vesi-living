import Image from 'next/image';

export const metadata = {
  title: 'Our Story — Vesi Living',
};

export default function OurStory() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <header className="bg-[#0D0D0D] pt-2 pb-0 flex justify-center items-center">
        <Image src="/logo.png" alt="Vesi Living" width={398} height={256} className="object-contain" unoptimized priority />
      </header>

      {/* Hero */}
      <section className="bg-[#0D0D0D] px-6 pt-3 pb-10 text-center">
        <h1
          className="text-4xl md:text-5xl font-light text-[#F5F3EF] leading-tight max-w-3xl mx-auto"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          Where Nordic Design Meets Water Science
        </h1>
        <div className="mx-auto mt-6 w-12 h-px bg-[#C4885A]" />
      </section>

      {/* Editorial sections */}
      <section className="bg-[#0D0D0D] px-6 pb-24">
        <div className="max-w-2xl mx-auto flex flex-col gap-20">

          {/* Section 1 */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#C4885A] mb-6 font-light">The Idea</p>
            <h2
              className="text-2xl md:text-3xl font-light text-[#F5F3EF] mb-6 leading-snug"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Born from a belief that the simplest rituals deserve the purest ingredients.
            </h2>
            <div className="space-y-5 text-[#9E9791] text-sm md:text-base leading-relaxed font-light">
              <p>
                Vesi Living was founded on a simple but uncompromising idea: that the water touching your body every morning should be as clean and considered as everything else in your home. The name comes from the Finnish word for water — a nod to the Nordic culture of stillness, purity, and intentional living that sits at the heart of everything we make.
              </p>
              <p>
                We grew up watching Scandinavian design solve complex problems with quiet elegance. Not through excess, but through restraint. We asked ourselves: why had no one applied that philosophy to something as fundamental as shower water? The answer became Vesi Living.
              </p>
              <p>
                Our founders spent two years researching filtration technology, studying the effects of chlorine and heavy metals on skin and hair, and working with industrial designers to build a product that looked as considered as it performed. The result is a showerhead that disappears into your bathroom — and transforms your water in ways you'll feel from day one.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#F5F3EF]/10" />

          {/* Section 2 */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#C4885A] mb-6 font-light">The Science</p>
            <h2
              className="text-2xl md:text-3xl font-light text-[#F5F3EF] mb-6 leading-snug"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Filtration engineered to remove what matters most.
            </h2>
            <div className="space-y-5 text-[#9E9791] text-sm md:text-base leading-relaxed font-light">
              <p>
                Every Vesi showerhead contains a dual-stage filtration system built around two of the most effective water treatment media available: KDF-55 and activated carbon. Together, they target the contaminants most commonly found in municipal tap water — chlorine, chloramines, heavy metals, and dissolved solids that accumulate on your skin and scalp with every shower.
              </p>
              <p>
                KDF-55 uses a copper-zinc redox reaction to neutralise free chlorine and inhibit the growth of bacteria and algae within the filter itself — meaning your filter stays cleaner for longer. The activated carbon stage adsorbs organic compounds and volatile chemicals, eliminating the dry, tight feeling that chlorinated water leaves behind.
              </p>
              <p>
                The result is water that's softer on your skin, gentler on colour-treated hair, and free from the chemical smell that comes with most household showers. Our filters are rated for approximately 10,000 litres — roughly 6 months of daily use — and are designed to be replaced in under 30 seconds with no tools required.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D0D0D] py-8 text-center mt-auto border-t border-[#F5F3EF]/10">
        <p className="text-[#9E9791] text-xs tracking-widest">© 2025 Vesi Living. All rights reserved.</p>
      </footer>

    </div>
  );
}
