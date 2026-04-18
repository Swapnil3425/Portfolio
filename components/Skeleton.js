"use client"

import React from "react"

/**
 * Reusable Skeleton component with shimmer effect.
 * Handles different shapes and sizes to match final layout.
 */
export function Skeleton({ className, variant = "rect" }) {
  const baseClasses = "relative overflow-hidden bg-secondary/30"
  
  const variants = {
    rect: "rounded-lg",
    circle: "rounded-full",
    text: "rounded h-4 w-full",
    title: "rounded-md h-8 w-3/4",
  }

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`}>
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.05)]" />
    </div>
  )
}
