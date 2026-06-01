"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  Wrench,
  FileText,
  Award,
  ArrowLeft,
} from "lucide-react";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dashboard/projects", label: "Projects", icon: FolderGit2 },
  { href: "/admin/dashboard/skills", label: "Skills", icon: Wrench },
  { href: "/admin/dashboard/cv", label: "CV", icon: FileText },
  { href: "/admin/dashboard/certificates", label: "Certificates", icon: Award },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-56 bg-[#0d0d14] border-r border-white/[0.06] z-50 flex flex-col">
      <div className="p-5 border-b border-white/[0.06]">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
            T
          </div>
          <span className="text-sm font-semibold text-white">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
              }`}
            >
              <Icon size={16} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/[0.06]">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Portfolio
        </Link>
      </div>
    </aside>
  );
}
