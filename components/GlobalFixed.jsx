"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

/**
 * GlobalFixed — all truly fixed UI that must survive any parent transforms.
 * Lives directly in layout.js outside the LoadingProvider opacity wrapper.
 * Contains: ambient gradient orbs + scroll down indicator.
 */
export default function GlobalFixed() {
  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Delay slightly so it doesn't flash before loading finishes
    const timer = setTimeout(() => setVisible(true), 1800)
    const handleScroll = () => {
      setShow(window.scrollY < window.innerHeight * 0.55)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      {/* Ambient gradient orbs — fixed so they cover every section */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        <div
          className="absolute w-[700px] h-[700px] rounded-full blur-[130px] opacity-[0.16]"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.55) 0%, transparent 70%)",
            top: "5%",
            left: "55%",
            transform: "translate(-50%,-50%)",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[110px] opacity-[0.11]"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.5) 0%, transparent 70%)",
            bottom: "10%",
            right: "5%",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.09]"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.45) 0%, transparent 70%)",
            top: "55%",
            left: "8%",
          }}
        />
      </div>

      {/* Scroll Down indicator — appears after load, hides once scrolled */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visible && show ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="fixed bottom-[4vh] left-1/2 -translate-x-1/2 z-30 pointer-events-auto"
      >
        <div
          className="flex flex-col items-center gap-2 group cursor-pointer"
          onClick={() =>
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">
            Scroll Down
          </span>
          <div
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30
              group-hover:border-primary/50 flex items-start justify-center p-2
              transition-colors duration-300"
          >
            <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </motion.div>
    </>
  )
}
