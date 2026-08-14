import Reveal from './Reveal'

/**
 * design-system.md type scale:
 *   H2 section  text-3xl sm:text-5xl lg:text-6xl tracking-tighter
 *   Mono eyebrow text-[10px] sm:text-xs uppercase tracking-[0.18em]
 * Serif italic accent line on every major heading (visual-examples.md).
 */
export default function SectionHead({ eyebrow, heading, accent, body, dark = false, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : ''
  return (
    <div className={`flex flex-col ${alignment} max-w-3xl`}>
      {eyebrow && (
        <Reveal
          as="p"
          className={`font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] ${
            dark ? 'text-primary' : 'text-primary-dark'
          }`}
        >
          {eyebrow}
        </Reveal>
      )}
      <Reveal
        as="h2"
        delay={80}
        className={`mt-5 font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.02] text-balance ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {heading}{' '}
        {accent && <span className="font-serif italic font-medium tracking-tight">{accent}</span>}
      </Reveal>
      {body && (
        <Reveal
          as="p"
          delay={160}
          className={`mt-6 text-base sm:text-lg leading-relaxed ${dark ? 'text-white/65' : 'text-muted'}`}
        >
          {body}
        </Reveal>
      )}
    </div>
  )
}
