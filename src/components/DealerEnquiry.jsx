import { useState } from 'react'
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react'
import { brand, dealers, products } from '../lib/content'
import { Field, useSubmit } from './Field'
import SectionHead from './SectionHead'
import Reveal from './Reveal'

/**
 * NEW SECTION — dealer enquiry (brief requirement).
 *
 * The reference has one form, and it asks a homeowner for name, email, phone,
 * zip and photos of their bathroom. None of that qualifies a trade buyer. This
 * asks the questions that decide whether a territory gets appointed: firm,
 * business type, city and state, product interest, and monthly offtake.
 *
 * It sits on the second dark ground, so the tonal rhythm from the reference
 * still alternates: dark services -> light trust -> DARK dealers -> light
 * contact -> dark footer.
 */
export default function DealerEnquiry() {
  const [status, submit] = useSubmit()
  const [interests, setInterests] = useState([])

  const toggle = (name) =>
    setInterests((cur) => (cur.includes(name) ? cur.filter((c) => c !== name) : [...cur, name]))

  return (
    <section id="dealers" className="relative overflow-hidden bg-deep py-24 sm:py-32 lg:py-40">
      <div className="grid-bg-dark absolute inset-0 opacity-50" />
      <div
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full blur-3xl"
        style={{ background: 'rgba(133,196,235,0.14)' }}
      />
      <div className="noise-field" />

      <div className="shell relative grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
        {/* Left — the pitch */}
        <div className="lg:col-span-5">
          <SectionHead
            eyebrow={dealers.eyebrow}
            heading={dealers.heading}
            accent={dealers.headingAccent}
            body={dealers.body}
            dark
          />

          <ul className="mt-10 space-y-4 border-t border-white/10 pt-8">
            {dealers.points.map((p) => (
              <Reveal as="li" key={p} className="flex gap-3 text-sm text-white/70">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {p}
              </Reveal>
            ))}
          </ul>

          <Reveal delay={150} className="mt-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Or call the unit</p>
            <a
              href={`tel:${brand.phoneTel}`}
              className="mt-2 inline-block font-display text-2xl font-bold tracking-tight text-white hover:text-primary"
            >
              {brand.phoneDisplay}
            </a>
            <p className="mt-1 font-mono text-[11px] text-white/40">{brand.hours}</p>
          </Reveal>
        </div>

        {/* Right — the form */}
        <div className="lg:col-span-7">
          <Reveal className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-9">
            {status === 'sent' ? (
              <div className="flex min-h-[26rem] flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-12 w-12 text-primary" strokeWidth={1.8} aria-hidden="true" />
                <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-white">
                  {dealers.sentTitle}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">{dealers.sentBody}</p>
              </div>
            ) : (
              <form onSubmit={(e) => submit(e, { form: 'dealer-enquiry', interests: interests.join(', ') })}>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field dark label="Firm name" name="firm" required placeholder="Registered business name" />
                  <Field dark label="Contact person" name="person" required placeholder="Full name" />
                  <Field dark label="Phone" name="phone" type="tel" required placeholder="+91" />
                  <Field dark label="Email" name="email" type="email" required placeholder="name@firm.com" />
                  <Field dark label="City" name="city" required placeholder="City" />
                  <Field dark label="State" name="state" required placeholder="State" />
                  <Field
                    dark
                    label="Business type"
                    name="businessType"
                    as="select"
                    required
                    options={dealers.businessTypes}
                  />
                  <Field
                    dark
                    label="Expected monthly offtake"
                    name="volume"
                    as="select"
                    options={dealers.volumes}
                  />
                </div>

                {/* Product interest chips */}
                <fieldset className="mt-7">
                  <legend className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                    Product interest
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {products.items.map((p) => {
                      const on = interests.includes(p.name)
                      return (
                        <button
                          key={p.name}
                          type="button"
                          onClick={() => toggle(p.name)}
                          aria-pressed={on}
                          className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                            on
                              ? 'border-primary bg-primary/20 text-white'
                              : 'border-white/15 text-white/55 hover:border-white/35'
                          }`}
                        >
                          {p.name}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                <div className="mt-7">
                  <Field
                    dark
                    label="Anything else"
                    name="message"
                    as="textarea"
                    rows={4}
                    placeholder="Existing brands handled, godown capacity, territory already covered — whatever is relevant."
                  />
                </div>

                {status === 'error' && (
                  <p className="mt-6 flex items-start gap-2 rounded-xl border border-accent/40 bg-accent/10 p-3.5 text-xs leading-relaxed text-white/80">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>
                      This form could not be sent. Call {brand.phoneDisplay} or email{' '}
                      <a href={`mailto:${brand.email}`} className="underline">
                        {brand.email}
                      </a>{' '}
                      and the enquiry will be handled the same way.
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
                      {dealers.sending}
                    </>
                  ) : (
                    <>
                      {dealers.submit}
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
