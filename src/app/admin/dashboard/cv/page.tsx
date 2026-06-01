"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import { Upload, FileText, Check } from "lucide-react";
import type { CV } from "@/lib/data";

export default function AdminCV() {
  const [cv, setCV] = useState<CV | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/cv")
      .then((res) => res.json())
      .then(setCV);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "cv");

    try {
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        setMessage("Upload failed");
        return;
      }

      const { fileName } = await uploadRes.json();

      const updateRes = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName, displayName: "Portfolio CV" }),
      });

      if (updateRes.ok) {
        setMessage("CV updated successfully");
        setFile(null);
        setCV({ fileName, displayName: "Portfolio CV", updatedAt: new Date().toISOString() });
        if (fileRef.current) fileRef.current.value = "";
      }
    } catch {
      setMessage("Something went wrong");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">CV</h1>
        <p className="text-sm text-zinc-500 mt-1">Upload or update your CV</p>
      </div>

      <div className="max-w-lg">
        {cv && (
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5 mb-6 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <FileText size={18} className="text-cyan-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">{cv.displayName}</div>
              <div className="text-xs text-zinc-500 font-mono">
                {cv.fileName} · Updated {new Date(cv.updatedAt).toLocaleDateString()}
              </div>
            </div>
            <Check size={16} className="ml-auto text-emerald-400 shrink-0" />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            onClick={() => fileRef.current?.click()}
            className="rounded-2xl border-2 border-dashed border-white/[0.08] p-8 text-center cursor-pointer hover:border-cyan-500/30 transition-all"
          >
            <Upload size={24} className="mx-auto mb-3 text-zinc-600" />
            <p className="text-sm text-zinc-500 mb-1">
              {file ? file.name : "Click to select a file"}
            </p>
            <p className="text-xs text-zinc-700">DOCX or PDF</p>
            <input
              ref={fileRef}
              type="file"
              accept=".docx,.pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          {file && (
            <button
              type="submit"
              disabled={uploading}
              className="w-full h-11 rounded-xl bg-white text-[#0a0a0f] text-sm font-medium hover:bg-zinc-200 transition-all disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload CV"}
            </button>
          )}

          {message && (
            <p className={`text-sm ${message.includes("success") ? "text-emerald-400" : "text-red-400"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
