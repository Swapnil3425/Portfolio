"use client"

import { useEffect, useRef, useState } from "react"
import { Github, Linkedin, Mail, Twitter, Send, MapPin, Sparkles, Loader2 } from "lucide-react"
import { MagneticButton } from "./magnetic-button"
import { sendEmail } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"
import { AnimatedItem } from "./AnimatedSection"
import { motion } from "framer-motion"

function SocialLink({ href, icon: Icon, label, color }) {
  const [isHovered, setIsHovered] = useState(false)
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 })
  }

  const handleMouseReset = () => {
    setPosition({ x: 0, y: 0 })
    setIsHovered(false)
  }
  
  return (
    <motion.a 
      ref={buttonRef}
      href={href} 
      target={href.startsWith('mailto') ? undefined : "_blank"}
      rel={href.startsWith('mailto') ? undefined : "noopener noreferrer"}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseReset}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      className={`group relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl 
        bg-secondary/30 border transition-all duration-300
        ${isHovered ? 'border-transparent shadow-lg ' + color : 'border-border text-muted-foreground'}`}
      aria-label={label}
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        willChange: 'transform'
      }}
    >
      <Icon className={`w-6 h-6 md:w-7 md:h-7 transition-all duration-500 z-10 
        ${isHovered ? 'scale-110 text-white' : ''}`} />
      
      {/* Label Tooltip */}
      <span className={`absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs transition-all duration-500 whitespace-nowrap font-mono tracking-wider
        ${isHovered ? 'opacity-100 -bottom-8 text-primary' : 'opacity-0 scale-90 translate-y-2'}`}>
        {label}
      </span>

      {/* Background Glow on Hover */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-500
        ${isHovered ? 'opacity-20' : ''} ${color.replace('hover:text-white', '').replace('hover:', '')}`} />
    </motion.a>
  )
}


export function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })
  const [emailError, setEmailError] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [formHovered, setFormHovered] = useState(false)
  const { toast } = useToast()

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return "Email is required"
    if (!regex.test(email)) return "Please enter a valid email (e.g., name@example.com)"
    return ""
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate email
    const error = validateEmail(formState.email)
    if (error) {
      setEmailError(error)
      return
    }

    setIsSending(true)
    setEmailError("") // Clear error if validation passes

    try {
      const formData = new FormData()
      formData.append("name", formState.name)
      formData.append("email", formState.email)
      formData.append("message", formState.message)

      const result = await sendEmail(formData)

      if (result.success) {
        toast({
          title: result.mock ? "Message Logged (Mock Mode)" : "Message Sent!",
          description: result.mock 
            ? "Since no API key is set, your message was logged to the console." 
            : "Thanks for reaching out! I'll get back to you soon.",
          variant: "default",
        })
        setFormState({ name: "", email: "", message: "" })
      } else {
        // If Resend specifically complains about the email address format
        if (result.error?.toLowerCase().includes("email") || result.error?.toLowerCase().includes("reply_to")) {
           setEmailError(result.error)
        } else {
          toast({
            title: "Error",
            description: result.error || "Something went wrong. Please try again.",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  const socialLinks = [
    { href: "https://github.com/Swapnil3425", icon: Github, label: "GitHub", color: "hover:text-white hover:bg-[#333]" },
    { href: "https://linkedin.com/in/swapnil3425", icon: Linkedin, label: "LinkedIn", color: "hover:text-white hover:bg-[#0A66C2]" },
    { href: "mailto:swapnilg8682@gmail.com", icon: Mail, label: "Email", color: "hover:text-white hover:bg-[#EA4335]" }
  ]

  return (
    <section 
      id="contact" 
      className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
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
          <div className="text-center mb-16">
            <AnimatedItem className="inline-flex items-center gap-2 text-primary font-mono text-sm mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4" />
              04. What&apos;s Next?
            </AnimatedItem>
            
            <AnimatedItem>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
                Let&apos;s Build{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-pink-500 to-primary 
                  bg-[length:200%_100%] animate-gradient">
                  Something Amazing
                </span>
              </h2>
            </AnimatedItem>
            
            <AnimatedItem>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                I&apos;m always excited to connect with fellow developers, potential collaborators, 
                and anyone with a cool project idea. Drop me a message!
              </p>
            </AnimatedItem>
          </div>

          {/* Contact form */}
          <AnimatedItem>
            <div 
              onMouseEnter={() => setFormHovered(true)}
              onMouseLeave={() => setFormHovered(false)}
              className={`bg-card/50 backdrop-blur-sm rounded-2xl border p-8 md:p-12 transition-all duration-700
                ${formHovered ? 'border-primary/30 shadow-[0_0_60px_rgba(168,85,247,0.1)] scale-[1.01]' : 'border-border scale-100'}`}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      disabled={isSending}
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border
                        text-foreground placeholder:text-muted-foreground
                        focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                        transition-all duration-300 disabled:opacity-50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        required
                        disabled={isSending}
                        value={formState.email}
                        onBlur={() => {
                          if (formState.email) {
                            const error = validateEmail(formState.email)
                            setEmailError(error)
                          }
                        }}
                        onChange={(e) => {
                          setFormState({ ...formState, email: e.target.value })
                          if (emailError) setEmailError("")
                        }}
                        className={`w-full px-4 py-3 rounded-xl bg-secondary/50 border 
                          text-foreground placeholder:text-muted-foreground
                          focus:outline-none focus:ring-2 transition-all duration-300 disabled:opacity-50
                          ${emailError 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-border focus:border-primary focus:ring-primary/20'}`}
                        placeholder="john@example.com"
                      />
                      {emailError && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-6 left-0 text-[10px] md:text-xs font-medium text-red-500 font-mono"
                        >
                          {emailError}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    disabled={isSending}
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border
                      text-foreground placeholder:text-muted-foreground resize-none
                      focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                      transition-all duration-300 disabled:opacity-50"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Maharashtra, India</span>
                  </div>
                  
                  <MagneticButton
                    type="submit"
                    disabled={isSending}
                    variant="default"
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-primary to-pink-500 
                      hover:from-primary/90 hover:to-pink-500/90
                      text-white px-8 py-6 text-base font-medium rounded-xl
                      shadow-[0_0_30px_rgba(168,85,247,0.3)] 
                      hover:shadow-[0_0_50px_rgba(168,85,247,0.5)]
                      transition-all duration-500 group disabled:opacity-70 disabled:cursor-not-allowed"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <span className="flex items-center gap-2">
                      {isSending ? (
                        <>
                          Sending...
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className={`w-4 h-4 transition-transform duration-300 ${
                            isHovered ? 'translate-x-1 -translate-y-1' : ''
                          }`} />
                        </>
                      )}
                    </span>
                  </MagneticButton>
                </div>
              </form>
            </div>
          </AnimatedItem>

          {/* Social links */}
          <div className="flex flex-col items-center gap-8 mt-16">
            <AnimatedItem>
              <p className="text-muted-foreground text-sm">Or find me on</p>
            </AnimatedItem>
            
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
               className="flex items-center gap-4"
            >
              {socialLinks.map((link) => (
                <AnimatedItem key={link.label}>
                  <SocialLink {...link} />
                </AnimatedItem>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

