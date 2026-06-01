"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit3, Trash2, ExternalLink, FolderGit2 } from "lucide-react";
import type { Project } from "@/lib/data";

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(slug: string) {
    if (!confirm("Delete this project?")) return;

    const res = await fetch(`/api/projects/${slug}`, { method: "DELETE" });
    if (res.ok) {
      setProjects(projects.filter((p) => p.slug !== slug));
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Projects</h1>
          <p className="text-sm text-zinc-500 mt-1">{projects.length} projects</p>
        </div>
        <Link
          href="/admin/dashboard/projects/new"
          className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-white text-[#0a0a0f] text-sm font-medium hover:bg-zinc-200 transition-all"
        >
          <Plus size={15} />
          New Project
        </Link>
      </div>

      <div className="space-y-2">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.06] px-5 py-4 hover:bg-white/[0.04] transition-colors"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                <FolderGit2 size={15} className="text-zinc-500" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white truncate">
                    {project.title}
                  </span>
                  {project.status && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 ${
                        project.status === "Production"
                          ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                          : "text-amber-400 bg-amber-500/10 border border-amber-500/20"
                      }`}
                    >
                      {project.status}
                    </span>
                  )}
                </div>
                <span className="text-xs text-zinc-600">{project.tag}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:text-cyan-400 hover:bg-white/[0.04] transition-all"
                >
                  <ExternalLink size={14} />
                </a>
              )}
              <Link
                href={`/admin/dashboard/projects/${project.slug}/edit`}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:text-blue-400 hover:bg-white/[0.04] transition-all"
              >
                <Edit3 size={14} />
              </Link>
              <button
                onClick={() => handleDelete(project.slug)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:text-red-400 hover:bg-white/[0.04] transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
