import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src/data");

export interface Project {
  slug: string;
  title: string;
  tag: string;
  description: string;
  longDescription: string;
  status?: "Production" | "Development";
  problem: string;
  solution: string;
  techStack: string[];
  challenges: string[];
  lessons: string[];
  links: { live?: string; github?: string };
  featured: boolean;
}

export interface SkillGroup {
  title: string;
  skills: string[];
  gradient: string;
  icon: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
}

export interface AboutData {
  description: string;
  secondaryDescription: string;
  stats: { label: string; value: string; icon: string }[];
}

export interface CV {
  fileName: string;
  displayName: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  name: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface ContactItem {
  label: string;
  value: string;
  href: string;
  icon: string;
}

function readJson<T>(file: string): T {
  const fullPath = path.join(DATA_DIR, file);
  const raw = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(raw) as T;
}

export function getProjects(): Project[] {
  return readJson<Project[]>("projects.json");
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

export function getSkills(): SkillGroup[] {
  return readJson<SkillGroup[]>("skills.json");
}

export function getTimeline(): TimelineEvent[] {
  return readJson<TimelineEvent[]>("timeline.json");
}

export function getAbout(): AboutData {
  return readJson<AboutData>("about.json");
}

export function getCV(): CV {
  return readJson<CV>("cv.json");
}

export function getCertificates(): Certificate[] {
  return readJson<Certificate[]>("certificates.json");
}

export function getContact(): ContactItem[] {
  return readJson<ContactItem[]>("contact.json");
}
