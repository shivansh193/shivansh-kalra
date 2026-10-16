import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { writeups } from '@/lib/writeups'

export const metadata: Metadata = {
  title: 'Write-ups | Shivansh Kalra',
  description: 'Long-form notes on things I built and measured, including the results that failed.',
}

export default function WriteupsPage() {
  return (
    <>
      <Nav />
      <div style={{ paddingTop: 56 }}>
        <div className="dive-hero scan">
          <div className="wrap">
            <div className="dive-crumb">
              <Link href="/">home</Link>
              <span className="sep">/</span>
              <span>writeups</span>
            </div>
            <div className="dive-title">write-ups</div>
            <div className="dive-tagline">
              long-form notes on things i built and measured, including the parts that didn&apos;t work.
            </div>
          </div>
        </div>
        <div className="wrap">
          <div className="wu-list">
            {writeups.map(w => (
              <Link key={w.slug} href={`/writeups/${w.slug}`} className="wu-item">
                <div className="wu-item-meta">
                  <span>{w.date}</span>
                  {w.tags.map(t => <span key={t}>{t}</span>)}
                </div>
                <div className="wu-item-title">{w.title}</div>
                <div className="wu-item-sum">{w.summary}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
