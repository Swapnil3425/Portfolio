"use client"

import { useState, useEffect } from "react"
import { Menu, X, Download } from "lucide-react"
import Image from "next/image"
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
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-500
        ${isScrolled 
          ? "bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-[0_4px_30px_rgba(0,0,0,0.3)]" 
          : "bg-transparent"
        }
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
      `}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-20 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          className="group relative text-xl font-bold text-foreground hover:text-primary transition-all duration-300"
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
          
          <li
            className={`ml-4 transition-all duration-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <MagneticButton 
              variant="outline" 
              size="sm"
              className="border-primary text-primary hover:bg-primary hover:text-white 
                transition-all duration-300 
                shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]
                flex items-center gap-2"
              asChild
            >
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4" />
                Resume
              </a>
            </MagneticButton>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative w-10 h-10 flex items-center justify-center
            text-foreground hover:text-primary transition-all duration-300
            rounded-lg hover:bg-primary/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="relative w-6 h-6">
            <X className={`w-6 h-6 absolute transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
            }`} />
            <Menu className={`w-6 h-6 absolute transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'
            }`} />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`
          md:hidden fixed inset-0 top-20 
          bg-background/95 backdrop-blur-xl
          transition-all duration-500 ease-out
          ${isMobileMenuOpen 
            ? "opacity-100 visible" 
            : "opacity-0 invisible pointer-events-none"
          }
        `}
      >
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/20 rounded-full blur-[80px] pointer-events-none" />

        <ul className="flex flex-col items-center justify-center h-full gap-8 relative z-10">
          {navItems.map((item, index) => (
            <li 
              key={item.href}
              className={`transition-all duration-500 ${
                isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms' }}
            >
              <a 
                href={item.href}
                className="text-2xl font-medium text-foreground hover:text-primary transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-primary font-mono text-sm">0{index + 1}.</span>{" "}
                {item.label}
              </a>
            </li>
          ))}
          <li
            className={`transition-all duration-500 ${
              isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? '400ms' : '0ms' }}
          >
            <MagneticButton 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white 
                transition-all duration-300 mt-4 text-lg px-8 py-4
                shadow-[0_0_20px_rgba(168,85,247,0.3)]"
              asChild
            >
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="w-5 h-5 mr-2" />
                Resume
              </a>
            </MagneticButton>
          </li>
        </ul>
      </div>
    </header>
  )
}
