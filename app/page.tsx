import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Experience from '@/components/Experience'
import ProjectsGrid from '@/components/ProjectsGrid'
import Research from '@/components/Research'
import Ventures from '@/components/Ventures'
import Footer from '@/components/Footer'
import experiences from '@/app/data/experiences.json'
import projects from '@/app/data/projects.json'
import papers from '@/app/data/papers.json'
import ventures from '@/app/data/ventures.json'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Experience experiences={experiences} />
      <ProjectsGrid projects={projects} />
      <Research papers={papers} />
      <Ventures ventures={ventures} />
      <Footer />
    </>
  )
}
