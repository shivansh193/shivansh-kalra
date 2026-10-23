import type { Metadata } from 'next'
import Link from 'next/link'
import { Geist, Geist_Mono } from 'next/font/google'
import Nav from '@/components/Nav'
import VideoEmbed from './VideoEmbed'
import InterestForm from './InterestForm'
import s from './shelfsense.module.css'

const geist = Geist({ subsets: ['latin'], variable: '--ss-sans', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--ss-mono', display: 'swap' })

export const metadata: Metadata = {
  title: 'ShelfSense | Shivansh Kalra',
  description:
    "A shop's Ring camera keeps the bill: it sees what leaves each shelf, names it from the shop's own photos, tracks stock, and leaves anything unsure for a person to check at the exit.",
  openGraph: {
    title: 'ShelfSense',
    description: "A shop's Ring camera keeps the bill, and leaves anything unsure for a person to check at the exit.",
    images: ['https://i.ytimg.com/vi/wqKQZixrNSY/hqdefault.jpg'],
  },
}

const VIDEO_ID = 'wqKQZixrNSY'
const VJEV = 'https://github.com/shivansh193/vjev'
const GIST = 'https://gist.github.com/shivansh193/9794a196360fc3a0e424b368ffabd28a'

const features = [
  {
    title: 'Takes go on the bill',
    body: "A hand goes into a shelf zone empty and comes out holding something: that's a take. The product is named by matching the hand crop against the shop's own photos. Grabbing the same item again counts once.",
  },
  {
    title: 'Put-backs are caught',
    body: 'A hand that goes in holding something and comes out empty flags the matching line.',
  },
  {
    title: "Never guesses with someone's money",
    body: 'Uncertain lines are marked "verify at exit". The system only adds or flags lines; only a person removes one, and every decision is logged.',
  },
  {
    title: 'Exit check',
    body: 'Staff see each flagged line’s evidence (the hand just before and after the shelf visit, the scores, and what else it could have been) and keep or remove it, with a note.',
  },
  {
    title: "The shopper's phone",
    body: 'An unguessable link per session, shown as a QR code on the console. Shoppers watch their bill live and can tap "Not mine".',
  },
  {
    title: 'Layout, stock and shelf watch',
    body: 'A floor plan of shelves, fridges and freezers with products, stock and minimums. Each shelf is tied to a camera zone, so stock follows the bill. Between visits, the camera reads how full each shelf is and raises restock alerts.',
  },
]

const funnel = [
  { t: '13–15 ms', when: 'Every frame', body: 'YOLO11n-pose + ByteTrack find people and wrists.' },
  {
    t: '~200 ms',
    when: 'A hand visits a shelf zone',
    body: 'One batched Qwen2.5-VL-3B yes/no question, "is this hand holding a product?", asked of the hand just before it entered and just after it left. vjev turns the answers into calibrated probabilities.',
  },
  {
    t: '49 ms',
    when: 'On a take',
    body: "SigLIP embeddings are matched against the shop's catalogue photos, using only the products on that shelf.",
  },
  {
    t: 'Guardrails',
    when: 'Always',
    body: 'Confidence below 0.5 means "verify at exit". Repeat takes within 6 s are merged.',
  },
]

const stats = [
  { n: '98.4%', label: 'Naming, within a shelf of 5 products', note: 'GroceryStoreDataset, 81 products, 500 queries. 70% on CCTV-quality crops.' },
  { n: '0.88', label: 'Shelf watch AUROC', note: '484 real shelf crops.' },
  { n: '82.2%', label: 'Shelf watch, held-out shelves', note: 'Correct on shelves it never saw.' },
  { n: '92%', label: 'Empty gaps caught', note: 'Held-out shelves.' },
]

export default function ShelfSensePage() {
  return (
    <>
      <Nav />
      <div className={`${s.ss} ${geist.variable} ${geistMono.variable}`}>
        <main>
          {/* hero */}
          <section className={`${s.wrap} ${s.hero}`} aria-labelledby="ss-title">
            <nav className={s.crumb} aria-label="Breadcrumb">
              <Link href="/">home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/projects">projects</Link>
              <span aria-hidden="true">/</span>
              <span>shelfsense</span>
            </nav>
            <p className={s.kicker}>Built for the Amazon Developer Hackathon (Ring track) · October 2026 · solo</p>
            <h1 id="ss-title" className={s.title}>ShelfSense</h1>
            <p className={s.lede}>
              A shop&apos;s Ring camera keeps the bill: it sees what leaves each shelf, names it from the shop&apos;s own
              photos, tracks stock, and leaves anything unsure for a person to check at the exit.
            </p>
            <div className={s.ctas}>
              <a href="#interest" className={`${s.btn} ${s.btnPrimary}`}>I&apos;m interested</a>
              <a href={VJEV} className={s.btn} target="_blank" rel="noopener noreferrer">vjev on GitHub</a>
            </div>
            <VideoEmbed id={VIDEO_ID} title="ShelfSense demo video (2:55)" />
            <p className={s.caption}>Demo, 2:55.</p>
          </section>

          {/* what it does */}
          <section className={s.section} aria-labelledby="ss-what">
            <div className={s.wrap}>
              <h2 id="ss-what" className={s.h2}><span className={s.num}>01</span> What it does</h2>
              <div className={s.cards}>
                {features.map(f => (
                  <article key={f.title} className={s.card}>
                    <h3 className={s.h3}>{f.title}</h3>
                    <p>{f.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* how it works */}
          <section className={s.section} aria-labelledby="ss-how">
            <div className={s.wrap}>
              <h2 id="ss-how" className={s.h2}><span className={s.num}>02</span> How it works</h2>
              <p className={s.sub}>A funnel: the cheap model on every frame, the big one only when it matters.</p>

              <ol className={s.flow} aria-label="System overview">
                <li className={s.node}><span className={s.nodeK}>source</span>Camera</li>
                <li className={s.node}><span className={s.nodeK}>ingest</span>WHEP / WebRTC</li>
                <li className={`${s.node} ${s.nodeAccent}`}><span className={s.nodeK}>analyse</span>Funnel</li>
                <li className={s.node}><span className={s.nodeK}>records</span>Bill · Stock · Evidence</li>
                <li className={s.node}><span className={s.nodeK}>surfaces</span>Console · Exit check · Shopper&apos;s phone · Layout</li>
              </ol>

              <ol className={s.funnel}>
                {funnel.map((f, i) => (
                  <li key={f.when} className={s.step}>
                    <div className={s.stepHead}>
                      <span className={s.stepN}>{i + 1}</span>
                      <span className={s.stepWhen}>{f.when}</span>
                      <span className={s.stepT}>{f.t}</span>
                    </div>
                    <p>{f.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* results */}
          <section className={s.section} aria-labelledby="ss-results">
            <div className={s.wrap}>
              <h2 id="ss-results" className={s.h2}><span className={s.num}>03</span> Results</h2>
              <p className={s.sub}>Measured, including the part that isn&apos;t there yet.</p>
              <div className={s.stats}>
                {stats.map(t => (
                  <div key={t.label} className={s.stat}>
                    <div className={s.statN}>{t.n}</div>
                    <div className={s.statL}>{t.label}</div>
                    <p className={s.statNote}>{t.note}</p>
                  </div>
                ))}
                <div className={`${s.stat} ${s.statWarn}`}>
                  <div className={s.warnTag}>Not there yet</div>
                  <div className={s.statN}>2 of 8</div>
                  <div className={s.statL}>Takes found on handheld stock clips</div>
                  <p className={s.statNote}>1 false take. Next step: footage from a fixed camera in a real shop.</p>
                </div>
                <div className={s.stat}>
                  <div className={s.statN}>3 / 3</div>
                  <div className={s.statL}>Live Ring sessions</div>
                  <p className={s.statNote}>WHEP on the Ring Developer Portal Playground: all connected, full 30 s each, analysed live.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ring + aws */}
          <section className={s.section} aria-labelledby="ss-ring">
            <div className={s.wrap}>
              <h2 id="ss-ring" className={s.h2}><span className={s.num}>04</span> Built with Ring + AWS</h2>
              <div className={s.two}>
                <div>
                  <h3 className={s.h3}>Ring Partner API</h3>
                  <p className={s.small}>All real Ring APIs, tested on the Ring Developer Portal Playground.</p>
                  <ul className={s.list}>
                    <li><code>GET /v1/devices</code></li>
                    <li>Live view over WHEP, pulled server-side with aiortc: set up in 0.6–0.9 s, 1280×720 at 29 fps, about 10 fps analysed live</li>
                    <li>Handling for Ring&apos;s 30 s / 60 s live-view cap</li>
                    <li>HMAC-SHA256-signed webhooks: <code>motion_detected</code> opens the live view</li>
                    <li>One-way account linking</li>
                  </ul>
                </div>
                <div>
                  <h3 className={s.h3}>Infrastructure and stack</h3>
                  <ul className={s.list}>
                    <li>Amazon EC2 g4dn.xlarge (NVIDIA T4), Caddy for HTTPS</li>
                    <li>Kaggle GPUs for evals</li>
                    <li>Python, FastAPI, aiortc (WebRTC/WHEP), PyTorch, Hugging Face Transformers, Ultralytics, OpenCV</li>
                    <li>Vanilla HTML/CSS/JS frontend</li>
                  </ul>
                </div>
              </div>
              <div className={s.linkRow}>
                <div className={s.linkItem}>
                  <span className={s.nodeK}>code</span>
                  <span>Private for now. Code available to hackathon judges.</span>
                </div>
                <a className={s.linkItem} href={GIST} target="_blank" rel="noopener noreferrer">
                  <span className={s.nodeK}>friction log</span>
                  <span>Notes from building on Ring <span aria-hidden="true">↗</span></span>
                </a>
                <a className={s.linkItem} href={VJEV} target="_blank" rel="noopener noreferrer">
                  <span className={s.nodeK}>open source</span>
                  <span>vjev (Apache-2.0) <span aria-hidden="true">↗</span></span>
                </a>
              </div>
            </div>
          </section>

          {/* vjev */}
          <section className={s.section} aria-labelledby="ss-vjev">
            <div className={s.wrap}>
              <h2 id="ss-vjev" className={s.h2}><span className={s.num}>05</span> vjev</h2>
              <p className={s.body}>
                The open-source piece. vjev gives typed, calibrated VLM decisions: a choice, a score, a yes/no, or boxes
                that can abstain. Boxes reach <strong>86.3% Acc@0.5</strong> on RefCOCO, and it abstains on{' '}
                <strong>93.8%</strong> of absent targets.
              </p>
              <a href={VJEV} className={s.btn} target="_blank" rel="noopener noreferrer">vjev on GitHub</a>
            </div>
          </section>

          {/* interest form */}
          <section id="interest" className={s.section} aria-labelledby="ss-interest">
            <div className={s.wrap}>
              <h2 id="ss-interest" className={s.h2}><span className={s.num}>06</span> Want ShelfSense in your shop, or want to build it with me?</h2>
              {/* Web3Forms access keys are meant to be public (they only route submissions to the owner's inbox) */}
              <InterestForm accessKey={process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '652f9dab-eb85-400a-999e-91a44f6082cf'} />
            </div>
          </section>
        </main>

        <footer className={s.footer}>
          <div className={s.wrap}>
            <p>
              Built by Shivansh Kalra ·{' '}
              <a href="https://github.com/shivansh193" target="_blank" rel="noopener noreferrer">GitHub</a> ·{' '}
              <Link href="/">Portfolio</Link>
            </p>
            <p className={s.credits}>
              Shelf footage by Aamir Somewhere (Pexels). Ring Playground clip &ldquo;Thief stealing our package&rdquo; by
              frollard, CC BY 4.0. Built for the Amazon Developer Hackathon (Ring track); uses the Ring Partner API. Not
              affiliated with or endorsed by Ring or Amazon.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
