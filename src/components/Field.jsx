import { useState } from 'react'

/**
 * Reference §8 field wrapper: label above input, primary focus ring.
 */
export function Field({ label, name, type = 'text', required = false, placeholder, as, rows = 5, options, dark = false }) {
  const base = dark
    ? 'w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40'
    : 'w-full rounded-xl border border-divider bg-background px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40'

  const id = `f-${name}`

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={`font-mono text-[10px] uppercase tracking-[0.18em] ${dark ? 'text-white/55' : 'text-muted'}`}
      >
        {label}
        {required && <span className={dark ? 'text-primary' : 'text-accent-dark'}> *</span>}
      </label>

      {as === 'textarea' ? (
        <textarea id={id} name={name} rows={rows} required={required} placeholder={placeholder} className={base} />
      ) : as === 'select' ? (
        <select id={id} name={name} required={required} className={base} defaultValue="">
          <option value="" disabled>
            Select
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input id={id} name={name} type={type} required={required} placeholder={placeholder} className={base} />
      )}
    </div>
  )
}

/**
 * Submit handling.
 *
 * DEVIATION from the reference, and the one I would not budge on: the
 * reference's ContactForm is `setTimeout(() => setStatus('sent'), 1200)`. It
 * renders a tick and throws the lead away. On a dealer-enquiry form that is a
 * lost account, not a cosmetic bug.
 *
 * This posts to VITE_FORM_ENDPOINT (any form backend, or your own handler).
 * If no endpoint is configured the form does NOT claim success -- it tells the
 * user to phone or email instead. Set the endpoint in .env:
 *
 *   VITE_FORM_ENDPOINT="https://your-handler.example/enquiry"
 */
export function useSubmit() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const submit = async (e, extra = {}) => {
    e.preventDefault()
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT

    if (!endpoint) {
      console.warn('[AquaFlow] VITE_FORM_ENDPOINT is not set — the form has nowhere to post.')
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const data = new FormData(e.target)
      Object.entries(extra).forEach(([k, v]) => data.append(k, v))
      const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return [status, submit]
}
