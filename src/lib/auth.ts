import { cookies } from "next/headers";
import crypto from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const SALT = "portfolio-admin-salt-2026";

function hashToken(token: string): string {
  return crypto.createHmac("sha256", SALT).update(token).digest("hex");
}

export function createSessionToken(password: string): string | null {
  if (password !== ADMIN_PASSWORD) return null;
  const raw = password + ":" + Date.now();
  return hashToken(raw);
}

export function verifyToken(token: string): boolean {
  const stored = getStoredToken();
  return stored === token;
}

function getStoredToken(): string {
  return hashToken(ADMIN_PASSWORD + ":session");
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return false;
  return token === getStoredToken();
}
