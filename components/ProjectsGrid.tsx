import Link from 'next/link'

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
  deepdive: unknown | null
}

function badgeClass(badge: string) {
  if (badge === 'live') return 'badge live'
  if (badge === 'research') return 'badge research'
  return 'badge disc'
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <section id="projects">
      <div className="wrap">
        <div className="section-head">
          <div className="idx"><b>02</b> / <span>projects</span></div>
          <h2>builds.dense_grid <span>// the wow is in the density</span></h2>
        </div>

        <div className="proj-grid">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={p.deepdive ? `/projects/${p.slug}` : (p.link ?? '#')}
              target={!p.deepdive && p.link ? '_blank' : undefined}
              rel={!p.deepdive && p.link ? 'noopener noreferrer' : undefined}
              className="card"
            >
              <div className="top">
                <div className="name">{p.name}</div>
                <span className={badgeClass(p.badge)}>{p.badge}</span>
              </div>
              <div className="desc">{p.description}</div>
              <div className="stack">
                {p.stack.slice(0, 4).map(s => <span key={s}>{s}</span>)}
              </div>
              <div className="meta">
                <span className="m">// {p.year}</span>
                <span>{p.meta}</span>
              </div>
              <div className="arr">→</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
