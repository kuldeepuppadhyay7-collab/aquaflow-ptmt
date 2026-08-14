import { useEffect, useRef, useState } from 'react'
import { process } from '../lib/content'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import Media from './Media'

/**
 * Reference §5 — the sticky stack. Cards pin at the top and recede as the next
 * one slides over them.
 *
 * TWO DEVIATIONS, both deliberate:
 *
 * 1. No GSAP scrub. The reference animates `filter: blur(6px) saturate(0.7)`
 *    on a scrub, which re-rasterizes the layer on every scroll frame and janks
 *    on mid-range Android. Here the recede is scale + opacity only, driven by
 *    an IntersectionObserver on each card's sentinel, so it composites on the
 *    GPU and never touches the filter pipeline.
 *
 * 2. Shorter travel. structure.md puts three cards in a 300vh parent — three
 *    full screens of scroll for three bullet lists. Four stages here in roughly
 *    the same distance: each card gets ~72vh rather than 100vh, so the section
 *    reads as a stack without holding the reader hostage.
 */
export default function Process() {
  return (
    <section id="process" className="relative bg-surface pb-24 pt-24 sm:pt-32 lg:pt-40">
      <div className="shell">
        <SectionHead eyebrow={process.eyebrow} heading={process.heading} accent={process.headingAccent} />
      </div>

      <div className="shell mt-16">
        {process.steps.map((step, i) => (
          <StackCard key={step.no} step={step} index={i} total={process.steps.length} />
        ))}
      </div>
    </section>
  )
}

function StackCard({ step, index, total }) {
  const ref = useRef(null)
  const [receded, setReceded] = useState(false)
  const isLast = index === total - 1

  useEffect(() => {
    const node = ref.current
    if (!node || isLast || typeof IntersectionObserver === 'undefined') return

    // Fires once the card has been pushed against the top of the viewport by
    // the card behind it — the moment the reference scrubs its blur.
    const obs = new IntersectionObserver(
      ([entry]) => setReceded(entry.boundingClientRect.top < 0 && !entry.isIntersecting),
      { threshold: 0, rootMargin: '-30% 0px -60% 0px' },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [isLast])

  return (
    <div ref={ref} className="sticky top-24" style={{ marginBottom: isLast ? 0 : '4rem' }}>
      <div
        className="overflow-hidden rounded-3xl border border-divider bg-background"
        style={{
          transform: receded ? 'scale(0.94)' : 'scale(1)',
          opacity: receded ? 0.45 : 1,
          transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.6s ease',
        }}
      >
        <div className="grid grid-cols-1 gap-8 p-7 sm:p-10 lg:grid-cols-5 lg:gap-12 lg:p-12">
          <div className="lg:col-span-3">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-5xl font-bold tracking-tighter text-primary/45">{step.no}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-dark">
                {step.eyebrow}
              </span>
            </div>

            <h3 className="mt-5 max-w-lg font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
              {step.title}
            </h3>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">{step.body}</p>

            <ul className="mt-7 space-y-2.5 border-t border-divider pt-6">
              {step.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-ink/75">
                  <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <Media id={step.media} className="h-52 w-full rounded-2xl lg:h-full lg:min-h-[16rem]" />
          </div>
        </div>
      </div>
    </div>
  )
}
