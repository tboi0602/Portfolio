"use client";

import { useEffect, useState } from "react";
import type { SkillGroup } from "@/lib/data";

const emptyGroup = (): SkillGroup => ({
  title: "",
  skills: [],
  gradient: "from-cyan-500/10 to-blue-500/5",
  icon: "Monitor",
});

export default function AdminSkills() {
  const [groups, setGroups] = useState<SkillGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then(setGroups)
      .finally(() => setLoading(false));
  }, []);

  function updateGroup(index: number, key: keyof SkillGroup, value: string | string[]) {
    setGroups((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  }

  function updateSkills(index: number, raw: string) {
    updateGroup(index, "skills", raw.split(",").map((s) => s.trim()).filter(Boolean));
  }

  function addGroup() {
    setGroups([...groups, emptyGroup()]);
  }

  function removeGroup(index: number) {
    setGroups(groups.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/skills", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(groups),
    });

    if (res.ok) {
      setMessage("Saved successfully");
    } else {
      setMessage("Error saving");
    }
    setSaving(false);
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Skills</h1>
          <p className="text-sm text-zinc-500 mt-1">Manage your skill groups</p>
        </div>
        <button
          onClick={addGroup}
          className="h-10 px-5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-zinc-300 hover:text-white transition-all"
        >
          + Add Group
        </button>
      </div>

      <div className="space-y-4 max-w-3xl">
        {groups.map((group, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5"
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[11px] font-mono text-zinc-600 mb-1.5 uppercase">Title</label>
                <input
                  type="text"
                  value={group.title}
                  onChange={(e) => updateGroup(i, "title", e.target.value)}
                  placeholder="Frontend"
                  className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-zinc-600 mb-1.5 uppercase">Gradient</label>
                <input
                  type="text"
                  value={group.gradient}
                  onChange={(e) => updateGroup(i, "gradient", e.target.value)}
                  placeholder="from-cyan-500/10 to-blue-500/5"
                  className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-white font-mono placeholder-zinc-600 focus:outline-none focus:border-cyan-500/30 transition-all"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-[11px] font-mono text-zinc-600 mb-1.5 uppercase">
                Skills (comma separated)
              </label>
              <input
                type="text"
                value={group.skills.join(", ")}
                onChange={(e) => updateSkills(i, e.target.value)}
                placeholder="React, Next.js, TypeScript"
                className="w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/30 transition-all"
              />
            </div>
            <button
              onClick={() => removeGroup(i)}
              className="text-xs text-zinc-600 hover:text-red-400 transition-colors"
            >
              Remove group
            </button>
          </div>
        ))}
      </div>

      {message && (
        <p className="mt-4 text-sm text-emerald-400">{message}</p>
      )}

      {groups.length > 0 && (
        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-6 h-11 px-8 rounded-xl bg-white text-[#0a0a0f] text-sm font-medium hover:bg-zinc-200 transition-all disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Skills"}
        </button>
      )}
    </div>
  );
}
