"use client"

import { useEffect, useState } from "react"

export function GlitchText({ text, className = "" }) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 1000)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-0 w-full text-[#ff00ff] animate-pulse"
            style={{ 
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
              transform: 'translate(-2px, -1px)',
              opacity: 0.8
            }}
          >
            {text}
          </span>
          <span 
            className="absolute top-0 left-0 w-full text-[#00ffff]"
            style={{ 
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
              transform: 'translate(2px, 1px)',
              opacity: 0.8
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  )
}
