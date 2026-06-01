import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/3 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-white">
            Tan Tai<span className="text-cyan-400">.</span>
          </span>
          <span className="text-zinc-700 text-sm">|</span>
          <p className="inline-flex items-center gap-1.5 text-xs text-zinc-600">
            Built with <Heart size={10} className="text-red-400/70" /> using Next.js
          </p>
        </div>
        <p className="text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} Huynh Tan Tai
        </p>
      </div>
    </footer>
  )
}
