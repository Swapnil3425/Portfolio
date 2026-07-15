"use client"

import { useRef, useState } from "react"
import { Card } from "@/components/ui/card"

export function TiltCard({ children, className = "", glareEnabled = true }) {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState("")
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 22
    const rotateY = (centerX - x) / 22

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`)
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.04
    })
  }

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)")
    setGlare({ x: 50, y: 50, opacity: 0 })
  }

  return (
    <Card
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => {
        setTransform("perspective(1000px) scale3d(1.02, 1.02, 1.02)")
        setGlare(prev => ({ ...prev, opacity: 0.04 }))
      }}
      onTouchEnd={() => {
        setTransform("perspective(1000px) scale3d(1, 1, 1)")
        setGlare(prev => ({ ...prev, opacity: 0 }))
      }}
      onTouchCancel={() => {
        setTransform("perspective(1000px) scale3d(1, 1, 1)")
        setGlare(prev => ({ ...prev, opacity: 0 }))
      }}
      style={{
        transform,
        transition: "transform 0.2s ease-out",
        transformStyle: "preserve-3d"
      }}
    >
      {children}
      {glareEnabled && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}), transparent 50%)`,
            transition: "opacity 0.3s ease-out"
          }}
        />
      )}
    </Card>
  )
}
