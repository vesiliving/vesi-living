import Image from 'next/image';

export const metadata = {
  title: 'Our Story — Vesi Living',
};

export default function OurStory() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <header className="bg-[#0D0D0D] pt-0 pb-0 flex justify-center items-center">
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
      <section className="bg-[#0D0D0D] px-6 pb-28">
        <div className="max-w-2xl mx-auto flex flex-col gap-24">

          {/* Section 1 */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#C4885A] mb-5 font-light">The Idea</p>
            <h2
              className="text-2xl md:text-3xl font-light text-[#F5F3EF] mb-4 leading-snug"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Born from a belief that the simplest rituals deserve the purest ingredients.
            </h2>
            <div className="w-8 h-px bg-[#C4885A] mb-8" />
            <div className="space-y-6 text-[#9E9791] text-sm md:text-base leading-relaxed font-light">
              <p>
                Vesi Living was founded on a simple but uncompromising idea: that the water touching your body every morning should be as clean and considered as everything else in your home. The name comes from the Finnish word for water, a nod to the Nordic culture of stillness, purity, and intentional living that sits at the heart of everything we make.
              </p>
              <p>
                Growing up in Finland, our founder took clean water for granted. Soft, mineral-balanced water was simply part of daily life, unremarkable, invisible, expected. It wasn't until moving to the United States that the difference became impossible to ignore. The dryness. The dull hair. The faint chemical smell that lingered long after stepping out of the shower. Around 85% of American homes deal with hard water, loaded with chlorine, heavy metals, and dissolved minerals that strip moisture from your skin and weaken your hair with every wash. Billions are spent each year on serums, conditioners, and treatments, most of them fighting a losing battle against water that should have been cleaner to begin with.
              </p>
              <p>
                The question wasn't why the water was bad. The question was why nobody had done anything about it, with the same quiet intelligence that Nordic design brings to everything else. The answer to that question became Vesi Living.
              </p>
            </div>
          </div>

          {/* Full-width rule */}
          <div className="w-full h-px bg-[#F5F3EF]/10" />

          {/* Section 2 */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#C4885A] mb-5 font-light">The Science</p>
            <h2
              className="text-2xl md:text-3xl font-light text-[#F5F3EF] mb-4 leading-snug"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Filtration engineered to remove what matters most.
            </h2>
            <div className="w-8 h-px bg-[#C4885A] mb-8" />
            <div className="space-y-6 text-[#9E9791] text-sm md:text-base leading-relaxed font-light">
              <p>
                Healthy hair and healthy skin start with your water, not your products. Every Vesi Showerhead contains a multi-stage filtration system built around two of the most effective water treatment media available: KDF-55 and PP Cotton. Together, they address a broad spectrum of contaminants most commonly found in municipal tap water. Chlorine, heavy metals, sediment, bacteria, and dissolved impurities that accumulate on your skin and scalp with every shower.
              </p>
              <p>
                KDF-55 is not a single filter, it's a high-purity copper-zinc alloy that performs multiple functions at once. Through a redox reaction, it neutralises free chlorine and converts soluble heavy metals into insoluble compounds that are safely removed from the water. At the same time, it inhibits the growth of bacteria, algae, and scale within the filter itself, meaning your filter stays cleaner and more effective across its full lifespan. The PP Cotton stage works alongside it as a precision mechanical barrier, capturing fine sediment, rust particles, and suspended solids before they ever reach your skin.
              </p>
              <p>
                The result is genuinely multi-stage filtration: chemical, biological, and mechanical action working in concert, not a single pass through one medium.
              </p>
              <p>
                Spending more on shampoos and moisturisers will only get you so far if the water itself is the problem. Vesi addresses the source.
              </p>
              <p>
                Water that's softer on your skin, gentler on colour-treated hair, and free from the chemical smell that comes with most household showers. Our filters are rated for approximately 10,000 litres — roughly 6 months of daily use — and are designed to be replaced in under 30 seconds with no tools required.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D0D0D] py-8 text-center border-t border-[#F5F3EF]/10 mt-auto">
        <p className="text-[#9E9791] text-xs tracking-widest">© 2025 Vesi Living. All rights reserved.</p>
      </footer>

    </div>
  );
}
