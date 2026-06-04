"use client"

export function GridBg() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1]" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)",
        }}
      />
    </div>
  )
}
