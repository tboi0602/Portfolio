import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, FolderGit2, AlertCircle, Brain } from "lucide-react"
import { TechIcon } from "@/components/tech-icon"
import { getProjectBySlug, projects } from "@/lib/projects"

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <ProjectContent slugPromise={params} />
      </div>
    </div>
  )
}

async function ProjectContent({
  slugPromise,
}: {
  slugPromise: Promise<{ slug: string }>
}) {
  const { slug } = await slugPromise
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-cyan-400 transition-colors mb-10 font-mono group"
      >
        <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to Projects
      </Link>

      <div className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full">
            {project.tag}
          </span>
          {project.status && (
            <span
              className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${
                project.status === "Production"
                  ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"
                  : "text-amber-400 border-amber-500/20 bg-amber-500/10"
              }`}
            >
              {project.status}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
          {project.title}
        </h1>

        <p className="text-base text-zinc-400 leading-relaxed">
          {project.longDescription}
        </p>
      </div>

      <div className="space-y-14">
        <Section title="Problem">
          <p className="text-zinc-300 leading-relaxed">{project.problem}</p>
        </Section>

        <Section title="Solution">
          <p className="text-zinc-300 leading-relaxed">{project.solution}</p>
        </Section>

        <Section title="Tech Stack">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-zinc-300 font-mono hover:bg-white/[0.06] transition-colors"
              >
                <TechIcon name={tech} size={14} />
                {tech}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Challenges">
          <ul className="space-y-3">
            {project.challenges.map((c) => (
              <li key={c} className="flex items-start gap-3 text-zinc-400">
                <AlertCircle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="What I Learned">
          <ul className="space-y-3">
            {project.lessons.map((l) => (
              <li key={l} className="flex items-start gap-3 text-zinc-400">
                <Brain size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <div className="mt-16 flex flex-wrap gap-3 pt-10 border-t border-white/[0.06]">
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-white text-[#0a0a0f] text-sm font-medium hover:bg-zinc-200 transition-all"
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
        )}
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 h-11 px-6 rounded-xl border border-white/10 text-sm text-zinc-300 hover:text-white hover:border-white/20 transition-all"
          >
            <FolderGit2 size={14} />
            View Source
          </a>
        )}
      </div>
    </>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h2 className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-cyan-400 mb-5">
        {title}
      </h2>
      {children}
    </div>
  )
}
