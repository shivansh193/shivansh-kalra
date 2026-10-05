'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = typedRef.current
    if (!el) return
    const roles = [
      'Founding Engineer',
      'Systems Architect',
      'Researcher',
      'Active since 2021',
      '20yo. CS @ SNU.',
    ]
    let r = 0, i = 0, deleting = false
    let timer: ReturnType<typeof setTimeout>

    function tick() {
      const cur = roles[r]
      if (!deleting) {
        i++
        if (i > cur.length) { deleting = true; timer = setTimeout(tick, 1300); return }
      } else {
        i--
        if (i <= 0) { deleting = false; r = (r + 1) % roles.length }
      }
      if (el) el.textContent = cur.slice(0, i)
      timer = setTimeout(tick, deleting ? 28 : 55 + Math.random() * 40)
    }

    tick()
    return () => clearTimeout(timer)
  }, [])

  return (
    <header className="hero scan">
      <div className="left">
        <div>
          <div className="crumbs">
            <span><b>LAT</b> 28.524°N</span>
            <span><b>LON</b> 77.575°E</span>
            <span><b>TZ</b> IST · UTC+5:30</span>
            <span><b>STATUS</b> <span style={{ color: 'var(--green)' }}>BUILDING</span></span>
          </div>

          <h1 className="name">
            Shivansh<br />
            <span className="last">Kalra<span className="punct">.</span></span>
          </h1>

          <div className="role-line">
            <span className="arrow">▸</span>
            <span>./identify --role </span>
            <span className="typed" ref={typedRef} />
            <span className="blink" />
          </div>

          <p className="bio">
            20-year-old CS student at <em>Shiv Nadar University</em>. Founding engineer at multiple
            early-stage startups, builder of production systems serving tens of thousands of concurrent
            users, and author of research papers in <em>quantitative finance</em>, <em>computer vision</em>,
            and <em>systems</em>. Building things since 16.
          </p>

          <div className="hero-cta">
            <a href="#work" className="btn primary" onClick={(e) => {
              const t = document.querySelector('#work')
              if (t) { e.preventDefault(); window.scrollTo({ top: (t as HTMLElement).offsetTop - 40, behavior: 'smooth' }) }
            }}>
              View work <span className="k">↵</span>
            </a>
            <a href="mailto:shivanshkalra796@gmail.com" className="btn">
              shivanshkalra796@gmail.com <span className="k">⌘</span>
            </a>
            <a href="/Shivansh_Kalra_SWEResume_May25.pdf" target="_blank" rel="noopener noreferrer" className="btn">
              cv.pdf <span className="k">↗</span>
            </a>
          </div>
        </div>

        <div className="hero-foot">
          <div className="col"><b>BUILDING SINCE</b>2021 · 5y compounded</div>
          <div className="col"><b>CURRENT</b>Invariant · SNU B.Tech &apos;27</div>
          <div className="col"><b>PRIOR</b>Attack Capital (YC) · Pactle · Thinkly</div>
        </div>
      </div>

      <aside className="right">
        <div className="panel">
          <div className="head">
            <span>SK · OPERATIONS / Q4 2026</span>
            <div className="dots"><i /><i /><i /></div>
            <span className="live">LIVE</span>
          </div>

          <div className="stats">
            <div className="stat acc">
              <span className="label">YEARS BUILDING</span>
              <span className="value">5<span className="unit">yrs</span></span>
              <span className="delta">since 2021 · compounding</span>
            </div>
            <div className="stat">
              <span className="label">BUSINESSES SERVED</span>
              <span className="value">250<span className="unit">+</span></span>
              <span className="delta">▲ across all ventures</span>
            </div>
            <div className="stat">
              <span className="label">STARTUPS FOUNDED</span>
              <span className="value">3</span>
              <span className="delta flat">CatalystIQ · Petner · SNUXplore</span>
            </div>
            <div className="stat">
              <span className="label">PEAK CONCURRENT USERS</span>
              <span className="value">30K<span className="unit">+</span></span>
              <span className="delta">prod · sustained</span>
            </div>
          </div>

          <div className="ticker">
            <span><b>RUST</b> <span className="up">+exp</span></span>
            <span><b>NODE</b> <span className="up">prod</span></span>
            <span><b>QUANT</b> <span className="acc">paper</span></span>
            <span><b>REDIS</b> <span className="up">ship</span></span>
            <span><b>PYTHON</b> <span className="acc">+new</span></span>
            <span><b>SOLIDITY</b> <span className="up">2023</span></span>
            <span><b>NEXT.JS</b> <span className="acc">prod</span></span>
            <span><b>PG</b> <span className="up">prod</span></span>
          </div>

          <div className="mini-chart">
            <div className="lbl">
              <span>SHIPPING VELOCITY · 12W</span>
              <span style={{ color: 'var(--green)' }}>▲ 22.4%</span>
            </div>
            <svg viewBox="0 0 240 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity=".4" />
                  <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 50 L20 46 L40 48 L60 38 L80 40 L100 30 L120 32 L140 22 L160 26 L180 16 L200 18 L220 8 L240 12 L240 60 L0 60 Z" fill="url(#lg)" />
              <path d="M0 50 L20 46 L40 48 L60 38 L80 40 L100 30 L120 32 L140 22 L160 26 L180 16 L200 18 L220 8 L240 12" fill="none" stroke="#00E5FF" strokeWidth="1.2" />
              <g stroke="var(--line)" strokeWidth="1">
                <line x1="0" y1="15" x2="240" y2="15" />
                <line x1="0" y1="30" x2="240" y2="30" />
                <line x1="0" y1="45" x2="240" y2="45" />
              </g>
              <circle cx="220" cy="8" r="2.5" fill="#00E5FF" />
            </svg>
          </div>

          <div className="quick">
            <div><b>4</b>papers</div>
            <div><b>15+</b>projects</div>
            <div><b>6+</b>stacks</div>
            <div><b>∞</b>caffeine</div>
          </div>
        </div>

        <div className="panel" style={{ fontFamily: 'var(--mono)', fontSize: '11.5px' }}>
          <div className="head"><span>SYS · NOW</span><span className="live">RUNNING</span></div>
          <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 7, color: 'var(--text-dim)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>▸ building invariant v4</span>
              <span style={{ color: 'var(--accent)' }}>live</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>▸ prediction-mkts paper · 2nd place</span>
              <span style={{ color: 'var(--amber)' }}>finverse&apos;26</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>▸ quantedge — daily use</span>
              <span style={{ color: 'var(--green)' }}>active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>▸ snu, computer science</span>
              <span style={{ color: 'var(--text-mute)' }}>b.tech &apos;27</span>
            </div>
          </div>
        </div>
      </aside>
    </header>
  )
}
