import { useState } from 'react'
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Phone,
  Upload,
  X,
} from 'lucide-react'
import { brand, contact } from '../lib/content'
import { Field, useSubmit } from './Field'
import SectionHead from './SectionHead'
import Reveal from './Reveal'

/**
 * Reference §8 — lg:grid-cols-12, left col-span-5 with contact cards and a
 * data-security line, right col-span-7 with the form on a white card, plus the
 * dashed drag-and-drop upload zone capped at five files.
 *
 * Changed from the reference: the upload accepts PDF alongside images, because
 * what a trade buyer sends is a drawing or a spec sheet, not a photo of a
 * leaking sink.
 */
const CARDS = [
  { icon: Phone, label: 'Phone', value: brand.phoneDisplay, href: `tel:${brand.phoneTel}` },
  { icon: Mail, label: 'Email', value: brand.email, href: `mailto:${brand.email}` },
  { icon: MapPin, label: 'Unit', value: brand.address },
  { icon: Clock, label: 'Hours', value: brand.hours },
]

const MAX_FILES = 5
const ACCEPTED = ['image/', 'application/pdf']

export default function Contact() {
  const [status, submit] = useSubmit()
  const [files, setFiles] = useState([])
  const [dragging, setDragging] = useState(false)

  const addFiles = (list) => {
    const next = [...list]
      .filter((f) => ACCEPTED.some((t) => f.type.startsWith(t)))
      .slice(0, MAX_FILES - files.length)
    setFiles((cur) => [...cur, ...next])
  }

  return (
    <section id="contact" className="section-y bg-background">
      <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
        {/* Left */}
        <div className="lg:col-span-5">
          <SectionHead
            eyebrow={contact.eyebrow}
            heading={contact.heading}
            accent={contact.headingAccent}
            body={contact.body}
          />

          <div className="mt-10 space-y-3">
            {CARDS.map((card, i) => {
              const Icon = card.icon
              const inner = (
                <>
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary-dark" strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      {card.label}
                    </span>
                    <span className="mt-0.5 text-sm font-medium text-ink">{card.value}</span>
                  </span>
                </>
              )
              return (
                <Reveal key={card.label} delay={i * 90}>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="lift-on-hover flex items-center gap-4 rounded-2xl border border-divider bg-surface p-4"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-2xl border border-divider bg-surface p-4">
                      {inner}
                    </div>
                  )}
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={200} className="mt-8 flex gap-2.5 text-xs leading-relaxed text-muted">
            <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-dark" aria-hidden="true" />
            {contact.security}
          </Reveal>
        </div>

        {/* Right */}
        <div className="lg:col-span-7">
          <Reveal className="rounded-3xl border border-divider bg-surface p-6 shadow-sm sm:p-9">
            {status === 'sent' ? (
              <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-12 w-12 text-primary-dark" strokeWidth={1.8} aria-hidden="true" />
                <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-ink">
                  {contact.sentTitle}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{contact.sentBody}</p>
              </div>
            ) : (
              <form onSubmit={(e) => submit(e, { form: 'general-enquiry', attachments: files.length })}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Name" name="name" required placeholder="Full name" />
                  <Field label="Email" name="email" type="email" required placeholder="name@firm.com" />
                  <Field label="Phone" name="phone" type="tel" required placeholder="+91" />
                  <Field label="Firm (optional)" name="firm" placeholder="Business name" />
                </div>

                <div className="mt-5">
                  <Field
                    label="Message"
                    name="message"
                    as="textarea"
                    required
                    rows={5}
                    placeholder="What you need, quantities if known, and by when."
                  />
                </div>

                {/* Upload zone */}
                <div className="mt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {contact.upload.title}
                  </p>
                  <label
                    onDragOver={(e) => {
                      e.preventDefault()
                      setDragging(true)
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault()
                      setDragging(false)
                      addFiles(e.dataTransfer.files)
                    }}
                    className={`mt-3 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors ${
                      dragging ? 'border-primary bg-primary/5' : 'border-divider hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="file"
                      multiple
                      accept="image/*,application/pdf"
                      className="sr-only"
                      onChange={(e) => addFiles(e.target.files)}
                    />
                    <Upload className="h-5 w-5 text-primary-dark" strokeWidth={2.2} aria-hidden="true" />
                    <span className="mt-3 text-sm font-medium text-ink">Drop files or browse</span>
                    <span className="mt-1 font-mono text-[10px] tracking-wide text-muted">
                      {contact.upload.hint}
                    </span>
                  </label>

                  {files.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {files.map((f, i) => (
                        <li
                          key={`${f.name}-${i}`}
                          className="flex items-center justify-between rounded-xl border border-divider bg-background px-3.5 py-2.5"
                        >
                          <span className="truncate font-mono text-[11px] text-ink/75">{f.name}</span>
                          <button
                            type="button"
                            onClick={() => setFiles((cur) => cur.filter((_, idx) => idx !== i))}
                            aria-label={`Remove ${f.name}`}
                            className="ml-3 shrink-0 rounded-full p-1 text-muted hover:bg-ink/5 hover:text-ink"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {status === 'error' && (
                  <p className="mt-6 flex items-start gap-2 rounded-xl border border-accent/40 bg-accent/10 p-3.5 text-xs leading-relaxed text-ink/80">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark" aria-hidden="true" />
                    <span>
                      This form could not be sent. Call {brand.phoneDisplay} or email{' '}
                      <a href={`mailto:${brand.email}`} className="underline">
                        {brand.email}
                      </a>
                      .
                    </span>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="magnetic-btn mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-ink disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      {contact.sending}
                    </>
                  ) : (
                    <>
                      {contact.submit}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
