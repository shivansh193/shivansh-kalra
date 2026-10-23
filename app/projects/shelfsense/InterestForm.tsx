'use client'

import { useState, type FormEvent } from 'react'
import s from './shelfsense.module.css'

// Submissions go to Web3Forms, which emails them to the address the access key was created with.
// Without a key the form says so and offers email instead, so nothing is silently dropped.
const ENDPOINT = 'https://api.web3forms.com/submit'
const EMAIL = 'shivanshkalra796@gmail.com'

type Status = 'idle' | 'sending' | 'ok' | 'error'

export default function InterestForm({ accessKey }: { accessKey: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [emailError, setEmailError] = useState('')
  const configured = accessKey.length > 0

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const email = String(data.get('email') ?? '').trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Enter a valid email address.')
      ;(form.elements.namedItem('email') as HTMLInputElement | null)?.focus()
      return
    }
    setEmailError('')
    if (data.get('botcheck')) return // honeypot filled: quietly ignore

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: 'ShelfSense: new interest',
          from_name: 'ShelfSense page',
          name: String(data.get('name') ?? ''),
          email,
          who: String(data.get('who') ?? ''),
          want: String(data.get('want') ?? ''),
          message: String(data.get('message') ?? ''),
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok && json.success !== false) {
        setStatus('ok')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <div className={s.formDone} role="status">
        <p className={s.h3}>Thanks, that reached me.</p>
        <p>I read every one and reply from {EMAIL}.</p>
      </div>
    )
  }

  return (
    <form className={s.form} onSubmit={onSubmit} noValidate>
      {!configured && (
        <p className={s.formNote} role="note">
          The form isn&apos;t connected yet. Email me at <a href={`mailto:${EMAIL}?subject=ShelfSense`}>{EMAIL}</a> instead.
        </p>
      )}

      <div className={s.fieldRow}>
        <div className={s.field}>
          <label htmlFor="ss-name">Name</label>
          <input id="ss-name" name="name" type="text" autoComplete="name" />
        </div>
        <div className={s.field}>
          <label htmlFor="ss-email">Email <span className={s.req}>(required)</span></label>
          <input
            id="ss-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={emailError ? 'true' : undefined}
            aria-describedby={emailError ? 'ss-email-err' : undefined}
          />
          {emailError && <p id="ss-email-err" className={s.err}>{emailError}</p>}
        </div>
      </div>

      <div className={s.fieldRow}>
        <div className={s.field}>
          <label htmlFor="ss-who">Who you are</label>
          <select id="ss-who" name="who" defaultValue="">
            <option value="">Choose one</option>
            <option>Shop owner</option>
            <option>Developer</option>
            <option>Investor</option>
            <option>Hackathon judge</option>
            <option>Other</option>
          </select>
        </div>
        <div className={s.field}>
          <label htmlFor="ss-want">What you want</label>
          <select id="ss-want" name="want" defaultValue="">
            <option value="">Choose one</option>
            <option>Try it in a shop</option>
            <option>Collaborate</option>
            <option>Invest</option>
            <option>Just following</option>
          </select>
        </div>
      </div>

      <div className={s.field}>
        <label htmlFor="ss-message">Message</label>
        <textarea id="ss-message" name="message" rows={4} />
      </div>

      {/* honeypot: hidden from people, tempting to bots */}
      <div className={s.hp} aria-hidden="true">
        <label htmlFor="ss-botcheck">Leave this empty</label>
        <input id="ss-botcheck" name="botcheck" type="checkbox" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={s.formFoot}>
        <button type="submit" className={`${s.btn} ${s.btnPrimary}`} disabled={!configured || status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>
        {status === 'error' && (
          <p className={s.err} role="alert">
            That didn&apos;t go through. Try again, or email <a href={`mailto:${EMAIL}?subject=ShelfSense`}>{EMAIL}</a>.
          </p>
        )}
      </div>
    </form>
  )
}
