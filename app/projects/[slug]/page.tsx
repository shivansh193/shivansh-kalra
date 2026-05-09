import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import projects from '@/app/data/projects.json'

interface Component {
  name: string
  tech: string
  description: string
}

interface DeepDive {
  tagline: string
  overview: string
  why: string
  components: Component[]
  metrics: string[]
}

interface Project {
  id: string
  slug: string
  name: string
  badge: string
  description: string
  stack: string[]
  year: string
  meta: string
  link: string | null
  github: string | null
  deepdive: DeepDive | null
}

export function generateStaticParams() {
  return projects
    .filter((p) => p.deepdive !== null)
    .map((p) => ({ slug: p.slug }))
}

function badgeClass(badge: string) {
  if (badge === 'live') return 'badge live'
  if (badge === 'research') return 'badge research'
  return 'badge disc'
}

export default async function ProjectDeepDive({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = (projects as Project[]).find((p) => p.slug === slug)

  if (!project || !project.deepdive) {
    notFound()
  }

  const { deepdive } = project
  const idx = projects.findIndex((p) => p.slug === slug)
  const next = projects.filter(p => p.deepdive)[
    projects.filter(p => p.deepdive).findIndex(p => p.slug === slug) + 1
  ]

  return (
    <>
      <Nav />
      <div style={{ paddingTop: 56 }}>
        {/* header */}
        <div className="dive-hero scan">
          <div className="wrap">
            <div className="dive-crumb">
              <Link href="/">home</Link>
              <span className="sep">/</span>
              <Link href="/projects">projects</Link>
              <span className="sep">/</span>
              <span>{project.slug}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
              <div className="dive-title">{project.name}</div>
              <span className={badgeClass(project.badge)} style={{ marginTop: 12 }}>{project.badge}</span>
            </div>

            <div className="dive-tagline">{deepdive.tagline}</div>

            <div className="dive-meta">
              <div className="dm">
                <span className="k">YEAR</span>
                <span className="v">{project.year}</span>
              </div>
              <div className="dm">
                <span className="k">STATUS</span>
                <span className="v">{project.meta}</span>
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn" style={{ marginLeft: 'auto' }}>
                  visit live <span className="k">↗</span>
                </a>
              )}
              {project.github && !project.link && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn" style={{ marginLeft: 'auto' }}>
                  github <span className="k">↗</span>
                </a>
              )}
            </div>

            <div className="dive-stack-row">
              {project.stack.map(s => <span key={s}>{s}</span>)}
            </div>
          </div>
        </div>

        {/* body */}
        <div className="dive-body">
          <div className="wrap">

            {/* overview */}
            <div className="dive-section">
              <div className="dive-section-head"><b>01</b> / overview</div>
              <p className="dive-overview">{deepdive.overview}</p>
            </div>

            {/* why */}
            <div className="dive-section">
              <div className="dive-section-head"><b>02</b> / motivation</div>
              <blockquote className="dive-why">{deepdive.why}</blockquote>
            </div>

            {/* components */}
            <div className="dive-section">
              <div className="dive-section-head"><b>03</b> / architecture</div>
              <div className="components-grid">
                {deepdive.components.map((c) => (
                  <div key={c.name} className="component-card">
                    <div className="cc-name">{c.name}</div>
                    <div className="cc-tech">{c.tech.toUpperCase()}</div>
                    <div className="cc-desc">{c.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* metrics */}
            <div className="dive-section">
              <div className="dive-section-head"><b>04</b> / outcomes</div>
              <div className="metrics-list">
                {deepdive.metrics.map((m) => (
                  <div key={m} className="metric-item">
                    <span className="mi-arrow">▸</span>
                    <span className="mi-text">{m}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* nav */}
        <div className="wrap">
          <div className="dive-nav">
            <Link href="/projects">← all projects</Link>
            {next && (
              <Link href={`/projects/${next.slug}`}>
                next: {next.name} →
              </Link>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
