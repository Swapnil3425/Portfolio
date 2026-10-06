"use client"

import { useState, useRef, useCallback } from "react"
import { ProjectCard } from "./project-card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatedItem } from "./AnimatedSection"
import { motion } from "framer-motion"

const projects = [
  {
    title: "BookBank – Book Management System",
    description: "Engineered a backend-driven platform to manage book lending and transactions with secure APIs and optimized database queries. Deployed with production-ready configurations and scalable architecture.",
    tags: ["Node.js", "Express.js", "MongoDB", "JWT"],
    githubUrl: "https://github.com/Swapnil3425/Book-Bank",
    liveUrl: "https://book-bank-nu.vercel.app/",
    featured: true
  },
  {
    title: "Saarthi – Real-Time Chat Application",
    description: "Built a real-time chat application enabling instant messaging with WebSocket-based communication. Implemented user authentication, message persistence, and responsive UI for seamless interaction.",
    tags: ["React", "Node.js", "Socket.IO", "MongoDB"],
    githubUrl: "https://github.com/Swapnil3425/Saarthi-The-ChatApp",
    liveUrl: "https://saarthi-the-chat-app.vercel.app/"
  },
  {
    title: "Budgeto – Expense Tracker",
    description: "Created a personal finance tracker to monitor expenses and manage budgets effectively. Implemented data visualization and structured transaction tracking for better financial insights.",
    tags: ["React", "Node.js", "MongoDB", "Chart.js"],
    githubUrl: "https://github.com/Swapnil3425/Budgeto---Expense-Tracker",
    liveUrl: "https://budgeto-expense-tracker.vercel.app/"
  },
  {
    title: "SochAurLikh – Note Taking App",
    description: "Developed a full-stack MERN note-taking application with secure authentication and real-time CRUD operations. Designed for efficient content organization with a clean and responsive user interface.",
    tags: ["MongoDB", "Express.js", "React", "Node.js"],
    githubUrl: "https://github.com/Swapnil3425/SochAurLikh_NoteApp",
    liveUrl: "https://soch-aur-likh-note-app.vercel.app/"
  }
]

// ─── Mobile-only animated card-stack carousel ────────────────────────────────
function MobileCarousel() {
  const [active, setActive] = useState(0)
  const total = projects.length

  // Touch / trackpad state
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)
  const wheelAccum = useRef(0)
  const wheelTimer = useRef(null)

  const handleNext = useCallback(() => setActive((prev) => (prev + 1) % total), [total])
  const handlePrev = useCallback(() => setActive((prev) => (prev - 1 + total) % total), [total])

  // ── Touch swipe ──
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    // Only trigger if horizontal swipe dominates
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? handleNext() : handlePrev()
    }
    touchStartX.current = null
    touchStartY.current = null
  }

  // ── Trackpad / mouse wheel horizontal scroll ──
  const onWheel = (e) => {
    // Use horizontal delta for trackpad two-finger swipe
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0
    if (delta === 0) return
    e.preventDefault()
    wheelAccum.current += delta
    clearTimeout(wheelTimer.current)
    wheelTimer.current = setTimeout(() => { wheelAccum.current = 0 }, 300)
    if (wheelAccum.current > 60) {
      wheelAccum.current = 0
      handleNext()
    } else if (wheelAccum.current < -60) {
      wheelAccum.current = 0
      handlePrev()
    }
  }

  // Map each card's position in the stack relative to active
  const getStackProps = (index) => {
    const dist = (index - active + total) % total
    const configs = [
      // Active card — fully visible
      { scale: 1,    y: 0,   rotate: 0,  opacity: 1,   zIndex: 30, dimmed: false },
      // One behind (slightly peeking bottom-right)
      { scale: 0.95, y: 14, rotate: 2,  opacity: 1,   zIndex: 20, dimmed: true  },
      // Two behind
      { scale: 0.90, y: 26, rotate: -2, opacity: 1,   zIndex: 10, dimmed: true  },
    ]
    if (dist >= 3) return { scale: 0.85, y: 36, rotate: 0, opacity: 0, zIndex: 0, dimmed: true }
    return configs[dist]
  }

  return (
    <div
      className="flex flex-col items-center w-full select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onWheel={onWheel}
    >
      {/* Card stack wrapper */}
      <div className="relative w-full" style={{ minHeight: 460, paddingBottom: 20 }}>
        {projects.map((project, index) => {
          const { scale, y, rotate, opacity, zIndex, dimmed } = getStackProps(index)
          return (
            <motion.div
              key={project.title}
              animate={{ scale, y, rotate, opacity }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 overflow-hidden rounded-xl"
              style={{ zIndex }}
            >
              <ProjectCard {...project} index={index} />
              {/* Dark scrim on non-active cards to prevent bleed-through */}
              {dimmed && (
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ background: "rgba(0,0,0,0.55)" }}
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* ── Controls: arrows + dots below card ── */}
      <div className="flex items-center gap-5 mt-4">
        {/* Left arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous project"
          className="p-3 rounded-full bg-background/80 border border-border/60 text-foreground
            backdrop-blur-md hover:bg-primary hover:text-primary-foreground hover:border-primary
            transition-all duration-300 shadow-lg active:scale-90"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to project ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? "w-6 h-2 bg-primary"
                  : "w-2 h-2 bg-border hover:bg-primary/50"
              }`}
            />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={handleNext}
          aria-label="Next project"
          className="p-3 rounded-full bg-background/80 border border-border/60 text-foreground
            backdrop-blur-md hover:bg-primary hover:text-primary-foreground hover:border-primary
            transition-all duration-300 shadow-lg active:scale-90"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

// ─── Main Projects Section ────────────────────────────────────────────────────
export function Projects() {
  return (
    <section
      id="projects"
      className="py-32 relative overflow-hidden"
    >
      {/* Background ambient glows */}
      <div className="absolute top-1/4 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-60 h-60 bg-pink-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* Section header */}
        <AnimatedItem className="flex items-center gap-4 mb-16">
          <span className="text-primary font-mono text-sm">02.</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">
              Projects
            </span>
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-border via-primary/20 to-transparent" />
        </AnimatedItem>

        {/* ── Mobile: animated card-stack carousel (hidden on md+) ── */}
        <AnimatedItem className="md:hidden">
          <MobileCarousel />
        </AnimatedItem>

        {/* ── Desktop: 2-col staggered grid (hidden on mobile) ── */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{
            animate: {
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {projects.map((project, index) => (
            <AnimatedItem key={project.title}>
              <ProjectCard {...project} index={index} />
            </AnimatedItem>
          ))}
        </motion.div>

        {/* View all link */}
        <AnimatedItem className="flex justify-center mt-16">
          <a
            href="https://github.com/Swapnil3425"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-primary font-mono text-sm
              hover:gap-4 transition-all duration-300"
          >
            <span>View All Projects on GitHub</span>
            <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </AnimatedItem>
      </div>
    </section>
  )
}
