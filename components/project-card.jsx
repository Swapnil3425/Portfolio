"use client"

import { useRef, useState } from "react"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import { CardContent } from "@/components/ui/card"
import { TiltCard } from "./tilt-card"

export function ProjectCard({ 
  title, 
  description, 
  tags, 
  githubUrl, 
  liveUrl,
  featured = false,
  index = 0,
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      onTouchCancel={() => setIsHovered(false)}
      className={`
        snap-center shrink-0 w-[85vw] md:w-full 
        ${featured ? 'md:col-span-2' : ''}
        transition-all duration-500 ease-out
        ${isHovered ? 'scale-[1.03] z-20' : 'scale-100 z-10'}
      `}
      style={{ 
        animationDelay: `${index * 150}ms`,
      }}
    >
      <TiltCard 
        className={`
          group relative overflow-hidden border-border bg-card/50 backdrop-blur-sm
          transition-all duration-700 ease-out h-full
          hover:border-primary/50 
          ${isHovered ? 'shadow-[0_0_60px_rgba(168,85,247,0.15)]' : ''}
        `}
      >
        {/* Animated gradient border */}
        <div 
          className={`absolute inset-0 transition-opacity duration-700 pointer-events-none rounded-lg ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.15), transparent 40%)`
          }}
        />

        {/* Animated border glow */}
        <div className={`absolute inset-[-1px] rounded-lg transition-opacity duration-500 pointer-events-none overflow-hidden ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div 
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent ${isHovered ? 'animate-border-glow' : ''}`}
          />
        </div>

        <CardContent className="p-6 md:p-8 relative z-10">
          {/* Project number — bottom-right, smaller & more visible */}
          <div className={`absolute bottom-4 right-4 text-4xl font-bold transition-all duration-500 
            ${isHovered ? 'text-primary/35 scale-110' : 'text-primary/20 scale-100'}`}>
            {String(index + 1).padStart(2, '0')}
          </div>

          <div className="flex items-start justify-between mb-6">
            {/* Icon container with glow */}
            <div className="relative">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-pink-500/20 
                flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] border 
                ${isHovered ? 'scale-110 rotate-[25deg] border-primary/40 shadow-[0_0_30px_rgba(168,85,247,0.3)]' : 'border-primary/20'}`}>
                <div className={`w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-pink-500 
                  ${isHovered ? 'animate-pulse' : ''}`} />
              </div>
            </div>
            
            {/* Links */}
            <div className="flex gap-3 relative z-50 pointer-events-auto">
              {githubUrl && (
                <a 
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-secondary/80 text-muted-foreground 
                    hover:text-primary hover:bg-primary/20 transition-all duration-300
                    hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]
                    cursor-pointer"
                  aria-label={`View ${title} on GitHub`}
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {liveUrl && (
                <a 
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-secondary/80 text-muted-foreground 
                    hover:text-primary hover:bg-primary/20 transition-all duration-300
                    hover:scale-110 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]
                    cursor-pointer"
                  aria-label={`View ${title} live`}
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Title with arrow */}
          {liveUrl ? (
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group/title relative z-50 inline-flex items-center gap-2 cursor-pointer pointer-events-auto mb-4"
            >
              <h3 className={`text-xl md:text-2xl font-bold transition-all duration-500
                ${isHovered ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500' : 'text-foreground'}`}>
                {title}
              </h3>
              <ArrowUpRight className={`w-6 h-6 transition-all duration-300 text-primary
                ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
            </a>
          ) : (
            <h3 className={`text-xl md:text-2xl font-bold mb-4 flex items-center gap-2 transition-all duration-500
              ${isHovered ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500' : 'text-foreground'}`}>
              {title}
              <ArrowUpRight className={`w-6 h-6 transition-all duration-300 text-primary
                ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
            </h3>
          )}
          
          {/* Description */}
          <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-muted-foreground/90 
            transition-colors duration-300 line-clamp-3">
            {description}
          </p>

          {/* Tags with staggered animation */}
          <div className="flex flex-wrap gap-2 pr-12">
            {tags.map((tag, tagIndex) => (
              <span 
                key={tag}
                className={`text-xs font-mono px-3 py-1.5 rounded-full transition-all duration-300
                  bg-gradient-to-r from-primary/10 to-pink-500/10
                  ${isHovered ? 'border-primary/40 text-primary shadow-[0_0_10px_rgba(168,85,247,0.1)] -translate-y-1' : 'border-primary/20 text-primary/80 translate-y-0'}`}
                style={{ 
                  transitionDelay: `${tagIndex * 50}ms`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>

      </TiltCard>
    </div>
  )
}
