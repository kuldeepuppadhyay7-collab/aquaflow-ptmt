import { useEffect, useState } from 'react'

/**
 * Reference §3a (HeatingShuffler, lines 305–367): three cards stacked in
 * z-order, rotating every 3s; the front card is sharp, the two behind are
 * scaled down, blurred and dimmed.
 *
 * RE-SKIN: the stack is now the tool queue on a moulding press. The front
 * card is the SKU currently in the cavity; the two behind are queued. A press
 * head closes on a loop above the stack so the rotation reads as a shot
 * completing rather than a carousel advancing.
 */

const QUEUE = [
  { sku: 'AF-BC-104', name: 'Bib cock · long body', cavity: '4-cavity tool', cycle: '38 s' },
  { sku: 'AF-AV-212', name: 'Angle valve · quarter turn', cavity: '8-cavity tool', cycle: '29 s' },
  { sku: 'AF-HF-330', name: 'Health faucet · head', cavity: '2-cavity tool', cycle: '46 s' },
]

export default function MouldLine() {
  const [front, setFront] = useState(0)
  const [shots, setShots] = useState(1284)

  useEffect(() => {
    const id = setInterval(() => {
      setFront((f) => (f + 1) % QUEUE.length)
      setShots((s) => s + 4)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-44 w-full overflow-hidden rounded-3xl border border-divider bg-[#F4F8FB]">
      <div className="grid-bg absolute inset-0 opacity-70" />

      {/* header strip — parallel to the signature component */}
      <div className="absolute inset-x-4 top-3 z-20 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-dark">
          Press 04 · running
        </span>
        <div className="flex items-baseline gap-1">
          <span className="font-display text-sm font-bold tabular text-ink">{shots.toLocaleString('en-IN')}</span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted">shots</span>
        </div>
      </div>

      {/* press head, closing on the same 3s beat as the rotation */}
      <div
        className="absolute left-1/2 top-9 z-10 h-3 w-40 -translate-x-1/2 rounded-b-md bg-primary-dark/25"
        style={{ animation: 'press-close 3s ease-in-out infinite' }}
        aria-hidden="true"
      >
        <div className="mx-auto h-full w-24 rounded-b-sm bg-primary-dark/35" />
      </div>

      {/* the stack */}
      <div className="absolute inset-x-5 bottom-4 top-14">
        {QUEUE.map((item, i) => {
          const pos = (i - front + QUEUE.length) % QUEUE.length
          const styles = [
            { transform: 'translateY(0) scale(1)', opacity: 1, filter: 'none', zIndex: 3 },
            { transform: 'translateY(10px) scale(0.94)', opacity: 0.55, filter: 'blur(1.5px)', zIndex: 2 },
            { transform: 'translateY(20px) scale(0.88)', opacity: 0.3, filter: 'blur(3px)', zIndex: 1 },
          ][pos]

          return (
            <div
              key={item.sku}
              className="absolute inset-x-0 top-0 rounded-2xl border border-divider bg-surface p-4 shadow-sm"
              style={{
                ...styles,
                transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.7s ease, filter 0.7s ease',
              }}
              aria-hidden={pos !== 0}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.16em] text-primary-dark">{item.sku}</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted">{item.cycle}</span>
              </div>
              <p className="mt-2 font-display text-sm font-bold leading-tight text-ink">{item.name}</p>
              <p className="mt-1 font-mono text-[10px] text-muted">{item.cavity}</p>
              <div className="mt-3 h-px w-full overflow-hidden bg-divider">
                <div
                  className="h-px w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
                  style={{ animation: 'sweep 3s ease-in-out infinite' }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
