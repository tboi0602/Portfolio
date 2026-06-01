"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, BufferGeometry, Float32BufferAttribute } from "three"

interface ParticleData {
  geometry: BufferGeometry
  velocities: Float32Array
}

function createParticleData(count: number): ParticleData {
  const pos = new Float32Array(count * 3)
  const vel = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    const radius = 3 + Math.random() * 5
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    pos[i * 3 + 2] = radius * Math.cos(phi)
    vel[i] = 0.001 + Math.random() * 0.005
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute("position", new Float32BufferAttribute(pos, 3))
  return { geometry, velocities: vel }
}

interface ParticlesProps {
  count?: number
}

export function Particles({ count = 600 }: ParticlesProps) {
  const pointsRef = useRef<Points>(null)
  const data = useMemo(() => createParticleData(count), [count])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array
    const t = clock.getElapsedTime()
    for (let i = 0; i < count; i++) {
      const speed = data.velocities[i]
      const angle = t * speed
      const x = positions[i * 3]
      const z = positions[i * 3 + 2]
      const radius = Math.sqrt(x * x + z * z)
      if (radius > 0.01) {
        const newAngle = Math.atan2(z, x) + angle
        positions[i * 3] = radius * Math.cos(newAngle)
        positions[i * 3 + 2] = radius * Math.sin(newAngle)
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef} geometry={data.geometry}>
      <pointsMaterial
        size={0.015}
        color="#22d3ee"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={2}
      />
    </points>
  )
}
