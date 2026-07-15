"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { Loader } from "./Loader"

const LoadingContext = createContext({
  isLoading: true,
  isComplete: false,
})

/**
 * Provider to manage the premium 4-phase loading flow.
 * 1. Branded Loader (Instant)
 * 2. Complete (Transition to Skeletons then Content)
 */
export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true) // Overall loading state
  const [showLoader, setShowLoader] = useState(true) // Show branded loader immediately
  const [isComplete, setIsComplete] = useState(false) // Data is "ready"

  useEffect(() => {
    // 1. Check if we are still loading (prevent re-triggering)
    if (!isLoading) return

    // 2. Simulate natural "Data Loading" that lasts a bit longer (1800ms - 2200ms)
    // This allows the percentage loader to climb smoothly and feel premium
    const randomDelay = Math.floor(Math.random() * 400) + 1800
    
    const loadData = setTimeout(() => {
      // Flip isLoading first — content in page.js starts mounting immediately
      setIsComplete(true)
      setIsLoading(false)

      // Dismiss the loader after 400ms — gives user time to see 100%
      // before the 0.55s exit animation starts
      setTimeout(() => setShowLoader(false), 400)
    }, randomDelay)

    return () => clearTimeout(loadData)
  }, [isLoading])

  return (
    <LoadingContext.Provider value={{ isLoading, isComplete }}>
      <Loader isLoading={showLoader} />
      {/* No opacity wrapper — the loader's opaque bg-background covers content naturally.
          Its 0.55s AnimatePresence fade-out IS the reveal transition. */}
      <div>{children}</div>
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)

