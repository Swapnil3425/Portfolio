"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * Smooth branded loader with animated progress bar.
 */
export function Loader({ isLoading, isComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isLoading) return
    setProgress(0)

    // Smoothly increment progress to 90%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        const step = Math.floor(Math.random() * 6) + 4 // increment by 4 to 9%
        return Math.min(prev + step, 90)
      })
    }, 120)

    return () => clearInterval(interval)
  }, [isLoading])

  // When loading is done, snap to 100% so user sees it before the loader exits
  useEffect(() => {
    if (isComplete) setProgress(100)
  }, [isComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background"
        >
          {/* Logo mark */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative mb-10"
          >
            <div className="w-16 h-16 rounded-2xl border border-primary/20 flex items-center justify-center
              bg-gradient-to-br from-primary/10 to-pink-500/10 backdrop-blur-xl
              shadow-[0_0_40px_rgba(168,85,247,0.15)]">
              <span className="text-3xl font-bold text-transparent bg-clip-text
                bg-gradient-to-br from-primary to-pink-500 tracking-tighter select-none">S</span>
            </div>
            {/* Ring pulse */}
            <motion.div
              animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-2xl border border-primary/30"
            />
          </motion.div>

          {/* Progress bar track */}
          <div className="w-48 h-[2px] rounded-full bg-primary/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary via-purple-400 to-pink-500"
              style={{ boxShadow: '0 0 8px rgba(168,85,247,0.6)' }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>

          {/* Percentage Text */}
          <div className="mt-3 font-mono text-[10px] text-muted-foreground tracking-widest select-none">
            {Math.round(progress)}%
          </div>

          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
