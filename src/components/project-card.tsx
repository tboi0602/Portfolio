"use client"

import { motion } from "framer-motion"
import { ExternalLink, FolderGit2, BookOpen, ArrowUpRight } from "lucide-react"
import { TechIcon } from "./tech-icon"
import { TiltCard } from "./tilt-card"
import type { Project } from "@/lib/projects"

interface ProjectCardProps {
  project: Project
  index: number
}

const projectColors = [
  "from-cyan-500/20 to-blue-500/10",
  "from-emerald-500/20 to-cyan-500/10",
  "from-violet-500/20 to-blue-500/10",
  "from-amber-500/20 to-rose-500/10",
  "from-blue-500/20 to-indigo-500/10",
  "from-teal-500/20 to-emerald-500/10",
]

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <TiltCard className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden hover:border-white/[0.12] transition-all duration-500">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${projectColors[index % projectColors.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="relative p-6 sm:p-7">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-cyan-500/20 transition-colors">
              <FolderGit2 size={16} className="text-zinc-400 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              <span className="text-[11px] font-mono text-zinc-500">
                {project.tag}
              </span>
            </div>
          </div>
          {project.status && (
            <span
              className={`text-[10px] font-mono px-2.5 py-1 rounded-full border shrink-0 ${
                project.status === "Production"
                  ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"
                  : "text-amber-400 border-amber-500/20 bg-amber-500/10"
              }`}
            >
              {project.status}
            </span>
          )}
        </div>

        <p className="text-sm text-zinc-400 mb-5 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-white/[0.04] text-zinc-500 font-mono"
            >
              <TechIcon name={tech} size={10} />
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/[0.04]">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-cyan-400 transition-colors"
            >
              <ExternalLink size={12} />
              Live Demo
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors"
            >
              <FolderGit2 size={12} />
              Source
            </a>
          )}
          <a
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-cyan-400 transition-colors ml-auto"
          >
            <BookOpen size={12} />
            Case Study
            <ArrowUpRight size={10} />
          </a>
        </div>
      </div>
      </TiltCard>
    </motion.div>
  )
}
