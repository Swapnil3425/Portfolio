"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export function MagneticButton({ 
  children, 
  className = "", 
  onClick,
  variant = "default",
  size = "default",
  asChild = false,
  onMouseEnter,
  onMouseLeave
}) {
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    setPosition({ x: distanceX * 0.3, y: distanceY * 0.3 })
  }

  const handleMouseReset = () => {
    setPosition({ x: 0, y: 0 })
    if (onMouseLeave) onMouseLeave()
  }

  const handleMouseEnter = () => {
    if (onMouseEnter) onMouseEnter()
  }

  return (
    <Button
      ref={buttonRef}
      variant={variant}
      size={size}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseReset}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 && position.y === 0 ? "transform 0.3s ease-out" : "none"
      }}
      asChild={asChild}
    >
      {children}
    </Button>
  )
}
