"use client";

import { Calendar } from "lucide-react";
import { Reveal } from "./reveal";

const events = [
  {
    year: "2023",
    title: "Started Software Engineering",
    subtitle: "Ton Duc Thang University",
  },
  { year: "2024", title: "Built NinjaShop", subtitle: "E-Commerce Platform" },
  { year: "2025", title: "PetPaw", subtitle: "E-Commerce Platform for pets" },
  { year: "2025", title: "Top 12 Startup Competition", subtitle: "Vũ Trụ Gốm" },
  {
    year: "2026",
    title: "Built Roll Call System",
    subtitle: "First real project",
  },
  {
    year: "2026",
    title: "Built VNSales with Business",
    subtitle: "Production Deployment",
  },
];

export function Timeline() {
  return (
    <section id="timeline" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-400 font-mono mb-4">
            Experience
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-14">
            Timeline
          </h2>
        </Reveal>

        <div className="relative max-w-2xl">
          <div className="absolute left-[23px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/40 via-blue-500/20 to-transparent" />

          <div className="space-y-10">
            {events.map((event, i) => (
              <Reveal
                key={`${event.year}-${i}`}
                delay={i * 0.1}
                direction="left"
              >
                <div className="relative flex gap-6">
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-2xl bg-[#111118] border border-white/[0.06] flex items-center justify-center group-hover:border-cyan-500/20 transition-colors">
                    <Calendar size={16} className="text-cyan-400" />
                  </div>

                  <div className="pt-1.5">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-cyan-400 mb-3">
                      {event.year}
                    </div>
                    <div className="text-base font-medium text-white mb-1">
                      {event.title}
                    </div>
                    <div className="text-sm text-zinc-500">
                      {event.subtitle}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
