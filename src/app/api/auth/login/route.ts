import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = await request.json();
  const token = createSessionToken(password);

  if (!token) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24,
  });

  return NextResponse.json({ success: true });
}
