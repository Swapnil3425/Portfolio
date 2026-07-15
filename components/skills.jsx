"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatedItem } from "./AnimatedSection"
import { motion } from "framer-motion"

const skillCategories = [
  {
    title: "Frontend",
    icon: "◈",
    color: "from-violet-500 to-purple-500",
    skills: ["HTML", "CSS", "JavaScript", "React.js", "Next.js"]
  },
  {
    title: "Backend",
    icon: "◇",
    color: "from-pink-500 to-rose-500",
    skills: ["Node.js", "Express.js", "RESTful APIs"]
  },
  {
    title: "Databases",
    icon: "▥",
    color: "from-amber-500 to-orange-500",
    skills: ["MongoDB", "MySQL"]
  },
  {
    title: "Data & Analytics",
    icon: "▦",
    color: "from-emerald-500 to-teal-500",
    skills: ["MS Excel", "MS Office", "Power BI"]
  },
  {
    title: "Version Control",
    icon: "◆",
    color: "from-blue-500 to-cyan-500",
    skills: ["Git", "GitHub"]
  },
  {
    title: "Core Concepts",
    icon: "◊",
    color: "from-sky-500 to-indigo-500",
    skills: ["OOP", "SDLC basics"]
  }
]

function SkillCard({ category, categoryIndex }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      onTouchCancel={() => setIsHovered(false)}
      className={`group p-6 md:p-8 rounded-2xl bg-secondary/30 border transition-all duration-700 
        ${isHovered ? 'border-primary/30 bg-secondary/50 shadow-[0_0_40px_rgba(168,85,247,0.1)] scale-[1.03] z-10' : 'border-border scale-100'}`}
    >
      {/* Category header */}
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} 
          flex items-center justify-center text-2xl text-white
          transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          shadow-lg ${isHovered ? 'scale-110 rotate-[25deg]' : ''}`}>
          {category.icon}
        </div>
        <div>
          <h3 className={`text-xl font-bold transition-colors duration-300 ${isHovered ? 'text-primary' : 'text-foreground'}`}>
            {category.title}
          </h3>
          <p className="text-sm text-muted-foreground">{category.skills.length} technologies</p>
        </div>
      </div>

      {/* Skills list as chips */}
      <div className="flex flex-wrap gap-3">
        {category.skills.map((skill) => (
          <div 
            key={skill}
            className={`px-4 py-2 rounded-xl bg-background/50 border text-sm font-medium transition-all duration-300
              ${isHovered ? 'border-primary/50 text-primary scale-105' : 'border-border/50'}`}
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  )
}

export function Skills() {
  return (
    <section 
      id="skills" 
      className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Animated grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
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
            <span className="text-primary font-mono text-sm">03.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Skills &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">
                Expertise
              </span>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-border via-primary/20 to-transparent" />
          </AnimatedItem>

          {/* Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {skillCategories.map((category, categoryIndex) => (
              <AnimatedItem key={category.title}>
                <SkillCard 
                  category={category}
                  categoryIndex={categoryIndex}
                />
              </AnimatedItem>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

