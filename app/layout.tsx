import "../styles/globals.css"

import { ThemeProvider } from "components/theme-provider"
import { cn } from "lib/utils"
import { Viewport } from "next"
import { Inter as FontSans } from "next/font/google"
import { Footer } from "./footer"
import { Header } from "./header"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }: React.PropsWithChildren) {

  return (
    <html lang="en">
      <body className={cn(
        "relative min-h-screen bg-background bg-dot-black/[0.2] dark:bg-dot-white/[0.2] font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        >
          <div className="absolute -z-50 pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          <Header />
          <main className='pb-14'>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
