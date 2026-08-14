import { useInView } from '../lib/useInView'

/**
 * Reference §3 reveal: y:40, opacity:0, 0.8s power3.out, 0.15s stagger.
 * Same numbers, expressed as a CSS transition that rests VISIBLE.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
