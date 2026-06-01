import {
  CodeXml,
  Database,
  Server,
  FileCode,
  Paintbrush,
  Terminal,
  Globe,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  "Next.js": Globe,
  React: CodeXml,
  TypeScript: FileCode,
  JavaScript: FileCode,
  "Node.js": Server,
  Express: Server,
  Python: Terminal,
  PostgreSQL: Database,
  MongoDB: Database,
  "SQL Server": Database,
  MySQL: Database,
  SQLite: Database,
  Tailwind: Paintbrush,
  Mongoose: Database,
  Zustand: CodeXml,
  JWT: FileCode,
}

const fallback: LucideIcon = CodeXml

interface TechIconProps {
  name: string
  size?: number
  className?: string
}

export function TechIcon({ name, size = 14, className }: TechIconProps) {
  const Icon = iconMap[name] ?? fallback
  return <Icon size={size} className={className} />
}
