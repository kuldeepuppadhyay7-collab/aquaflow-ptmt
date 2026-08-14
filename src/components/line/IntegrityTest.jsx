import { useEffect, useState } from 'react'

/**
 * THE SIGNATURE ANIMATION — reference §3b (MaintenanceRain, lines 372–590).
 *
 * All nine structural elements from animations.md are kept:
 *   1 themed gradient ground        6 ripples on the surface
 *   2 atmospheric blur blobs        7 header strip (eyebrow + count)
 *   3 source element at the top     8 footer strip (status dot + cycling text)
 *   4 falling particle field (×7)   9 keyframes (moved to index.css)
 *   5 surface line at the bottom
 *
 * RE-SKIN, and the reason for it:
 * The reference default for "plumbing / water" is a leaking pipe — drops fall,
 * a leak is detected, a technician is dispatched, it gets fixed. That story
 * belongs to a plumbing SERVICE. AquaFlow is a manufacturer, and its product
 * is the thing water gets thrown AT.
 *
 * So the source is a test-rig spray manifold, the particles are water jets,
 * the surface is a PTMT tap body under test, and the ripples are water beading
 * off it rather than pooling. The status line runs a test cycle instead of a
 * service call. Same skeleton, opposite subject: the water fails, not the part.
 */
export default function IntegrityTest() {
  const [statusIdx, setStatusIdx] = useState(0)
  const [batch, setBatch] = useState(41)

  const statuses = [
    { text: 'Pressure hold · 12 bar', label: 'Holding', tone: 'primary' },
    { text: 'Spindle cycled · 20,000', label: 'Cycling', tone: 'accent' },
    { text: 'Wet exposure · 240 h', label: 'Soaking', tone: 'primary' },
    { text: 'No seepage · no corrosion', label: 'Passed', tone: 'emerald' },
  ]

  useEffect(() => {
    const id = setInterval(() => {
      setStatusIdx((idx) => {
        const next = (idx + 1) % statuses.length
        if (statuses[next].label === 'Passed') setBatch((b) => b + 1)
        return next
      })
    }, 2300)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Seven jets from the manifold — staggered so the field never pulses in sync.
  const jets = [
    { left: '13%', delay: '0.0s', dur: '2.5s', h: 20 },
    { left: '25%', delay: '1.2s', dur: '2.9s', h: 15 },
    { left: '37%', delay: '0.5s', dur: '2.7s', h: 22 },
    { left: '50%', delay: '1.7s', dur: '2.3s', h: 17 },
    { left: '63%', delay: '0.9s', dur: '3.0s', h: 21 },
    { left: '75%', delay: '2.0s', dur: '2.6s', h: 15 },
    { left: '87%', delay: '0.3s', dur: '2.8s', h: 19 },
  ]

  // Beads scattering off the moulded surface.
  const beads = [
    { left: '26%', delay: '0.2s' },
    { left: '50%', delay: '1.0s' },
    { left: '74%', delay: '1.8s' },
  ]

  const status = statuses[statusIdx]
  const toneText =
    status.tone === 'emerald'
      ? 'text-emerald-700'
      : status.tone === 'accent'
        ? 'text-accent-dark'
        : 'text-primary-dark'
  const toneDot =
    status.tone === 'emerald' ? 'bg-emerald-500' : status.tone === 'accent' ? 'bg-accent' : 'bg-primary-mid'

  return (
    <div
      className="relative h-44 w-full overflow-hidden rounded-3xl border border-primary/20"
      style={{ background: 'linear-gradient(180deg, #F2F9FD 0%, #E2EEF6 62%, #D2E6F2 100%)' }}
    >
      {/* 2 — atmospheric blobs */}
      <div className="absolute -top-8 -left-6 h-20 w-32 rounded-full bg-white/70 blur-2xl" />
      <div className="absolute top-1 right-8 h-16 w-24 rounded-full bg-white/50 blur-xl" />

      {/* 7 — header strip */}
      <div className="absolute inset-x-4 top-3 z-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            className="h-3.5 w-3.5 text-primary-dark"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z" />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-dark">
            Test rig · bay 02
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display text-sm font-bold tabular text-ink">
            {String(batch).padStart(3, '0')}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted">batch</span>
        </div>
      </div>

      {/* 3 — source: spray manifold with nozzles (replaces the reference pipe) */}
      <svg className="absolute inset-x-3 top-9 h-5" viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true">
        <rect x="0" y="6" width="400" height="8" rx="4" fill="#85C4EB" fillOpacity="0.3" />
        <rect x="0" y="7" width="400" height="2" fill="#2E7DB0" fillOpacity="0.35" />
        <rect x="0" y="4" width="7" height="12" rx="1.5" fill="#2E7DB0" fillOpacity="0.5" />
        <rect x="393" y="4" width="7" height="12" rx="1.5" fill="#2E7DB0" fillOpacity="0.5" />
        {[52, 100, 148, 200, 252, 300, 348].map((x) => (
          <g key={x}>
            <rect x={x - 3} y="12" width="6" height="5" rx="1.5" fill="#2E7DB0" fillOpacity="0.55" />
            <rect x={x - 5} y="2" width="10" height="5" rx="1.5" fill="#5FA9D6" fillOpacity="0.45" />
          </g>
        ))}
      </svg>

      {/* 4 — falling jet field */}
      <div className="absolute inset-x-0 top-14 bottom-10" aria-hidden="true">
        {jets.map((jet, i) => (
          <span
            key={i}
            className="absolute top-0"
            style={{
              left: jet.left,
              animation: `jet-fall ${jet.dur} linear infinite`,
              animationDelay: jet.delay,
            }}
          >
            <svg width={jet.h * 0.42} height={jet.h} viewBox="0 0 10 24" fill="none">
              <defs>
                <linearGradient id={`jet-${i}`} x1="5" y1="0" x2="5" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#B3D9F2" stopOpacity="0.25" />
                  <stop offset="0.45" stopColor="#85C4EB" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#2E7DB0" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              <path d="M5 0c1.6 5 4 9.4 4 13.6A4 4 0 0 1 1 13.6C1 9.4 3.4 5 5 0z" fill={`url(#jet-${i})`} />
              <ellipse cx="3.6" cy="14.4" rx="1" ry="2.1" fill="#FFFFFF" fillOpacity="0.6" />
            </svg>
          </span>
        ))}
      </div>

      {/* 5 — surface: the moulded body under test (replaces the water surface) */}
      <svg
        className="absolute inset-x-0 bottom-8 h-12 w-full"
        viewBox="0 0 400 48"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* bench line */}
        <path d="M0 40 H400" stroke="#2E7DB0" strokeOpacity="0.28" strokeWidth="1.5" />
        <path d="M0 44 H400" stroke="#2E7DB0" strokeOpacity="0.14" strokeWidth="1" />
        {/* tap body silhouette, centred */}
        <g fill="#2E7DB0" fillOpacity="0.5">
          <rect x="176" y="26" width="48" height="14" rx="4" />
          <rect x="190" y="12" width="20" height="16" rx="5" />
          <rect x="184" y="6" width="32" height="7" rx="3.5" />
          <rect x="224" y="29" width="30" height="7" rx="3.5" />
        </g>
        <rect x="184" y="8" width="32" height="2" rx="1" fill="#FFFFFF" fillOpacity="0.5" />
        {/* flanking bodies, dimmed for depth */}
        <g fill="#2E7DB0" fillOpacity="0.2">
          <rect x="86" y="30" width="36" height="10" rx="3" />
          <rect x="98" y="20" width="14" height="11" rx="4" />
          <rect x="284" y="30" width="36" height="10" rx="3" />
          <rect x="296" y="20" width="14" height="11" rx="4" />
        </g>
      </svg>

      {/* 6 — beads scattering off the surface */}
      <div className="absolute inset-x-0 bottom-[3.1rem]" aria-hidden="true">
        {beads.map((bead, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full border border-primary-mid/70"
            style={{
              left: bead.left,
              animation: 'bead-off 2.3s ease-out infinite',
              animationDelay: bead.delay,
            }}
          />
        ))}
      </div>

      {/* 8 — footer strip with cycling status */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between border-t border-primary/20 bg-white/70 px-4 py-2 backdrop-blur-sm">
        <div key={statusIdx} className="flex items-center gap-2" style={{ animation: 'soft-in 0.4s ease-out both' }}>
          <span className={`h-1.5 w-1.5 rounded-full ${toneDot}`} style={{ animation: 'halo 2s infinite' }} />
          <span className={`font-mono text-[10px] tracking-wide ${toneText}`}>{status.text}</span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">{status.label}</span>
      </div>
    </div>
  )
}
