"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Mesh } from "three"

export function FloatingOrb() {
  const outerRef = useRef<Mesh>(null)
  const innerRef = useRef<Mesh>(null)
  const glowRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (outerRef.current) {
      outerRef.current.rotation.x = Math.sin(t * 0.1) * 0.2
      outerRef.current.rotation.y = t * 0.12
      outerRef.current.position.y = Math.sin(t * 0.2) * 0.1
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = Math.sin(t * 0.15 + 1) * 0.25
      innerRef.current.rotation.y = -t * 0.2
      innerRef.current.position.y = Math.sin(t * 0.2 + 1) * 0.1
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = Math.sin(t * 0.08 + 2) * 0.15
      glowRef.current.rotation.y = -t * 0.08
      glowRef.current.position.y = Math.sin(t * 0.2 + 2) * 0.1
    }
  })

  return (
    <group>
      <mesh ref={glowRef}>
        <dodecahedronGeometry args={[1.6, 0]} />
        <meshPhysicalMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.06}
          emissive="#22d3ee"
          emissiveIntensity={0.05}
        />
      </mesh>
      <mesh ref={outerRef}>
        <dodecahedronGeometry args={[1.2, 0]} />
        <meshPhysicalMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.3}
          emissive="#22d3ee"
          emissiveIntensity={0.15}
        />
      </mesh>
      <mesh ref={innerRef}>
        <dodecahedronGeometry args={[0.6, 0]} />
        <meshPhysicalMaterial
          color="#3b82f6"
          transparent
          opacity={0.12}
          emissive="#3b82f6"
          emissiveIntensity={0.1}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>
    </group>
  )
}
