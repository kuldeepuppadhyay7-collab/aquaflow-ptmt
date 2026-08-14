import { useState } from 'react'
import {
  ArrowUpRight,
  Bath,
  Cable,
  ChefHat,
  CloudRain,
  Droplets,
  Gauge,
  ShowerHead,
  Wrench,
} from 'lucide-react'
import { products } from '../lib/content'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import Media from './Media'

/**
 * NEW SECTION — product showcase (brief requirement). The reference has no
 * equivalent: it sells a service, so its only enumeration is the dark services
 * grid. A manufacturer's range is the thing a dealer scrolls for, so it gets a
 * section of its own, ahead of services.
 *
 * Card anatomy follows design-system.md: icon in a rounded-2xl primary/10 box,
 * h3, body, and a mono tag. Hover state matches the reference's tile hover.
 */
const ICONS = { Droplets, Wrench, Gauge, ShowerHead, CloudRain, Cable, Bath, ChefHat }

export default function Products() {
  const [active, setActive] = useState(0)

  return (
    <section id="products" className="section-y relative overflow-hidden bg-background">
      <div className="shell relative">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            eyebrow={products.eyebrow}
            heading={products.heading}
            accent={products.headingAccent}
            body={products.body}
          />
          <Reveal delay={200} className="shrink-0">
            <a
              href="#contact"
              className="magnetic-btn inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 text-sm font-semibold text-ink"
            >
              {products.cta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Preview panel — the selected family */}
          <Reveal className="lg:col-span-5">
            <div className="sticky top-28">
              <Media
                id={`IMG-PRODUCT-0${active + 1}`}
                className="aspect-[4/3] w-full rounded-3xl border border-divider"
                label={`Product photograph pending: ${products.items[active].name}`}
              />
              <div className="mt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark">
                  {products.items[active].tag}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
                  {products.items[active].name}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                  {products.items[active].body}
                </p>
              </div>
            </div>
          </Reveal>

          {/* The eight families */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7">
            {products.items.map((item, i) => {
              const Icon = ICONS[item.icon] || Droplets
              const isActive = i === active
              return (
                <Reveal key={item.name} delay={i * 70}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={`h-full w-full rounded-2xl border p-5 text-left transition-all duration-300 ${
                      isActive
                        ? 'border-primary bg-surface shadow-sm'
                        : 'border-divider bg-surface/60 hover:border-primary/40 hover:bg-surface'
                    }`}
                  >
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-300 ${
                        isActive ? 'scale-110 bg-primary/20' : 'bg-primary/10'
                      }`}
                    >
                      <Icon className="h-6 w-6 text-primary-dark" strokeWidth={2.2} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-ink">{item.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
                    <span className="mt-3 inline-block font-mono text-[9px] uppercase tracking-[0.2em] text-primary-dark">
                      {item.tag}
                    </span>
                  </button>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
