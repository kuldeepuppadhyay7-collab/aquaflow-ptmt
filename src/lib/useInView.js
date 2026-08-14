import { useEffect, useRef, useState } from 'react'

/**
 * One-shot viewport detection. Replaces the reference's ScrollTrigger for
 * reveals and its bespoke observer inside CountUp -- same trigger point
 * (element 20% into the viewport), no library.
 */
export function useInView({ threshold = 0.2, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    obs.observe(node)
    return () => obs.disconnect()
  }, [threshold, rootMargin])

  return [ref, inView]
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
