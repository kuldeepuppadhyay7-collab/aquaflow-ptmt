import { capability } from '../lib/content'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import MouldLine from './line/MouldLine'
import IntegrityTest from './line/IntegrityTest'
import DispatchGrid from './line/DispatchGrid'

/**
 * Reference §3 — three cards, each carrying a live component, revealed on a
 * 0.15s stagger. Card anatomy per structure.md: eyebrow + h3, then the h-44
 * interactive box, then body copy and a bullet list.
 * The middle card holds the signature animation, as in the reference.
 */
const DEMOS = [MouldLine, IntegrityTest, DispatchGrid]

export default function Capability() {
  return (
    <section id="capability" className="section-y relative overflow-hidden bg-background">
      <div className="shell relative">
        <SectionHead
          eyebrow={capability.eyebrow}
          heading={capability.heading}
          accent={capability.headingAccent}
          body={capability.body}
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {capability.cards.map((card, i) => {
            const Demo = DEMOS[i]
            return (
              <Reveal
                key={card.index}
                delay={i * 150}
                className="flex flex-col rounded-3xl border border-divider bg-surface p-6 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-dark">
                    {card.eyebrow}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-muted">· {card.index}</span>
                </div>

                <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  {card.title}
                </h3>

                <div className="mt-6">
                  <Demo />
                </div>

                <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base">{card.body}</p>

                <ul className="mt-5 space-y-2 border-t border-divider pt-5">
                  {card.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm text-ink/75">
                      <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
