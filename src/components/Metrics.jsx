import { metrics } from '../lib/content'
import CountUp from './CountUp'
import Reveal from './Reveal'

/**
 * Reference §4 — animated counter trio on a 3-col grid with vertical dividers,
 * soft blurred colour blobs behind, and a sweep line under each number.
 */
export default function Metrics() {
  return (
    <section className="section-y relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />

      <div className="shell relative">
        <Reveal
          as="p"
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-dark sm:text-xs"
        >
          {metrics.eyebrow}
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-divider">
          {metrics.items.map((item, i) => (
            <Reveal key={item.label} delay={i * 150} className={`lg:px-10 ${i === 0 ? 'lg:pl-0' : ''}`}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{item.label}</p>

              <p className="mt-4 font-display text-6xl font-bold tracking-tighter text-ink sm:text-7xl">
                <span className="gradient-text">
                  <CountUp end={item.value} divisor={item.divisor || 1} suffix={item.suffix} />
                </span>
              </p>

              <div className="mt-3 h-px w-full overflow-hidden bg-divider">
                <div
                  className="h-px w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
                  style={{ animation: 'sweep 3s ease-in-out infinite', animationDelay: `${i * 0.4}s` }}
                />
              </div>

              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-primary-dark">
                {item.unit}
              </p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" delay={200} className="mt-14 max-w-2xl font-mono text-[11px] leading-relaxed text-muted">
          {metrics.footnote}
        </Reveal>
      </div>
    </section>
  )
}
