import '../styles/globals.css'

import { ThemeProvider } from "components/theme-provider"
import { cn } from 'lib/utils'
import { Viewport } from 'next'
import { Inter as FontSans } from "next/font/google"
import { Footer } from './footer'
import { Header } from './header'

export const viewport: Viewport = {
  width: 'device-width',
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
        "relative min-h-screen font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Header />
          <main className='pb-24'>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
