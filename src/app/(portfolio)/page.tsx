import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Timeline } from "@/components/timeline"
import { Contact } from "@/components/contact"
import { getFeaturedProjects, getSkills, getTimeline, getAbout, getContact } from "@/lib/data"

export default function Home() {
  const featuredProjects = getFeaturedProjects()
  const skills = getSkills()
  const timeline = getTimeline()
  const about = getAbout()
  const contact = getContact()

  return (
    <>
      <Hero />
      <About about={about} />
      <Projects projects={featuredProjects} />
      <Skills skills={skills} />
      <Timeline timeline={timeline} />
      <Contact contact={contact} />
    </>
  )
}
