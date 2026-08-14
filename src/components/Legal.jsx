import { useEffect } from 'react'
import { X } from 'lucide-react'
import { legal } from '../lib/content'

/**
 * Privacy and Terms as an overlay rather than routes.
 *
 * DEVIATION from tech-setup.md, which pulls in react-router-dom to serve two
 * static legal pages. That is a router, a BrowserRouter provider and a
 * deploy-time SPA fallback rule for two documents nobody deep-links. If these
 * ever need their own URLs, add the router then.
 */
export default function Legal({ doc, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = doc ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [doc, onClose])

  if (!doc) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={doc}
    >
      <div
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-t-4xl bg-surface p-7 sm:rounded-4xl sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-6">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink">{doc}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-muted hover:bg-ink/5 hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {legal[doc].map((para, i) => (
            <p key={i} className="text-sm leading-relaxed text-muted">
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
