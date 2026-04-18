"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * Centered Global Loader with branded pulse logo.
 * Show transitions smoothly with fade-out.
 */
export function Loader({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="relative">
            {/* Branded Pulse Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1, 0.8],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex items-center justify-center"
            >
              <div className="w-16 h-16 rounded-2xl border-2 border-primary/30 flex items-center justify-center bg-card/50 backdrop-blur-xl">
                <span className="text-3xl font-bold text-primary tracking-tighter">S</span>
              </div>
            </motion.div>
            
            {/* Subtle glow behind logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
