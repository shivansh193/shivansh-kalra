import Link from 'next/link'

export interface ProjectCardData {
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
  deepdive: unknown | null
}

function badgeClass(badge: string) {
  if (badge === 'live') return 'badge live'
  if (badge === 'research') return 'badge research'
  return 'badge disc'
}

// The whole card is clickable through an overlay link, so the live/code
// links in the footer can be real anchors without nesting <a> inside <a>.
export default function ProjectCard({ p }: { p: ProjectCardData }) {
  const external = !p.deepdive
  const href = p.deepdive ? `/projects/${p.slug}` : (p.link ?? p.github)

  return (
    <div className="card">
      {href && (
        external
          ? <a className="card-hit" href={href} target="_blank" rel="noopener noreferrer" aria-label={p.name} />
          : <Link className="card-hit" href={href} aria-label={p.name} />
      )}
      <div className="top">
        <div className="name">{p.name}</div>
        <span className={badgeClass(p.badge)}>{p.badge}</span>
      </div>
      <div className="desc">{p.description}</div>
      <div className="stack">
        {p.stack.slice(0, 4).map(s => <span key={s}>{s}</span>)}
      </div>
      {(p.link || p.github) && (
        <div className="card-links">
          {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer">live ↗</a>}
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer">code ↗</a>}
        </div>
      )}
      <div className="meta">
        <span className="m">{'// '}{p.year}</span>
        <span>{p.meta}</span>
      </div>
      {href && <div className="arr">{external ? '↗' : '→'}</div>}
    </div>
  )
}
