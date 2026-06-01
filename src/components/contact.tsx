"use client"

import { Mail, FolderGit2, Users, FileText, ArrowUpRight } from "lucide-react"
import { Reveal } from "./reveal"

const contacts = [
  { label: "Email", value: "hyhtantai62@gmail.com", href: "mailto:hyhtantai62@gmail.com", icon: Mail },
  { label: "GitHub", value: "github.com/tboi0602", href: "https://github.com/tboi0602", icon: FolderGit2 },
  { label: "LinkedIn", value: "Connect on LinkedIn", href: "#", icon: Users },
  { label: "Portfolio CV", value: "Download CV", href: "/HuynhTanTai_CV.docx", icon: FileText },
]

export function Contact() {
  return (
    <section id="contact" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-400 font-mono mb-4">
            Contact
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Let&apos;s work together
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-zinc-500 text-sm mb-14 max-w-md">
            Have a project in mind or just want to chat? Reach out.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contacts.map((item, i) => (
            <Reveal key={item.label} delay={0.15 + i * 0.08}>
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group block rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300"
              >
                <item.icon
                  size={20}
                  className="text-zinc-500 mb-4 group-hover:text-cyan-400 transition-colors"
                />
                <div className="text-xs font-mono text-zinc-500 mb-1.5 uppercase tracking-wider">
                  {item.label}
                </div>
                <div className="text-sm text-zinc-300 group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                  {item.value}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
