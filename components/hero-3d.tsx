"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const Hero3DCanvas = dynamic(
  () =>
    import("./hero-3d-canvas").then((m) => ({ default: m.Hero3DCanvas })),
  { ssr: false, loading: () => null }
)

const MD_MIN = 768

/** CSS-only hero backdrop for small viewports (no WebGL / Three.js). */
function HeroMobileBackdrop() {
  return (
    <div
      className="absolute inset-0 z-0 md:hidden overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* Base depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_85%_20%,rgba(255,255,255,0.14),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_10%_75%,rgba(0,120,64,0.45),transparent_50%)]" />
      {/* Soft “glass” orbs */}
      <div
        className="absolute -right-[20%] top-[8%] h-[min(52vw,280px)] w-[min(52vw,280px)] rounded-full opacity-[0.22] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.55), rgba(200,230,210,0.15) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute -right-[8%] top-[22%] h-[min(40vw,200px)] w-[min(40vw,200px)] rounded-full opacity-30 blur-2xl border border-white/10"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
    </div>
  )
}

export function Hero3D() {
  const [useCanvas, setUseCanvas] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${MD_MIN}px)`)
    const apply = () => setUseCanvas(mql.matches)
    apply()
    mql.addEventListener("change", apply)
    return () => mql.removeEventListener("change", apply)
  }, [])

  return (
    <>
      <HeroMobileBackdrop />
      {useCanvas ? <Hero3DCanvas /> : null}
    </>
  )
}
