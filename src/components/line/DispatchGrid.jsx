import { useEffect, useState } from 'react'

/**
 * Reference §3c (RenovationScheduler, lines 595–688): an SVG cursor travels
 * to a calendar day, a click animation fires, a confirmation state appears,
 * then the five-step loop restarts.
 *
 * RE-SKIN: the calendar becomes a dispatch board. The cursor picks a territory
 * cell, the click allocates stock against it, and the confirmation is a
 * dispatch note rather than a booking. Same five-phase loop, same cursor
 * mechanic — the reference books a homeowner's visit; this one moves cartons.
 */

const CELLS = [
  'Delhi NCR', 'Jaipur', 'Lucknow',
  'Kanpur', 'Indore', 'Chandigarh',
  'Dehradun', 'Agra', 'Patna',
]

const TARGET = 4 // Indore
const PHASES = ['idle', 'travel', 'press', 'allocate', 'confirm']

export default function DispatchGrid() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % PHASES.length), 1400)
    return () => clearInterval(id)
  }, [])

  const name = PHASES[phase]
  const arrived = name === 'press' || name === 'allocate' || name === 'confirm'
  const selected = name === 'allocate' || name === 'confirm'

  // Cursor rests bottom-right, travels to the target cell.
  const cursor = arrived ? { left: '52%', top: '52%' } : { left: '78%', top: '80%' }

  return (
    <div className="relative h-44 w-full overflow-hidden rounded-3xl border border-divider bg-[#F4F8FB]">
      <div className="grid-bg absolute inset-0 opacity-60" />

      <div className="absolute inset-x-4 top-3 z-20 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-dark">
          Dispatch board
        </span>
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted">week 32</span>
      </div>

      {/* territory grid */}
      <div className="absolute inset-x-5 top-11 grid grid-cols-3 gap-1.5">
        {CELLS.map((cell, i) => {
          const isTarget = i === TARGET
          const active = isTarget && selected
          const pressed = isTarget && name === 'press'
          return (
            <div
              key={cell}
              className={`rounded-md border px-1.5 py-2 text-center transition-all duration-300 ${
                active
                  ? 'border-primary-dark bg-primary/25'
                  : pressed
                    ? 'border-primary-mid bg-primary/15'
                    : 'border-divider bg-surface'
              }`}
              style={{ transform: pressed ? 'scale(0.96)' : 'scale(1)' }}
            >
              <span
                className={`font-mono text-[8.5px] tracking-tight ${
                  active ? 'text-primary-dark' : 'text-muted'
                }`}
              >
                {cell}
              </span>
            </div>
          )
        })}
      </div>

      {/* cursor */}
      <div
        className="absolute z-30"
        style={{
          left: cursor.left,
          top: cursor.top,
          transition: 'left 0.7s cubic-bezier(0.25,0.46,0.45,0.94), top 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
          transform: name === 'press' ? 'scale(0.85)' : 'scale(1)',
        }}
        aria-hidden="true"
      >
        <svg width="15" height="19" viewBox="0 0 15 19" fill="none">
          <path d="M1 1l12.4 6.6-5.4 1.3L5.6 18 1 1z" fill="#1A1A1A" stroke="#FFFFFF" strokeWidth="1.1" />
        </svg>
      </div>

      {/* confirmation slip */}
      <div
        className="absolute inset-x-5 bottom-9 rounded-lg border border-primary/30 bg-white px-3 py-2 shadow-sm transition-all duration-500"
        style={{
          opacity: name === 'confirm' ? 1 : 0,
          transform: name === 'confirm' ? 'translateY(0)' : 'translateY(8px)',
        }}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9.5px] tracking-wide text-primary-dark">
            Indore · 4,800 pcs allocated
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-700">Booked</span>
        </div>
      </div>

      {/* footer strip */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between border-t border-divider bg-white/75 px-4 py-2 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${name === 'confirm' ? 'bg-emerald-500' : 'bg-primary-mid'}`}
            style={{ animation: 'halo 2s infinite' }}
          />
          <span className="font-mono text-[10px] tracking-wide text-muted">
            {name === 'confirm' ? 'Dispatch note issued' : 'Allocating against stock'}
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">Live</span>
      </div>
    </div>
  )
}
