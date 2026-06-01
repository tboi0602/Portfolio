import { NextResponse } from "next/server";
import { getCV } from "@/lib/data";
import { saveCV } from "@/lib/admin-db";
import { checkAuth } from "@/lib/auth";

export async function GET() {
  return NextResponse.json(getCV());
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  await saveCV({
    fileName: body.fileName,
    displayName: body.displayName || "Portfolio CV",
    updatedAt: new Date().toISOString(),
  });
  return NextResponse.json({ success: true });
}
