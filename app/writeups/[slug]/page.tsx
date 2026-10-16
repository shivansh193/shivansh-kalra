import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Markdown } from '@/lib/markdown'
import { getWriteup, writeupBody, writeups } from '@/lib/writeups'

export function generateStaticParams() {
  return writeups.map(w => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const w = getWriteup((await params).slug)
  return w ? { title: `${w.title} | Shivansh Kalra`, description: w.summary } : {}
}

export default async function WriteupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const w = getWriteup(slug)
  if (!w) notFound()

  const idx = writeups.findIndex(x => x.slug === slug)
  const next = writeups[idx + 1]

  return (
    <>
      <Nav />
      <div style={{ paddingTop: 56 }}>
        <div className="dive-hero scan">
          <div className="wrap">
            <div className="dive-crumb">
              <Link href="/">home</Link>
              <span className="sep">/</span>
              <Link href="/writeups">writeups</Link>
              <span className="sep">/</span>
              <span>{w.slug}</span>
            </div>
            <h1 className="wu-title">{w.title}</h1>
            <div className="dive-meta">
              <div className="dm"><span className="k">DATE</span><span className="v">{w.date}</span></div>
              <div className="dm"><span className="k">TAGS</span><span className="v">{w.tags.join(' · ')}</span></div>
            </div>
          </div>
        </div>
        <div className="wrap">
          <article className="wu-body">
            <Markdown source={writeupBody(slug)} />
          </article>
          <div className="dive-nav">
            <Link href="/writeups">← all write-ups</Link>
            {next && <Link href={`/writeups/${next.slug}`}>next: {next.title} →</Link>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
