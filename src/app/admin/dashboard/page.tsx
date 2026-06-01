"use client";

import { FolderGit2, Wrench, FileText, Award } from "lucide-react";

const cards = [
  { href: "/admin/dashboard/projects", label: "Projects", icon: FolderGit2, count: "Manage" },
  { href: "/admin/dashboard/skills", label: "Skills", icon: Wrench, count: "Manage" },
  { href: "/admin/dashboard/cv", label: "CV", icon: FileText, count: "Upload" },
  { href: "/admin/dashboard/certificates", label: "Certificates", icon: Award, count: "Manage" },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">Manage your portfolio content</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <a
              key={card.href}
              href={card.href}
              className="group block rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300"
            >
              <Icon size={20} className="text-zinc-500 mb-4 group-hover:text-cyan-400 transition-colors" />
              <div className="text-sm font-medium text-white mb-1">{card.label}</div>
              <div className="text-xs text-zinc-600">{card.count}</div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
