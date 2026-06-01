import { NextResponse } from "next/server";
import { getSkills } from "@/lib/data";
import { saveSkills } from "@/lib/admin-db";
import { checkAuth } from "@/lib/auth";

export async function GET() {
  return NextResponse.json(getSkills());
}

export async function PUT(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  await saveSkills(body);
  return NextResponse.json({ success: true });
}
