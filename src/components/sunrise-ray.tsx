export function SunriseRay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1]" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 140% 100% at 0% 0%,
              rgba(255, 200, 100, 0.07) 0%,
              rgba(255, 150, 50, 0.04) 20%,
              rgba(255, 100, 50, 0.02) 35%,
              transparent 55%
            )
          `,
          mixBlendMode: "screen",
          animation: "sunrise 3s ease-out forwards",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 120% 70% at 3% 3%,
              rgba(255, 220, 150, 0.04) 0%,
              rgba(255, 200, 100, 0.02) 25%,
              transparent 50%
            )
          `,
          mixBlendMode: "screen",
          animation: "sunrise 3.5s ease-out forwards",
          animationDelay: "0.5s",
          opacity: 0,
        }}
      />
    </div>
  )
}
