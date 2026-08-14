/**
 * Photography is not sourced yet. Rather than hotlink stock images (the
 * reference drops a raw Unsplash URL into the hero), every image slot renders
 * a labelled technical field printing its asset ID, so a missing photograph
 * reads as a deliberate gap instead of a broken page.
 *
 * To wire real photography: drop files into public/images/ named by ID
 * (e.g. public/images/IMG-PROCESS-01.jpg) and pass src to this component.
 * Nothing else has to change.
 */
export default function Media({ id, className = '', tone = 'light', label }) {
  const dark = tone === 'dark'
  return (
    <div
      className={`relative overflow-hidden ${
        dark ? 'bg-deep' : 'bg-[#EDF4F9]'
      } ${className}`}
      role="img"
      aria-label={label || `Photograph pending: ${id}`}
    >
      <div className={dark ? 'grid-bg-dark absolute inset-0' : 'grid-bg absolute inset-0'} />
      <div className="noise-field" />
      <div
        className="absolute inset-0"
        style={{
          background: dark
            ? 'radial-gradient(120% 80% at 30% 0%, rgba(133,196,235,0.18), transparent 60%)'
            : 'radial-gradient(120% 80% at 30% 0%, rgba(133,196,235,0.35), transparent 65%)',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
        <span
          className={`font-mono text-[9px] uppercase tracking-[0.24em] ${
            dark ? 'text-white/35' : 'text-primary-dark/55'
          }`}
        >
          {id}
        </span>
        <span className={`font-mono text-[9px] tracking-widest ${dark ? 'text-white/20' : 'text-ink/25'}`}>
          photograph pending
        </span>
      </div>
    </div>
  )
}
