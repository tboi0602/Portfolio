import {
  Monitor, Server, Database, Wrench,
  BookOpen, FolderGit2, Layers,
  Mail, FileText, Trophy, Briefcase, Rocket,
  type LucideIcon,
} from "lucide-react"

const map: Record<string, LucideIcon> = {
  Monitor,
  Server,
  Database,
  Wrench,
  BookOpen,
  FolderGit2,
  Layers,
  Mail,
  FileText,
  Trophy,
  Briefcase,
  Rocket,
}

export function Icon({ name, size, className }: { name: string; size?: number; className?: string }) {
  const IconComponent = map[name]
  if (!IconComponent) return null
  return <IconComponent size={size ?? 16} className={className} />
}

export function getIcon(name: string): LucideIcon | undefined {
  return map[name]
}
