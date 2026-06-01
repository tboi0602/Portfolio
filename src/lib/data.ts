import fs from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

const DATA_DIR = path.join(process.cwd(), "src/data");
const KV_URL = process.env.KV_URL || process.env.REDIS_URL || "";
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.REDIS_TOKEN || "";
const useKV = !!KV_URL && !!KV_TOKEN;

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

async function readJsonAsync<T>(file: string): Promise<T> {
  if (useKV) {
    try {
      const redis = new Redis({ url: KV_URL, token: KV_TOKEN });
      const cached = await redis.get<string>(`portfolio:${file}`);
      if (cached) return JSON.parse(cached) as T;
    } catch {}
  }
  return readJson<T>(file);
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

export async function getProjectsAsync(): Promise<Project[]> {
  return readJsonAsync<Project[]>("projects.json");
}

export async function getSkillsAsync(): Promise<SkillGroup[]> {
  return readJsonAsync<SkillGroup[]>("skills.json");
}

export async function getTimelineAsync(): Promise<TimelineEvent[]> {
  return readJsonAsync<TimelineEvent[]>("timeline.json");
}

export async function getAboutAsync(): Promise<AboutData> {
  return readJsonAsync<AboutData>("about.json");
}

export async function getCVAsync(): Promise<CV> {
  return readJsonAsync<CV>("cv.json");
}

export async function getCertificatesAsync(): Promise<Certificate[]> {
  return readJsonAsync<Certificate[]>("certificates.json");
}

export async function getContactAsync(): Promise<ContactItem[]> {
  return readJsonAsync<ContactItem[]>("contact.json");
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
