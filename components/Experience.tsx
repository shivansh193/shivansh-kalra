'use client'

import { useState } from 'react'

interface GanttData {
  left: number
  width: number
  ghost: boolean
}

interface ExperienceItem {
  id: string
  company: string
  role: string
  period: string
  shortPeriod: string
  duration: string
  location: string
  type: string
  bullets: string[]
  stack: string[]
  gantt: GanttData
}

export default function Experience({ experiences }: { experiences: ExperienceItem[] }) {
  const [activeId, setActiveId] = useState<string>(experiences[0]?.id ?? '')

  function toggle(id: string) {
    setActiveId(prev => (prev === id ? '' : id))
  }

  return (
    <section id="work">
      <div className="wrap">
        <div className="section-head">
          <div className="idx"><b>01</b> / <span>experience</span></div>
          <h2>experience.timeline <span>// 2021 → present · overlapping concurrent roles</span></h2>
        </div>

        <div className="exp-wrap">
          {/* desktop gantt */}
          <div className="gantt">
            <div className="gantt-head">
              <div>ROLE / COMPANY</div>
              <div className="gantt-axis">
                <div className="yrs">
                  {['2021', '2022', '2023', '2024', '2025', '2026'].map((yr, i) => (
                    <span key={yr} className="yr" style={{ left: `${(i * 100) / 6}%` }}>{yr}</span>
                  ))}
                </div>
              </div>
              <div>YRS</div>
            </div>

            {experiences.map((exp) => (
              <div key={exp.id}>
                <div
                  className={`g-row${activeId === exp.id ? ' active' : ''}`}
                  onClick={() => toggle(exp.id)}
                >
                  <div className="g-label">
                    <span className="co">{exp.company}</span>
                    <span className="role">{exp.role.toUpperCase()}</span>
                  </div>
                  <div className="g-track">
                    <div className="grid-lines">
                      {[0, 1, 2, 3, 4, 5, 6].map(i => (i * 100) / 6).map(p => (
                        <i key={p} style={{ left: `${p}%` }} />
                      ))}
                    </div>
                    <div
                      className={`bar${exp.gantt.ghost ? ' ghost' : ''}`}
                      style={{ left: `${exp.gantt.left}%`, width: `${exp.gantt.width}%` }}
                    />
                  </div>
                  <div className="g-stretch">{exp.duration}</div>
                </div>

                {activeId === exp.id && (
                  <div className="g-detail" style={{ display: 'grid' }}>
                    <ul>
                      {exp.bullets.map((b, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
                      ))}
                    </ul>
                    <div className="g-meta">
                      <span><b>WHEN</b> {exp.period}</span>
                      <span><b>WHERE</b> {exp.location}</span>
                      <span><b>TYPE</b> {exp.type === 'current' ? 'current role' : 'prior role'}</span>
                      <div className="g-stack">
                        {exp.stack.map(s => <span key={s}>{s}</span>)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* mobile list */}
          <div className="gantt-mobile">
            {experiences.map((exp) => (
              <div key={exp.id} className="m-row">
                <div className="m-co">
                  <b>{exp.company}</b>
                  <span className="when">{exp.shortPeriod}</span>
                </div>
                <div className="m-role">{exp.role.toUpperCase()}</div>
                <div
                  className="m-bar"
                  style={{ background: exp.gantt.ghost ? '#2a2a2a' : exp.type === 'current' ? 'var(--accent)' : 'var(--text)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
