import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains-mono'
});

export const metadata = {
  title: 'Swapnil Gandhale | Full Stack Developer',
  description: 'Full stack developer crafting digital experiences with modern technologies',
  icons: {
    icon: '/site-logo.png',
    apple: '/site-logo.png',
  },
}

import { LoadingProvider } from "@/components/LoadingProvider"
import { Navbar } from "@/components/navbar"
import { ParticleField } from "@/components/particle-field"
import GlobalFixed from "@/components/GlobalFixed"
import { CustomCursor } from "@/components/cursor"

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Fixed global elements — completely outside any layout wrappers so they stay truly fixed to the viewport */}
          <ParticleField />
          <GlobalFixed />
          <CustomCursor />
          <Navbar />

          <LoadingProvider>
            {children}
            <Toaster />
          </LoadingProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
