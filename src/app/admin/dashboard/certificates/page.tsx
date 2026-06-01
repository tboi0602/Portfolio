"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import { Upload, Award, Trash2, ExternalLink } from "lucide-react";
import type { Certificate } from "@/lib/data";

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/certificates")
      .then((res) => res.json())
      .then(setCertificates)
      .finally(() => setLoading(false));
  }, []);

  async function handleUpload(e: FormEvent) {
    e.preventDefault();
    if (!file || !name) return;

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "certificates");

    try {
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        setMessage("Upload failed");
        return;
      }

      const { fileUrl } = await uploadRes.json();

      const certRes = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, fileUrl }),
      });

      if (certRes.ok) {
        const cert = await certRes.json();
        setCertificates([...certificates, cert]);
        setName("");
        setFile(null);
        if (fileRef.current) fileRef.current.value = "";
        setMessage("Certificate uploaded");
      }
    } catch {
      setMessage("Something went wrong");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this certificate?")) return;

    const res = await fetch("/api/certificates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setCertificates(certificates.filter((c) => c.id !== id));
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Certificates</h1>
        <p className="text-sm text-zinc-500 mt-1">
          {certificates.length} certificates
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">
                Certificate Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="AWS Cloud Practitioner"
                className="w-full h-11 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/30 transition-all"
              />
            </div>

            <div
              onClick={() => fileRef.current?.click()}
              className="rounded-2xl border-2 border-dashed border-white/[0.08] p-6 text-center cursor-pointer hover:border-cyan-500/30 transition-all"
            >
              <Upload size={20} className="mx-auto mb-2 text-zinc-600" />
              <p className="text-sm text-zinc-500">
                {file ? file.name : "Click to select image"}
              </p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>

            <button
              type="submit"
              disabled={uploading || !name || !file}
              className="w-full h-11 rounded-xl bg-white text-[#0a0a0f] text-sm font-medium hover:bg-zinc-200 transition-all disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload Certificate"}
            </button>

            {message && (
              <p className={`text-sm ${message.includes("success") || message.includes("uploaded") ? "text-emerald-400" : "text-red-400"}`}>
                {message}
              </p>
            )}
          </form>
        </div>

        <div className="space-y-2">
          {certificates.length === 0 && (
            <p className="text-sm text-zinc-600 text-center py-12">
              No certificates yet
            </p>
          )}
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.06] px-4 py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Award size={16} className="text-cyan-400 shrink-0" />
                <span className="text-sm text-white truncate">{cert.name}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:text-cyan-400 transition-all"
                >
                  <ExternalLink size={14} />
                </a>
                <button
                  onClick={() => handleDelete(cert.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:text-red-400 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
