import Link from 'next/link'
import ProjectCard, { type ProjectCardData } from '@/components/ProjectCard'

const HOME_COUNT = 9

export default function ProjectsGrid({ projects }: { projects: ProjectCardData[] }) {
  return (
    <section id="projects">
      <div className="wrap">
        <div className="section-head">
          <div className="idx"><b>02</b> / <span>projects</span></div>
          <h2>builds.dense_grid <span>{'// the wow is in the density'}</span></h2>
        </div>

        <div className="proj-grid">
          {projects.slice(0, HOME_COUNT).map((p) => <ProjectCard key={p.id} p={p} />)}
        </div>

        {projects.length > HOME_COUNT && (
          <div style={{ marginTop: 20 }}>
            <Link href="/projects" className="btn">
              all {projects.length} projects <span className="k">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
