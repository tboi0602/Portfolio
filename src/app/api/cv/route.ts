import { NextResponse } from "next/server";
import { getCVAsync } from "@/lib/data";
import { saveCV } from "@/lib/admin-db";
import { checkAuth } from "@/lib/auth";

export async function GET() {
  return NextResponse.json(await getCVAsync());
}

export async function POST(request: Request) {
  try {
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
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Lỗi không xác định" },
      { status: 500 }
    );
  }
}
