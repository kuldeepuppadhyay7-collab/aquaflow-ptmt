import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion, useInView } from '../lib/useInView'

/**
 * animations.md CountUp, kept close to the reference: IntersectionObserver
 * trigger, requestAnimationFrame ticks, ease-out cubic.
 * Added: reduced-motion snaps to the final value instead of ticking, and the
 * RAF is cancelled on unmount (the reference version leaks a running frame).
 */
export default function CountUp({ end, duration = 2000, divisor = 1, suffix = '' }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const [value, setValue] = useState(0)
  const frame = useRef(0)

  useEffect(() => {
    if (!inView) return

    if (prefersReducedMotion()) {
      setValue(end)
      return
    }

    const startTs = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - startTs) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(end * eased))
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [inView, end, duration])

  const shown = divisor > 1 ? Math.round(value / divisor) : value

  return (
    <span ref={ref} className="tabular">
      {shown.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}
