"use client"

import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { useLoading } from "@/components/LoadingProvider"
import { Skeleton } from "@/components/Skeleton"
import { AnimatedSection } from "@/components/AnimatedSection"
import { AnimatePresence, motion } from "framer-motion"

export default function Home() {
  const { isLoading } = useLoading()

  return (
    <main className="min-h-screen relative">
      <AnimatePresence mode="sync">
        {isLoading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-14 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto space-y-32"
          >
            {/* Hero Skeleton */}
            <div className="min-h-[70vh] flex flex-col justify-center space-y-8">
              <Skeleton variant="text" className="h-6 w-48" />
              <Skeleton variant="title" className="h-20 w-full md:w-3/4" />
              <Skeleton variant="text" className="h-12 w-full md:w-2/3" />
              <div className="flex gap-4">
                <Skeleton className="h-14 w-40" />
                <Skeleton className="h-14 w-40" />
              </div>
            </div>

            {/* Content Skeletons */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Skeleton variant="title" className="h-10 w-48" />
                <Skeleton variant="text" className="h-32 w-full" />
              </div>
              <Skeleton className="aspect-square rounded-2xl w-full max-w-md mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Skeleton className="h-64 rounded-xl" />
              <Skeleton className="h-64 rounded-xl" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatedSection>
              <Hero />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <About />
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <Projects />
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <Skills />
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <Contact />
            </AnimatedSection>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
