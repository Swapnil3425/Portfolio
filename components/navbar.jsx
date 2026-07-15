"use client"

import { useState, useEffect } from "react"
import { Menu, X, Download } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { MagneticButton } from "./magnetic-button"

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Track active section
      const sections = navItems.map(item => item.href.substring(1))
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section)
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-[100] 
        transition-all duration-500
        ${(isScrolled || isMobileMenuOpen) 
          ? "bg-background/90 backdrop-blur-2xl border-b border-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
          : "bg-transparent"
        }
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
      `}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-16 flex items-center justify-between relative z-[110]">
        {/* Logo */}
        <a 
          href="#" 
          className="group relative text-xl font-bold text-foreground hover:text-primary transition-all duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="relative z-10 flex items-center gap-2">
            <span className="text-primary font-mono">{"<"}</span>
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-primary/20 group-hover:border-primary/50 transition-all duration-300 transform group-hover:scale-110">
              <Image 
                src="/site-logo.png" 
                alt="Logo" 
                fill
                className="object-contain"
              />
            </div>
            <span className="text-primary font-mono">{"/>"}</span>
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-pink-500 
            group-hover:w-full transition-all duration-300" />
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => (
            <li 
              key={item.href}
              className={`transition-all duration-500 ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${100 + index * 100}ms` }}
            >
              <a 
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300
                  ${activeSection === item.href.substring(1) 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <span className="relative z-10 flex items-center gap-1">
                  <span className="text-primary font-mono text-xs">0{index + 1}.</span>
                  {item.label}
                </span>
                {activeSection === item.href.substring(1) && (
                  <span className="absolute inset-0 bg-primary/10 rounded-lg" />
                )}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-pink-500 
                  transition-all duration-300 rounded-full
                  ${activeSection === item.href.substring(1) ? 'w-1/2' : 'w-0 group-hover:w-1/2'}`} 
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative w-12 h-12 flex items-center justify-center
            text-foreground hover:text-primary transition-all duration-300
            rounded-xl hover:bg-primary/10 border border-transparent hover:border-primary/20"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="relative w-6 h-6">
            <X className={`w-6 h-6 absolute transition-all duration-500 ${
              isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
            }`} />
            <Menu className={`w-6 h-6 absolute transition-all duration-500 ${
              isMobileMenuOpen ? 'opacity-0 -rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
            }`} />
          </div>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-16 left-4 right-4 z-40 bg-card/98 backdrop-blur-xl border border-border/50 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <ul className="flex flex-col p-4 gap-2">
              {navItems.map((item, index) => (
                <li key={item.href}>
                  <a 
                    href={item.href}
                    className="flex items-center gap-3 p-4 rounded-xl hover:bg-primary/10 text-foreground transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-primary font-mono text-xs opacity-60">0{index + 1}.</span>
                    <span className="font-medium">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
