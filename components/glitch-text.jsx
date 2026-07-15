"use client"

import { useEffect, useCallback, useState } from "react"
import { animate } from "framer-motion"

/**
 * ShimmerText — premium light-sweep effect over gradient text.
 *
 * Uses framer-motion's animate() to drive backgroundPosition via React state.
 * No CSS keyframes needed — works reliably regardless of CSS cascade order.
 *
 * Gradient layout (background-size: 300%):
 *   0–33%  (visible at pos 0%)  : purple → pink  ← rest state
 *   33–67% (visible at pos 50%) : white shimmer highlight
 *   67–100%(visible at pos 100%): purple → pink  ← same look, seamless loop
 *
 * Animation: bg-pos 100% → 0% sweeps the white through the visible window.
 */
export function ShimmerText({ text, className = "" }) {
  const [bgPos, setBgPos] = useState("0% center")

  const trigger = useCallback(() => {
    // Start from right side (100% = right third = purple-pink, same as rest)
    setBgPos("100% center")
    // Animate to left side (0% = left third = purple-pink, sweeping white through)
    animate(100, 0, {
      duration: 1.1,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => setBgPos(`${v}% center`),
    })
  }, [])

  useEffect(() => {
    const initial = setTimeout(trigger, 900)
    const loop = setInterval(trigger, 5000)
    return () => {
      clearTimeout(initial)
      clearInterval(loop)
    }
  }, [trigger])

  return (
    <span
      className={`relative inline-block cursor-default select-none ${className}`}
      onMouseEnter={trigger}
    >
      <span
        style={{
          backgroundImage: `linear-gradient(
            90deg,
            #a855f7  0%,
            #c084fc  12%,
            #ec4899  33%,
            rgba(255,255,255,0)    38%,
            rgba(255,255,255,0.92) 50%,
            rgba(255,255,255,0)    62%,
            #a855f7  67%,
            #c084fc  85%,
            #ec4899  100%
          )`,
          backgroundSize: "300% 100%",
          backgroundPosition: bgPos,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          display: "inline-block",
        }}
      >
        {text}
      </span>
    </span>
  )
}

export { ShimmerText as GlitchText }
