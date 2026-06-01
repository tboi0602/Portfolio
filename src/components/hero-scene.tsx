"use client"

import { Suspense, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Group } from "three"
import { FloatingOrb } from "./floating-orb"
import { Particles } from "./particles"

function MouseTracker({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  useFrame(() => {
    smooth.current.x += (mouse.current.x - smooth.current.x) * 0.08
    smooth.current.y += (mouse.current.y - smooth.current.y) * 0.08

    if (groupRef.current) {
      groupRef.current.rotation.x = smooth.current.y * 0.15
      groupRef.current.rotation.y = smooth.current.x * 0.2
    }
  })

  return <group ref={groupRef}>{children}</group>
}

export function HeroScene() {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.3} color="#22d3ee" />
          <MouseTracker>
            <Particles count={800} />
            <FloatingOrb />
          </MouseTracker>
        </Suspense>
      </Canvas>
    </div>
  )
}
