import { NextResponse } from "next/server";
import { getAbout } from "@/lib/data";
import { saveAbout } from "@/lib/admin-db";
import { checkAuth } from "@/lib/auth";

export async function GET() {
  return NextResponse.json(getAbout());
}

export async function PUT(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  saveAbout(body);
  return NextResponse.json({ success: true });
}
