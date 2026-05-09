import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import projects from '@/app/data/projects.json'

function badgeClass(badge: string) {
  if (badge === 'live') return 'badge live'
  if (badge === 'research') return 'badge research'
  return 'badge disc'
}

export default function ProjectsPage() {
  const deepDiveProjects = projects.filter(p => p.deepdive)
  const otherProjects = projects.filter(p => !p.deepdive)

  return (
    <>
      <Nav />
      <div style={{ paddingTop: 56 }}>
        <section style={{ borderTop: 0 }}>
          <div className="wrap">
            <div className="section-head" style={{ borderTop: 0 }}>
              <div className="idx"><b>ALL</b> / <span>projects</span></div>
              <h2>builds.complete <span>// everything shipped, researched, or explored</span></h2>
            </div>
          </div>
        </section>

        {/* deep dives */}
        <section>
          <div className="wrap">
            <div className="section-head">
              <div className="idx"><b>01</b> / <span>deep dives</span></div>
              <h2>projects.featured <span>// click for full case study</span></h2>
            </div>
            <div className="proj-grid" style={{ marginBottom: 0 }}>
              {deepDiveProjects.map((p) => (
                <Link key={p.id} href={`/projects/${p.slug}`} className="card">
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

        {/* other projects */}
        <section>
          <div className="wrap">
            <div className="section-head">
              <div className="idx"><b>02</b> / <span>other builds</span></div>
              <h2>projects.archive <span>// experiments, hackathons, early work</span></h2>
            </div>
            <div className="proj-grid" style={{ marginBottom: 56 }}>
              {otherProjects.map((p) => (
                p.link ? (
                  <a key={p.id} href={p.link} target="_blank" rel="noopener noreferrer" className="card">
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
                    <div className="arr">↗</div>
                  </a>
                ) : (
                  <div key={p.id} className="card">
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
                  </div>
                )
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
