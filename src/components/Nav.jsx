import { useEffect, useState } from 'react'
import { ArrowUpRight, Droplets, Menu, X } from 'lucide-react'
import { brand, nav } from '../lib/content'

/**
 * Reference §1: fixed pill, centred, max-w-5xl, transparent over the hero and
 * frosted glass past 80px, hamburger below lg with a full-screen deep overlay.
 *
 * Logo lockup is variant A from logo.md — 36px primary badge + wordmark. Icon
 * is Droplets per the plumbing/water row of the icon picker.
 *
 * Added over the reference: a skip link, aria-expanded/aria-controls on the
 * hamburger, Escape to close, and scroll lock while the overlay is open. The
 * reference ships the mobile menu with none of these.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const linkTone = scrolled || open ? 'text-ink' : 'text-white'

  return (
    <>
      <a
        href="#capability"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${
          scrolled ? 'glass shadow-sm' : 'border border-transparent'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <a href="#top" className="group flex items-center gap-2.5" aria-label={`${brand.full} — home`}>
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <Droplets className="h-5 w-5 text-white" strokeWidth={2.4} aria-hidden="true" />
              <span className="absolute inset-0 rounded-full ring-2 ring-primary/30 transition group-hover:ring-primary/60" />
            </span>
            <span className="flex flex-col leading-none">
              <span className={`font-display text-lg font-bold tracking-tight transition-colors ${linkTone}`}>
                {brand.name}
              </span>
              <span
                className={`font-mono text-[8.5px] uppercase tracking-[0.2em] transition-colors ${
                  scrolled || open ? 'text-muted' : 'text-white/60'
                }`}
              >
                {brand.descriptor}
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`lift-on-hover text-sm font-medium transition-colors ${linkTone} hover:text-primary-dark`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#dealers"
              className="magnetic-btn hidden items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-ink shadow-lg shadow-primary/25 sm:inline-flex"
            >
              {nav.cta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors lg:hidden ${
                scrolled || open ? 'text-ink hover:bg-ink/5' : 'text-white hover:bg-white/10'
              }`}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-0 z-[55] rounded-b-5xl bg-deep/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-6 opacity-0'
        }`}
      >
        <div className="px-6 pb-10 pt-6">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-bold text-white">{brand.name}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-8 flex flex-col" aria-label="Mobile">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 font-display text-2xl font-semibold text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#dealers"
            onClick={() => setOpen(false)}
            className="magnetic-btn mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-ink"
          >
            {nav.cta}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>

          <a href={`tel:${brand.phoneTel}`} className="mt-4 block text-center font-mono text-sm text-white/60">
            {brand.phoneDisplay}
          </a>
        </div>
      </div>
    </>
  )
}
