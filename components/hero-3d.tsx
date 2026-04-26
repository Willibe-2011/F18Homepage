"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Sphere, TorusKnot } from "@react-three/drei"
import * as THREE from "three"

function GlassShape() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1
      meshRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <group>
      {/* Main Glass Shape */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Changed y position from 0 to 1.2 to move it up */}
        <group position={[1.5, 1.2, -1]} scale={0.85}>
          <TorusKnot ref={meshRef} args={[1.5, 0.4, 128, 64]}>
            <meshPhysicalMaterial
              transmission={1}
              roughness={0.1}
              thickness={2.5}
              ior={1.5}
              clearcoat={1}
              clearcoatRoughness={0.1}
              color="#ffffff"
            />
          </TorusKnot>

          {/* Glowing Inner Nodes removed */}
        </group>
      </Float>
    </group>
  )
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full opacity-100">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* Environment map is critical for glass reflections */}
        <Environment preset="city" />
        
        <GlassShape />
      </Canvas>
    </div>
  )
}
