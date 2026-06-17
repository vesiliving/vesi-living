import Image from 'next/image';


export const metadata = {
  title: 'Blog — Vesi Living',
};

const posts = [
  {
    slug: 'hard-water-effects-skin-hair',
    date: 'May 12, 2025',
    title: 'What Hard Water Is Really Doing to Your Skin and Hair',
    excerpt:
      'Most people never connect their dry scalp, dull hair, or tight skin after showering to the water itself. Hard water — rich in calcium and magnesium ions — leaves a residue on everything it touches, including you. Here\'s what the science says, and what you can do about it.',
  },
  {
    slug: 'benefits-filtered-shower-water',
    date: 'April 3, 2025',
    title: 'Five Real Benefits of Showering in Filtered Water',
    excerpt:
      'From reducing chlorine exposure to preserving hair colour and relieving eczema-prone skin, filtered shower water delivers changes you can see and feel within days. We break down the five most commonly reported improvements — backed by research and our own customer feedback.',
  },
  {
    slug: 'nordic-bathroom-design',
    date: 'March 18, 2025',
    title: 'The Nordic Bathroom: Designing a Space for Daily Ritual',
    excerpt:
      'In Scandinavian homes, the bathroom is not an afterthought — it\'s a sanctuary. Clean lines, natural materials, and an absence of clutter create a space designed for presence rather than speed. We explore the principles behind Nordic bathroom design, and how small changes can transform your morning routine.',
  },
];

export default function Blog() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <header className="bg-[#0D0D0D] pt-0 pb-0 md:pt-4 flex justify-center items-center">
        <Image src="/logo.png" alt="Vesi Living" width={279} height={179} className="object-contain" style={{ marginTop: "-16px" }} unoptimized priority />
      </header>

      {/* Hero */}
      <section className="bg-[#0D0D0D] px-6 pt-3 pb-10 text-center">
        <h1
          className="text-4xl md:text-5xl font-light text-[#F5F3EF] leading-tight max-w-3xl mx-auto"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          Insights on Water, Wellness &amp; Nordic Living
        </h1>
        <div className="mx-auto mt-6 w-12 h-px bg-[#C4885A]" />
      </section>

      {/* Posts */}
      <section className="bg-[#F5F3EF] px-6 py-16 flex-1">
        <div className="max-w-2xl mx-auto flex flex-col divide-y divide-[#9E9791]/20">
          {posts.map((post) => (
            <article key={post.slug} className="py-12 first:pt-0">
              <p className="text-xs tracking-[0.25em] uppercase text-[#9E9791] font-light mb-4">{post.date}</p>
              <h2
                className="text-2xl md:text-3xl font-light text-[#0D0D0D] mb-4 leading-snug"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                {post.title}
              </h2>
              <p className="text-[#9E9791] text-sm leading-relaxed font-light mb-6">{post.excerpt}</p>
              <a
                href="#"
                className="text-xs tracking-[0.2em] uppercase text-[#C4885A] font-light hover:text-[#0D0D0D] transition-colors duration-200"
              >
                Read More
              </a>
            </article>
          ))}
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
