"use client"

import { useEffect, useState, useRef } from "react"
import { Github, Linkedin, Mail } from "lucide-react"
import { GlitchText } from "./glitch-text"
import { TypingEffect } from "./typing-effect"
import { MagneticButton } from "./magnetic-button"
import { AnimatedItem } from "./AnimatedSection"
import { motion } from "framer-motion"
import Image from "next/image"

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-16 pb-24 md:pb-12 relative overflow-hidden"
    >


      {/* Content Container */}
      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col gap-8">
        {/* Greeting with icon - Now at the very top */}
        <AnimatedItem className="flex items-center gap-2 mb-2 lg:mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
            border border-primary/30 bg-primary/5 backdrop-blur-sm
            font-mono text-xs text-primary tracking-widest uppercase
            shadow-[0_0_12px_rgba(168,85,247,0.15)]">
            <span className="text-pink-400 font-bold">&lt;</span>
            Welcome to my portfolio
            <span className="text-pink-400 font-bold">/&gt;</span>
          </span>
        </AnimatedItem>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          {/* Text Content Column */}
          <motion.div
            className="relative z-20 w-full lg:col-span-7 order-1"
            initial="initial"
            animate="animate"
            variants={{
              initial: { opacity: 0 },
              animate: { 
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
          >
            {/* Main title with glitch effect */}
            <AnimatedItem>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-[1.1]">
                <span className="block">{"I'm"}</span>
                <GlitchText 
                  text="Swapnil Gandhale" 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-500"
                />
              </h1>
            </AnimatedItem>
            
            {/* Animated subtitle with typing effect */}
            <AnimatedItem>
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-muted-foreground mb-4 leading-tight whitespace-nowrap">
                I craft{" "}
                <span className="relative inline-block">
                  <TypingEffect 
                    words={["digital experiences", "web applications", "beautiful interfaces", "scalable solutions"]}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-primary"
                  />
                </span>
              </h2>
            </AnimatedItem>
            
            {/* Description with animated underline */}
            <AnimatedItem>
              <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl mb-6 leading-relaxed">
                A full-stack developer passionate about creating{" "}
                <span className="relative inline-block text-foreground font-medium group">
                  exceptional
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </span>{" "}
                digital products with modern technologies and{" "}
                <span className="relative inline-block text-foreground font-medium group">
                  pixel-perfect
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </span>{" "}
                attention to detail.
              </p>
            </AnimatedItem>
            
            {/* CTA Buttons with magnetic effect */}
            <AnimatedItem className="flex flex-wrap gap-4 mb-8">
              <MagneticButton 
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground 
                  px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base font-medium
                  shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]
                  transition-all duration-500 relative overflow-hidden group hover:scale-[1.03]"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10">Explore My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </MagneticButton>
              
              <MagneticButton 
                variant="ghost"
                size="lg"
                className="text-muted-foreground hover:text-primary px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base font-medium
                  border border-transparent hover:border-primary/30 transition-all duration-500 hover:scale-[1.03]"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </MagneticButton>
            </AnimatedItem>
   
            {/* Social links with hover effects */}
            <AnimatedItem className="flex items-center gap-6">
              <span className="text-muted-foreground text-sm font-mono">Find me on</span>
              <div className="h-px w-8 bg-gradient-to-r from-border to-transparent" />
              <div className="flex gap-4">
                {[
                  { href: "https://github.com/Swapnil3425", icon: Github, label: "GitHub", color: "#fff" },
                  { href: "https://linkedin.com/in/swapnil3425", icon: Linkedin, label: "LinkedIn", color: "#0A66C2" },
                  { href: "mailto:swapnilg8682@gmail.com", icon: Mail, label: "Email", color: "#EA4335" }
                ].map(({ href, icon: Icon, label, color }) => (
                  <a 
                    key={label}
                    href={href} 
                    target={href.startsWith('mailto') ? undefined : "_blank"}
                    rel={href.startsWith('mailto') ? undefined : "noopener noreferrer"}
                    className="group relative p-3 rounded-xl bg-secondary/50 border border-border
                      hover:border-primary/50 transition-all duration-300
                      hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:scale-110"
                    aria-label={label}
                  >
                    <Icon 
                      className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300"
                    />
                    <div 
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ backgroundColor: color }}
                    />
                  </a>
                ))}
              </div>
            </AnimatedItem>
          </motion.div>

          {/* S Emblem Column */}
          <div className="relative flex flex-col items-center justify-center w-full lg:col-span-5 order-2 z-10 max-w-[260px] sm:max-w-[360px] lg:max-w-[450px] mx-auto pointer-events-none lg:pointer-events-auto">
            <AnimatedItem delay={0.4} className="relative w-full aspect-square mx-auto pointer-events-auto group">
              {/* Nebula glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(168,85,247,0.35)_0%,rgba(168,85,247,0.1)_50%,transparent_75%)] blur-[60px] opacity-50 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />
              <Image
                src="/sg-3d-emblem.png"
                alt="Swapnil Gandhale S emblem"
                width={500}
                height={500}
                className="w-full h-full object-contain relative z-10
                  drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]
                  group-hover:drop-shadow-[0_0_45px_rgba(168,85,247,0.6)]
                  transition-all duration-700 ease-out
                  group-hover:scale-[1.04]"
                priority
              />
            </AnimatedItem>

            {/* Name Label */}
            <AnimatedItem delay={0.6} className="relative mt-3 group pointer-events-auto transition-all duration-500 hover:translate-y-[-3px]">
              <h4 className="text-xs sm:text-sm md:text-base font-mono tracking-[0.35em] text-muted-foreground uppercase text-center
                group-hover:text-primary transition-colors duration-500">
                Swapnil Gandhale
              </h4>
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mt-1.5
                scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
            </AnimatedItem>
          </div>
        </div>
      </div>

    </section>
  )
}
