import fs from "fs";
import path from "path";
import type { Project, SkillGroup, TimelineEvent, AboutData, CV, Certificate, ContactItem } from "./data";

const DATA_DIR = path.join(process.cwd(), "src/data");

function writeJson<T>(file: string, data: T): void {
  const fullPath = path.join(DATA_DIR, file);
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), "utf-8");
}

export function saveProjects(projects: Project[]): void {
  writeJson("projects.json", projects);
}

export function saveSkills(skills: SkillGroup[]): void {
  writeJson("skills.json", skills);
}

export function saveTimeline(events: TimelineEvent[]): void {
  writeJson("timeline.json", events);
}

export function saveAbout(data: AboutData): void {
  writeJson("about.json", data);
}

export function saveCV(cv: CV): void {
  writeJson("cv.json", cv);
}

export function saveCertificates(certificates: Certificate[]): void {
  writeJson("certificates.json", certificates);
}

export function saveContact(contact: ContactItem[]): void {
  writeJson("contact.json", contact);
}
