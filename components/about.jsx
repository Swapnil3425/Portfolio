"use client"

import { useState } from "react"
import { Cpu, Brain, Layout } from "lucide-react"
import { AnimatedItem } from "./AnimatedSection"
import { motion } from "framer-motion"
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot"

const stats = [
  { label: "Enthusiast", value: "Tech", icon: Cpu },
  { label: "Solving", value: "Problem", icon: Brain },
  { label: "Development", value: "Web", icon: Layout }
]

function StatCard({ stat, index }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      className={`group p-6 rounded-xl bg-secondary/30 border transition-all duration-500 text-center
        ${isHovered 
          ? 'border-primary/30 bg-secondary/50 shadow-[0_0_30px_rgba(168,85,247,0.1)] scale-105 z-10' 
          : 'border-border scale-100'}`}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-pink-500/20 
        flex items-center justify-center mx-auto mb-4
        transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        border border-primary/20
        ${isHovered ? 'scale-110 rotate-[25deg] border-primary/40 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : ''}`}>
        <stat.icon className="w-6 h-6 text-primary" />
      </div>
      <div className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text 
        bg-gradient-to-r from-primary to-pink-500 mb-1 transition-all duration-500
        ${isHovered ? 'scale-110' : 'scale-100'}`}>
        {stat.value}
      </div>
      <div className={`text-sm transition-colors duration-500 ${isHovered ? 'text-foreground' : 'text-muted-foreground'}`}>
        {stat.label}
      </div>
    </div>
  )
}

export function About() {

  return (
    <section 
      id="about" 
      className="py-32 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <motion.div
           initial="initial"
           whileInView="animate"
           viewport={{ once: true }}
           variants={{
             animate: {
               transition: {
                 staggerChildren: 0.1
               }
             }
           }}
        >
          {/* Section header */}
          <AnimatedItem className="flex items-center gap-4 mb-16">
            <span className="text-primary font-mono text-sm">01.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">
                Me
              </span>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-border via-primary/20 to-transparent" />
          </AnimatedItem>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            {/* Robot/Avatar — LEFT column */}
            <AnimatedItem className="lg:col-span-2 relative group order-2 lg:order-1">
              <div className="relative flex flex-col items-center -mt-8 lg:-mt-20">
                {/* Nebula Glow Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] 
                  bg-[radial-gradient(circle,rgba(168,85,247,0.3)_0%,rgba(168,85,247,0.1)_45%,transparent_70%)] 
                  blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none" />

                <div className="relative w-full max-w-[450px] aspect-[4/5] flex items-center justify-center z-10 overflow-hidden rounded-2xl">
                  {/* Inner div extends 70px below to hide the Spline watermark */}
                  <div className="absolute inset-x-0 top-0 bottom-[-70px]">
                    <InteractiveRobotSpline
                      scene="https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
                      className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </div>
            </AnimatedItem>

            {/* Text content — RIGHT column */}
            <div className="lg:col-span-3 space-y-6 order-1 lg:order-2">
              {[
                "I’m Swapnil, a B.Tech Computer Science student at IIITP, with a strong focus on building scalable and user-centric applications.",
                "I’ve built full-stack projects using React, Node.js, and MongoDB, along with a strong foundation in Data Structures and Algorithms. I focus on writing maintainable code and building solutions that are both practical and well-designed.",
                "I continuously strengthen my problem-solving skills and collaborate with peers by discussing approaches and helping others understand concepts like DSA."
              ].map((text, index) => (
                <AnimatedItem key={index}>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {text}
                  </p>
                </AnimatedItem>
              ))}

              {/* Tech stack highlight */}
              <AnimatedItem className="pt-4">
                <p className="text-foreground font-medium mb-3">Current tech stack:</p>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "React", "Tailwind CSS", "JavaScript", "Lucide Icons", "Radix UI"].map((tech, i) => (
                    <span 
                      key={tech}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-pink-500/10
                        text-primary text-sm font-mono border border-primary/20
                        hover:border-primary/40 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]
                        transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </AnimatedItem>
            </div>
          </div>

          {/* Stats section */}
          <motion.div 
             initial="initial"
             whileInView="animate"
             viewport={{ once: true }}
             variants={{
               animate: {
                 transition: {
                   staggerChildren: 0.1
                 }
               }
             }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
          >
            {stats.map((stat, index) => (
              <AnimatedItem key={stat.label}>
                <StatCard stat={stat} index={index} />
              </AnimatedItem>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

