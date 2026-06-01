import { NextResponse } from "next/server";
import { getTimeline } from "@/lib/data";
import { saveTimeline } from "@/lib/admin-db";
import { checkAuth } from "@/lib/auth";

export async function GET() {
  return NextResponse.json(getTimeline());
}

export async function PUT(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  saveTimeline(body);
  return NextResponse.json({ success: true });
}
