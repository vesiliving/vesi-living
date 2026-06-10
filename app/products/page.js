import Image from 'next/image';

export const metadata = {
  title: 'Products — Vesi Living',
};

function ProductCard({ name, finish, description, amazonUrl }) {
  return (
    <div className="bg-white flex flex-col">
      {/* Image area */}
      <div className="bg-[#F0EEE9] flex items-center justify-center aspect-square">
        <p className="text-[#9E9791]/40 text-xs tracking-widest uppercase">Product Image</p>
      </div>
      {/* Details */}
      <div className="p-8 flex flex-col flex-1">
        <p className="text-xs tracking-[0.25em] uppercase text-[#B07D5A] font-light mb-2">{finish}</p>
        <h3
          className="text-xl font-light text-[#0D0D0D] mb-4 leading-snug"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          {name}
        </h3>
        <p className="text-[#9E9791] text-sm leading-relaxed font-light mb-6 flex-1">{description}</p>
        <div className="flex items-center justify-between">
          <span
            className="text-2xl font-light text-[#0D0D0D]"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            $79.99
          </span>
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#B07D5A] text-[#F5F3EF] text-xs tracking-[0.2em] uppercase font-light px-6 py-3 transition-colors duration-300 hover:bg-[#0D0D0D]"
          >
            View on Amazon
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <header className="bg-[#0D0D0D] pt-6 pb-3 flex justify-center items-center">
        <Image src="/logo.png" alt="Vesi Living" width={398} height={256} className="object-contain" unoptimized priority />
      </header>

      {/* Hero */}
      <section className="bg-[#0D0D0D] px-6 pt-3 pb-10 text-center">
        <h1
          className="text-4xl md:text-5xl font-light text-[#F5F3EF] leading-tight max-w-2xl mx-auto"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          Designed to Perform. Built to Last.
        </h1>
        <div className="mx-auto mt-6 mb-6 w-12 h-px bg-[#B07D5A]" />
        <p className="text-[#9E9791] text-base max-w-md mx-auto leading-relaxed font-light">
          Two finishes. One standard of filtration. Find the Vesi showerhead that fits your space.
        </p>
      </section>

      {/* Product cards */}
      <section className="bg-[#F5F3EF] px-6 py-16 flex-1">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductCard
            name="Vesi Filtered Shower Head"
            finish="Black / Copper"
            description="Our signature finish — a matte black body with copper-toned filter housing. KDF-55 and activated carbon dual filtration. Removes chlorine, heavy metals, and impurities for visibly healthier skin and hair. Fits all standard shower arms."
            amazonUrl="#"
          />
          <ProductCard
            name="Vesi Filtered Shower Head"
            finish="White / Chrome"
            description="A clean, minimal profile in bright white with a polished chrome filter housing. Identical filtration performance to the Black/Copper, designed for lighter bathrooms and modern Scandinavian interiors. Universal shower arm fitting."
            amazonUrl="#"
          />
        </div>

        {/* Filter note */}
        <div className="max-w-4xl mx-auto mt-12 pt-10 border-t border-[#9E9791]/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { stat: '10,000L', label: 'Filter capacity per cartridge' },
              { stat: '~6 months', label: 'Average filter lifespan' },
              { stat: '< 30 sec', label: 'Filter replacement time' },
            ].map(({ stat, label }) => (
              <div key={stat}>
                <p
                  className="text-3xl font-light text-[#0D0D0D] mb-2"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  {stat}
                </p>
                <p className="text-xs tracking-widest uppercase text-[#9E9791] font-light">{label}</p>
              </div>
            ))}
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
