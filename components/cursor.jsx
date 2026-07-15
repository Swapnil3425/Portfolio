"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

/**
 * CustomCursor — premium dot + ring cursor for desktop.
 * - Dot (10px): exact position, violet with glow
 * - Ring (48px): spring-delayed, clearly visible border + subtle fill
 * - On hover over interactive elements: ring expands + brightens
 * - On click: both shrink for satisfying press feedback
 * - Auto-disabled on touch devices
 */
export function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  const dotX = useMotionValue(-200)
  const dotY = useMotionValue(-200)

  const springConfig = { stiffness: 200, damping: 20, mass: 0.6 }
  const ringX = useSpring(dotX, springConfig)
  const ringY = useSpring(dotY, springConfig)

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return
    if (window.innerWidth < 768) return

    const onMove = (e) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onDown = () => setClicking(true)
    const onUp   = () => setClicking(false)

    const onOver = (e) => {
      if (e.target.closest("a, button, [data-cursor-hover], input, textarea, label, select")) {
        setHovering(true)
      }
    }
    const onOut = (e) => {
      if (e.target.closest("a, button, [data-cursor-hover], input, textarea, label, select")) {
        setHovering(false)
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup",   onUp)
    window.addEventListener("mouseover", onOver)
    window.addEventListener("mouseout",  onOut)
    document.documentElement.style.cursor = "none"

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup",   onUp)
      window.removeEventListener("mouseover", onOver)
      window.removeEventListener("mouseout",  onOut)
      document.documentElement.style.cursor = ""
    }
  }, [])

  if (!visible) return null

  return (
    <>
      {/* ── Outer ring ── spring-lagged, expands on hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width:  hovering ? 58 : clicking ? 32 : 48,
            height: hovering ? 58 : clicking ? 32 : 48,
            backgroundColor: hovering ? "rgba(168,85,247,0.12)" : "transparent",
            borderColor: hovering
              ? "rgba(168,85,247,1)"
              : "rgba(168,85,247,0.75)",
            boxShadow: hovering
              ? "0 0 16px rgba(168,85,247,0.5), inset 0 0 8px rgba(168,85,247,0.15)"
              : "0 0 8px rgba(168,85,247,0.3)",
          }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          style={{
            borderRadius: "50%",
            border: "2px solid rgba(168,85,247,0.75)",
          }}
        />
      </motion.div>

      {/* ── Inner dot ── zero lag, exact position */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{
            width:   clicking ? 5 : hovering ? 0 : 10,
            height:  clicking ? 5 : hovering ? 0 : 10,
            opacity: hovering ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 600, damping: 28 }}
          style={{
            borderRadius: "50%",
            background: "rgba(168,85,247,1)",
            boxShadow: "0 0 10px rgba(168,85,247,0.9), 0 0 20px rgba(168,85,247,0.4)",
          }}
        />
      </motion.div>
    </>
  )
}
