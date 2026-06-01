import fs from "fs";
import path from "path";
import type { Project, SkillGroup, TimelineEvent, AboutData, CV, Certificate, ContactItem } from "./data";

const DATA_DIR = path.join(process.cwd(), "src/data");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER || "";
const GITHUB_REPO = process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG || "";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";

function isProduction(): boolean {
  return process.env.NODE_ENV === "production" && !!GITHUB_TOKEN;
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  if (isProduction()) {
    await writeViaGitHub(file, data);
  } else {
    const fullPath = path.join(DATA_DIR, file);
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), "utf-8");
  }
}

async function writeViaGitHub<T>(file: string, data: T): Promise<void> {
  const content = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");
  const repoPath = `src/data/${file}`;
  const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${repoPath}`;

  let sha: string | undefined;
  const getRes = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "portfolio-admin",
    },
  });

  if (getRes.ok) {
    const existing = await getRes.json();
    sha = existing.sha;
  }

  const putRes = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "portfolio-admin",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Update ${file} via admin`,
      content,
      branch: GITHUB_BRANCH,
      sha,
    }),
  });

  if (!putRes.ok) {
    const err = await putRes.json();
    throw new Error(`GitHub API error: ${err.message || putRes.statusText}`);
  }
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await writeJson("projects.json", projects);
}

export async function saveSkills(skills: SkillGroup[]): Promise<void> {
  await writeJson("skills.json", skills);
}

export async function saveTimeline(events: TimelineEvent[]): Promise<void> {
  await writeJson("timeline.json", events);
}

export async function saveAbout(data: AboutData): Promise<void> {
  await writeJson("about.json", data);
}

export async function saveCV(cv: CV): Promise<void> {
  await writeJson("cv.json", cv);
}

export async function saveCertificates(certificates: Certificate[]): Promise<void> {
  await writeJson("certificates.json", certificates);
}

export async function saveContact(contact: ContactItem[]): Promise<void> {
  await writeJson("contact.json", contact);
}
