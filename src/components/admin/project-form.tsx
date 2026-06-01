"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import type { Project } from "@/lib/data";

interface ProjectFormProps {
  initial?: Project;
}

export function ProjectForm({ initial }: ProjectFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: initial?.title || "",
    tag: initial?.tag || "",
    description: initial?.description || "",
    longDescription: initial?.longDescription || "",
    status: initial?.status || "Development",
    problem: initial?.problem || "",
    solution: initial?.solution || "",
    techStack: initial?.techStack.join(", ") || "",
    challenges: initial?.challenges.join("\n") || "",
    lessons: initial?.lessons.join("\n") || "",
    liveUrl: initial?.links.live || "",
    githubUrl: initial?.links.github || "",
    featured: initial?.featured ?? true,
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const body = {
      title: form.title,
      tag: form.tag,
      description: form.description,
      longDescription: form.longDescription,
      status: form.status,
      problem: form.problem,
      solution: form.solution,
      techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
      challenges: form.challenges.split("\n").filter(Boolean),
      lessons: form.lessons.split("\n").filter(Boolean),
      links: {
        live: form.liveUrl,
        github: form.githubUrl,
      },
      featured: form.featured,
    };

    const url = initial
      ? `/api/projects/${initial.slug}`
      : "/api/projects";

    const res = await fetch(url, {
      method: initial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/projects");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      setSaving(false);
    }
  }

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Title" required>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="My Project"
            required
            className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/30 transition-all"
          />
        </Field>

        <Field label="Tag">
          <input
            type="text"
            value={form.tag}
            onChange={(e) => update("tag", e.target.value)}
            placeholder="Web App"
            className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/30 transition-all"
          />
        </Field>
      </div>

      <Field label="Short Description">
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Brief project description..."
          rows={2}
          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/30 transition-all resize-none"
        />
      </Field>

      <Field label="Long Description">
        <textarea
          value={form.longDescription}
          onChange={(e) => update("longDescription", e.target.value)}
          placeholder="Detailed project description..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/30 transition-all resize-none"
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Status">
          <select
            value={form.status}
            onChange={(e) => update("status", e.target.value as "Production" | "Development")}
            className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-cyan-500/30 transition-all"
          >
            <option value="Development">Development</option>
            <option value="Production">Production</option>
          </select>
        </Field>

        <Field label="Tech Stack (comma separated)">
          <input
            type="text"
            value={form.techStack}
            onChange={(e) => update("techStack", e.target.value)}
            placeholder="Next.js, TypeScript, Tailwind"
            className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/30 transition-all"
          />
        </Field>
      </div>

      <Field label="Problem">
        <textarea
          value={form.problem}
          onChange={(e) => update("problem", e.target.value)}
          placeholder="What problem did this solve?"
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/30 transition-all resize-none"
        />
      </Field>

      <Field label="Solution">
        <textarea
          value={form.solution}
          onChange={(e) => update("solution", e.target.value)}
          placeholder="How did you solve it?"
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/30 transition-all resize-none"
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Live URL">
          <input
            type="url"
            value={form.liveUrl}
            onChange={(e) => update("liveUrl", e.target.value)}
            placeholder="https://..."
            className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/30 transition-all"
          />
        </Field>

        <Field label="GitHub URL">
          <input
            type="url"
            value={form.githubUrl}
            onChange={(e) => update("githubUrl", e.target.value)}
            placeholder="https://github.com/..."
            className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/30 transition-all"
          />
        </Field>
      </div>

      <Field label="Challenges (one per line)">
        <textarea
          value={form.challenges}
          onChange={(e) => update("challenges", e.target.value)}
          placeholder="Challenge 1&#10;Challenge 2&#10;Challenge 3"
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/30 transition-all resize-none font-mono"
        />
      </Field>

      <Field label="Lessons Learned (one per line)">
        <textarea
          value={form.lessons}
          onChange={(e) => update("lessons", e.target.value)}
          placeholder="Lesson 1&#10;Lesson 2&#10;Lesson 3"
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/30 transition-all resize-none font-mono"
        />
      </Field>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => update("featured", e.target.checked)}
          className="w-4 h-4 rounded border-white/[0.08] bg-white/[0.03] text-cyan-500 focus:ring-cyan-500/30"
        />
        <span className="text-sm text-zinc-400">Featured on homepage</span>
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="h-11 px-8 rounded-xl bg-white text-[#0a0a0f] text-sm font-medium hover:bg-zinc-200 transition-all disabled:opacity-50"
        >
          {saving ? "Saving..." : initial ? "Save Changes" : "Create Project"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="h-11 px-8 rounded-xl border border-white/10 text-sm text-zinc-500 hover:text-zinc-300 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
