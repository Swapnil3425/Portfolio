"use client"

import React from "react"
import { motion } from "framer-motion"

/**
 * Higher-order wrapper for sections to handle fade-in + upward motion.
 * Supports stagger effects for children.
 */
export function AnimatedSection({ 
  children, 
  delay = 0, 
  stagger = 0.1, 
  className = "" 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: stagger
      }}
      className={`will-change-transform will-change-opacity ${className}`}
    >
      {children}
    </motion.div>
  )
}

/**
 * Wrapper for individual elements inside an AnimatedSection to inherit stagger.
 */
export function AnimatedItem({ children, className = "" }) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
