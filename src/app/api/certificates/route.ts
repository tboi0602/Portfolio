import { NextResponse } from "next/server";
import { getCertificates } from "@/lib/data";
import { saveCertificates } from "@/lib/admin-db";
import { checkAuth } from "@/lib/auth";
import crypto from "crypto";

export async function GET() {
  return NextResponse.json(getCertificates());
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const certs = getCertificates();
  const newCert = {
    id: crypto.randomUUID(),
    name: body.name,
    fileUrl: body.fileUrl,
    uploadedAt: new Date().toISOString(),
  };

  await saveCertificates([...certs, newCert]);
  return NextResponse.json(newCert, { status: 201 });
}

export async function DELETE(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();
  const certs = getCertificates();
  await saveCertificates(certs.filter((c) => c.id !== id));
  return NextResponse.json({ success: true });
}
