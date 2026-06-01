"use client";

import { Reveal } from "./reveal";
import { TiltCard } from "./tilt-card";
import { getIcon } from "@/lib/icon-map";
import type { SkillGroup } from "@/lib/data";

interface SkillsProps {
  skills: SkillGroup[]
}

export function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-400 font-mono mb-4">
            Skills
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-14">
            Tech stack
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((group, i) => {
            const GroupIcon = getIcon(group.icon);
            return (
              <Reveal key={group.title} delay={i * 0.1}>
                <TiltCard>
                <div
                  className={`relative rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 hover:bg-white/[0.04] transition-all duration-300 group overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${group.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative">
                    {GroupIcon && (
                      <GroupIcon
                        size={18}
                        className="text-zinc-500 mb-4 group-hover:text-cyan-400 transition-colors"
                      />
                    )}
                    <h3 className="text-xs font-mono text-zinc-400 mb-4 uppercase tracking-wider">
                      {group.title}
                    </h3>
                    <ul className="space-y-2.5">
                      {group.skills.map((skill) => (
                        <li
                          key={skill}
                          className="text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
