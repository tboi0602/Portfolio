import fs from "fs";
import path from "path";
import type { Project, SkillGroup, TimelineEvent, AboutData, CV, Certificate, ContactItem } from "./data";

const DATA_DIR = path.join(process.cwd(), "src/data");
const isVercel = !!process.env.VERCEL;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER || "tboi0602";
const GITHUB_REPO = process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG || "Portfolio";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";

const KV_URL = process.env.KV_URL || process.env.REDIS_URL || "";
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.REDIS_TOKEN || "";

const USE_GITHUB = !!GITHUB_TOKEN;
const USE_KV = !!KV_URL && !!KV_TOKEN;

function getStore(): string {
  if (!isVercel) return "local";
  if (USE_GITHUB) return "github";
  if (USE_KV) return "kv";
  return "none";
}

async function writeJson<T>(file: string, data: T): Promise<string> {
  const store = getStore();
  const json = JSON.stringify(data, null, 2);

  switch (store) {
    case "local":
      fs.writeFileSync(path.join(DATA_DIR, file), json, "utf-8");
      return "local";
    case "github":
      await writeViaGitHub(file, json);
      return "github";
    case "kv":
      await writeViaKV(file, json);
      return "kv";
    default:
      throw new Error(
        "Chưa cấu hình storage. Trên local đã hoạt động. Trên Vercel cần:\n" +
        "- Cách 1: Thêm GITHUB_TOKEN vào Vercel Environment Variables (scope: Production)\n" +
        "- Cách 2: Tạo KV Store trong Vercel Dashboard → Storage"
      );
  }
}

async function writeViaGitHub(file: string, json: string): Promise<void> {
  const content = Buffer.from(json).toString("base64");
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
  } else if (getRes.status !== 404) {
    const err = await getRes.json();
    throw new Error(`GitHub: không thể đọc file (${getRes.status}): ${err.message}`);
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
    throw new Error(`GitHub: lỗi khi ghi file (${putRes.status}): ${err.message}`);
  }
}

async function writeViaKV(file: string, json: string): Promise<void> {
  const { Redis } = await import("@upstash/redis");
  try {
    const redis = new Redis({ url: KV_URL, token: KV_TOKEN });
    await redis.set(`portfolio:${file}`, json);
  } catch (err) {
    throw new Error(`KV: ${err instanceof Error ? err.message : "lỗi không xác định"}`);
  }
}

export async function saveProjects(projects: Project[]): Promise<string> {
  return writeJson("projects.json", projects);
}

export async function saveSkills(skills: SkillGroup[]): Promise<string> {
  return writeJson("skills.json", skills);
}

export async function saveTimeline(events: TimelineEvent[]): Promise<string> {
  return writeJson("timeline.json", events);
}

export async function saveAbout(data: AboutData): Promise<string> {
  return writeJson("about.json", data);
}

export async function saveCV(cv: CV): Promise<string> {
  return writeJson("cv.json", cv);
}

export async function saveCertificates(certificates: Certificate[]): Promise<string> {
  return writeJson("certificates.json", certificates);
}

export async function saveContact(contact: ContactItem[]): Promise<string> {
  return writeJson("contact.json", contact);
}
