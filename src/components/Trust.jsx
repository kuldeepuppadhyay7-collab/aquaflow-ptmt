import { Cpu, Network, ShieldCheck } from 'lucide-react'
import { trust } from '../lib/content'
import Reveal from './Reveal'

/**
 * Reference §7 — three credibility badges on white rounded-2xl cards with a
 * soft shadow and a hover lift.
 *
 * Deliberately unclaimed: no ISI mark, no BIS licence number, no ISO badge.
 * The brief did not supply certificate numbers, and inventing one on a
 * manufacturer's site is a liability rather than a design flourish.
 */
const ICONS = { Cpu, ShieldCheck, Network }

export default function Trust() {
  return (
    <section className="section-y bg-background">
      <div className="shell">
        <Reveal
          as="p"
          className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-primary-dark sm:text-xs"
        >
          {trust.eyebrow}
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
          {trust.items.map((item, i) => {
            const Icon = ICONS[item.icon] || ShieldCheck
            return (
              <Reveal
                key={item.title}
                delay={i * 130}
                className="lift-on-hover rounded-2xl border border-divider bg-surface p-7 shadow-[0_1px_2px_rgba(15,20,25,0.04),0_12px_28px_-18px_rgba(15,20,25,0.25)]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary-dark" strokeWidth={2.2} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.body}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
