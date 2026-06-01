import { NextResponse } from "next/server";
import { getCertificatesAsync } from "@/lib/data";
import { saveCertificates } from "@/lib/admin-db";
import { checkAuth } from "@/lib/auth";
import crypto from "crypto";

export async function GET() {
  return NextResponse.json(await getCertificatesAsync());
}

export async function POST(request: Request) {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const certs = await getCertificatesAsync();
    const newCert = {
      id: crypto.randomUUID(),
      name: body.name,
      fileUrl: body.fileUrl,
      uploadedAt: new Date().toISOString(),
    };

    await saveCertificates([...certs, newCert]);
    return NextResponse.json(newCert, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Lỗi không xác định" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await checkAuth())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    const certs = await getCertificatesAsync();
    await saveCertificates(certs.filter((c) => c.id !== id));
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Lỗi không xác định" },
      { status: 500 }
    );
  }
}
