"use client"

import { Heart } from "lucide-react"
import { AnimatedItem } from "./AnimatedSection"

export function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 lg:px-24 border-t border-border/50 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedItem className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            Built with{" "}
            <Heart className="w-4 h-4 text-pink-500 animate-pulse" />{" "}
            by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 font-medium">
              Swapnil Gandhale
            </span>
          </p>
          
          <p className="text-muted-foreground/60 text-sm font-mono">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </AnimatedItem>
      </div>
    </footer>
  )
}

