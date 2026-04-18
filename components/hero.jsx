"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react"
import { GlitchText } from "./glitch-text"
import { TypingEffect } from "./typing-effect"
import { MagneticButton } from "./magnetic-button"
import { AnimatedItem } from "./AnimatedSection"
import { motion } from "framer-motion"
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot"

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20 pb-32 md:pb-20 relative overflow-hidden"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%)',
            top: `${20 + mousePosition.y * 10}%`,
            left: `${50 + mousePosition.x * 10}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'top 0.3s ease-out, left 0.3s ease-out'
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)',
            bottom: `${10 + (1 - mousePosition.y) * 15}%`,
            right: `${10 + (1 - mousePosition.x) * 15}%`,
            transition: 'bottom 0.5s ease-out, right 0.5s ease-out'
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
            top: '60%',
            left: '20%',
          }}
        />
      </div>



      {/* Content Container */}
      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col gap-8">
        {/* Greeting with icon - Now at the very top */}
        <AnimatedItem className="flex items-center gap-2 mb-2 lg:mb-4">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-primary font-mono text-sm tracking-widest uppercase">
            Welcome to my portfolio
          </span>
        </AnimatedItem>

        <div className="relative w-full">
          {/* Robot Column - Floating right on ALL screens */}
          <div className="absolute right-[-10px] sm:right-0 top-[-20px] md:top-[10px] lg:top-[20px] flex items-center justify-center spline-wrapper w-[180px] xs:w-[200px] sm:w-[260px] md:w-[320px] lg:w-[400px] xl:w-[450px] z-0 pointer-events-none lg:pointer-events-auto">
            
            {/* The AnimatedItem acts as the visible window. Aspect 4/5 prevents the 3D scene from zooming/cropping. */}
            <AnimatedItem delay={0.4} className="relative w-full aspect-[4/5] mx-auto pointer-events-auto overflow-hidden rounded-2xl">
              
              {/* This inner div extends 70px below the visible window to hide the Spline watermark entirely! */}
              <div className="absolute inset-x-0 top-0 bottom-[-70px]">
                <InteractiveRobotSpline 
                  scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
                  className="w-full h-full transition-transform duration-700 ease-out hover:scale-[1.02]"
                />
              </div>

            </AnimatedItem>

          </div>

          {/* Text Content Column */}
          <motion.div
            className="relative z-20 w-full max-w-[100%] sm:max-w-[70%] lg:max-w-3xl"
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
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-[1.1]">
                <span className="block">{"I'm"}</span>
                <GlitchText 
                  text="Swapnil Gandhale" 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-500"
                />
              </h1>
            </AnimatedItem>
            
            {/* Animated subtitle with typing effect */}
            <AnimatedItem>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-muted-foreground mb-8 leading-tight whitespace-nowrap">
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
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
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
            <AnimatedItem className="flex flex-wrap gap-4 mb-14">
              <MagneticButton 
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground 
                  px-8 py-6 text-base font-medium
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
                className="text-muted-foreground hover:text-primary px-8 py-6 text-base font-medium
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
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 overflow-hidden"
      >
        <div className="flex flex-col items-center gap-2 group cursor-pointer"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">
            Scroll Down
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 group-hover:border-primary/50 
            flex items-start justify-center p-2 transition-colors duration-300">
            <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
