import { Droplets } from 'lucide-react'
import { brand, footer, nav } from '../lib/content'

/**
 * Reference §9 — dark footer, big tagline band, then a multi-column grid with
 * the stacked logo lockup (logo.md variant D), link columns, contact column,
 * and the pulsing green status dot. Legal row beneath a hairline.
 */
export default function Footer({ onOpenLegal }) {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-deep text-white">
      <div className="grid-bg-dark absolute inset-0 opacity-40" />

      <div className="shell relative py-20 sm:py-24">
        <p className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tighter sm:text-5xl">
          {footer.tagline}{' '}
          <span className="font-serif font-medium italic">{footer.taglineAccent}</span>
        </p>

        <div className="mt-16 grid grid-cols-2 gap-10 border-t border-white/10 pt-12 lg:grid-cols-5">
          {/* Brand block */}
          <div className="col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Droplets className="h-5 w-5 text-ink" strokeWidth={2.4} aria-hidden="true" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-2xl font-bold">{brand.name}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
                  {brand.descriptor}
                </span>
              </span>
            </div>

            <p className="mt-2 max-w-xs font-serif text-lg italic text-white/70">{brand.line}</p>

            <div className="mt-3 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                {brand.status}
              </span>
            </div>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href={nav.links.find((n) => n.label === link)?.href || '#products'}
                      className="lift-on-hover inline-block text-sm text-white/65 hover:text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/65">
              <li>
                <a href={`tel:${brand.phoneTel}`} className="hover:text-primary">
                  {brand.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.email}`} className="hover:text-primary">
                  {brand.email}
                </a>
              </li>
              <li className="leading-relaxed">{brand.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] tracking-wide text-white/35">
            © {year} {brand.full}. {footer.legalNote}
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms'].map((doc) => (
              <button
                key={doc}
                type="button"
                onClick={() => onOpenLegal(doc)}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 hover:text-primary"
              >
                {doc}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
