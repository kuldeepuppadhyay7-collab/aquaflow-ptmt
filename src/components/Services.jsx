import { Boxes, Cpu, Factory, Handshake, MapPinned, Settings2, Truck } from 'lucide-react'
import { services } from '../lib/content'
import SectionHead from './SectionHead'
import Reveal from './Reveal'

/**
 * Reference §6 — six dark tiles on a gap-px grid, where the gap itself draws
 * the 1px dividers. Hover lifts the tile to white/[0.03] and scales the icon.
 * This is the first of the two dark grounds used as punctuation.
 */
const ICONS = { Factory, Boxes, Truck, Handshake, Settings2, MapPinned, Cpu }

export default function Services() {
  return (
    <section className="relative overflow-hidden bg-deep py-24 sm:py-32 lg:py-40">
      <div className="grid-bg-dark absolute inset-0 opacity-60" />
      <div className="noise-field" />

      <div className="shell relative">
        <SectionHead
          eyebrow={services.eyebrow}
          heading={services.heading}
          accent={services.headingAccent}
          dark
        />

        <div className="mt-16 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item, i) => {
            const Icon = ICONS[item.icon] || Factory
            return (
              <Reveal
                key={item.title}
                delay={i * 90}
                className="group bg-deep p-8 transition-colors duration-300 hover:bg-white/[0.035] sm:p-10"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-primary" strokeWidth={2.2} aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{item.body}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
