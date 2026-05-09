'use client'

import { useState } from 'react'

interface Phase {
  name: string
  year: string
  description: string
}

interface Venture {
  id: string
  name: string
  role: string
  description: string
  timestamp: string
  displayDate: string
  status: string
  phases: Phase[] | null
}

function statusClass(s: string) {
  if (s === 'active') return 'vstatus active'
  if (s === 'alive') return 'vstatus alive'
  return 'vstatus'
}

function arrClass(s: string) {
  return s === 'active' || s === 'alive' ? 'arr' : 'arr dim'
}

export default function Ventures({ ventures }: { ventures: Venture[] }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section id="ventures">
      <div className="wrap">
        <div className="section-head">
          <div className="idx"><b>04</b> / <span>ventures</span></div>
          <h2>company.phases <span>// founding history, command-line</span></h2>
        </div>

        <div className="log-wrap">
          <div className="term">
            <div className="bar">
              <div className="lh"><i /><span>~/skalra/ventures.log</span></div>
              <span>tail -f · 5y</span>
            </div>
            <div className="tbody">
              {ventures.map((v) => (
                <div key={v.id}>
                  <div
                    className="v-line"
                    style={{ cursor: v.phases ? 'pointer' : 'default' }}
                    onClick={() => v.phases && setExpanded(expanded === v.id ? null : v.id)}
                  >
                    <span className="ts">{v.displayDate}</span>
                    <span className={arrClass(v.status)}>▶</span>
                    <span className="co">
                      {v.name}
                      <em>{v.description}</em>
                    </span>
                    <span className={statusClass(v.status)}>
                      {v.status === 'active' ? 'active' : v.status === 'alive' ? 'live' : v.status}
                      {v.phases ? (expanded === v.id ? ' ▲' : ' ▼') : ''}
                    </span>
                  </div>

                  {v.phases && expanded === v.id && (
                    <div className="phases-wrap open">
                      {v.phases.map((ph) => (
                        <div key={ph.name} className="phase-item">
                          <div className="ph-name">{ph.name} <span style={{ color: 'var(--text-mute)' }}>· {ph.year}</span></div>
                          <div className="ph-desc">{ph.description}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="prompt">
              <b>skalra@now ~ $</b>
              <span>building --next</span>
              <span className="blink" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
