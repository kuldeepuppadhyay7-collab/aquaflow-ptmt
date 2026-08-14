import { ArrowUpRight, Phone } from 'lucide-react'
import { brand, hero } from '../lib/content'

/**
 * Reference §2: full 100dvh, content bottom-aligned, two-line h1 with the
 * second line in serif italic, mono eyebrow, dual CTA, scroll indicator, and
 * floating themed particles top-right.
 *
 * DEVIATION — the background. The reference drops a raw Unsplash URL into an
 * <img> at brightness-[0.55]. That hotlinks someone else's licence, ships no
 * srcset or dimensions, and makes an un-preloaded remote image the LCP element
 * of the page. Here the ground is a built dark field (gradient + technical
 * grid + noise) with a slot for the real factory photograph.
 *
 * To wire the photo: drop public/images/IMG-HERO-01.jpg and uncomment the
 * <img> below. The overlays are already sized for it.
 *
 * The entrance uses .rise (CSS) rather than gsap.from, with the same timings
 * as structure.md: 40/60/24px rise, 0.3s / 0.5s / 0.8s delays, 0.12s stagger.
 */
export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100dvh] overflow-hidden bg-deep">
      {/* Ground */}
      <div className="absolute inset-0 grid-bg-dark" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 55% at 72% 18%, rgba(133,196,235,0.28), transparent 62%), radial-gradient(60% 45% at 12% 88%, rgba(232,149,111,0.14), transparent 60%)',
        }}
      />
      {/*
      <img
        src="/images/IMG-HERO-01.jpg"
        alt=""
        width="2400"
        height="1600"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.4]"
      />
      */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep/85 via-deep/45 to-deep/80" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-deep to-transparent" />
      <div className="noise-field" />

      {/* Floating themed particles, top-right (reference §2) */}
      <div className="pointer-events-none absolute right-[8%] top-[22%] hidden sm:block" aria-hidden="true">
        {[
          { x: 0, y: 0, s: 10, d: '0s', o: 0.55 },
          { x: 34, y: 26, s: 6, d: '1.1s', o: 0.4 },
          { x: -22, y: 44, s: 8, d: '2.2s', o: 0.3 },
          { x: 52, y: -18, s: 5, d: '0.6s', o: 0.45 },
        ].map((p, i) => (
          <span
            key={i}
            className="absolute animate-float rounded-full bg-primary"
            style={{
              left: p.x,
              top: p.y,
              height: p.s,
              width: p.s,
              opacity: p.o,
              animationDelay: p.d,
            }}
          />
        ))}
      </div>

      {/* Hairlines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="shell relative z-10 flex min-h-[100dvh] flex-col justify-end pb-20 pt-32">
        <p
          className="rise font-mono text-[10px] uppercase tracking-[0.25em] text-white/60 sm:text-xs"
          style={{ '--rise-delay': '300ms' }}
        >
          {hero.eyebrow}
        </p>

        <h1 className="mt-6 max-w-5xl font-display text-5xl font-bold leading-[0.95] tracking-tighter text-white sm:text-7xl lg:text-8xl">
          <span className="rise block" style={{ '--rise-delay': '300ms' }}>
            {hero.line1}
          </span>
          <span className="rise block font-serif font-medium italic" style={{ '--rise-delay': '500ms' }}>
            {hero.line2}
          </span>
        </h1>

        <p
          className="rise mt-8 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          style={{ '--rise-delay': '800ms' }}
        >
          {hero.body}
        </p>

        <div className="rise mt-10 flex flex-wrap gap-3" style={{ '--rise-delay': '920ms' }}>
          <a
            href="#dealers"
            className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-ink shadow-lg shadow-primary/25"
          >
            {hero.ctaPrimary}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="#products"
            className="magnetic-btn glass-dark inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-semibold text-white"
          >
            {hero.ctaSecondary}
          </a>
          <a
            href={`tel:${brand.phoneTel}`}
            className="magnetic-btn inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-semibold text-white/85"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {brand.phoneDisplay}
          </a>
        </div>

        {/* Spec ticker — replaces the reference's decorative scroll furniture
            with something a trade buyer can actually read. */}
        <div
          className="rise mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-6"
          style={{ '--rise-delay': '1040ms' }}
        >
          {hero.ticker.map((item) => (
            <span key={item} className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-6 z-10 hidden items-center gap-3 sm:right-10 sm:flex lg:right-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">{hero.scroll}</span>
        <span className="block h-10 w-px bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  )
}
