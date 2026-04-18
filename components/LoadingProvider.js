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

    // 2. Simulate natural "Data Loading" with snappier delays (400ms - 900ms)
    // Removed the 300ms threshold to show loader instantly as requested
    const randomDelay = Math.floor(Math.random() * 500) + 400
    
    const loadData = setTimeout(() => {
      setIsComplete(true)
      
      // Phase 3: Switch from Loader to Skeletons then Content
      setTimeout(() => {
        setIsLoading(false)
        setShowLoader(false)
      }, 300)
    }, randomDelay)

    return () => clearTimeout(loadData)
  }, [isLoading])

  return (
    <LoadingContext.Provider value={{ isLoading, isComplete }}>
      <Loader isLoading={showLoader} />
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)

