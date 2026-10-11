import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import projects from '@/app/data/projects.json'
import ProjectCard from '@/components/ProjectCard'

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
              {deepDiveProjects.map((p) => <ProjectCard key={p.id} p={p} />)}
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
              {otherProjects.map((p) => <ProjectCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
