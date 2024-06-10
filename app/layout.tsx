import '../styles/globals.css'

import { ThemeProvider } from "components/theme-provider"
import { Viewport } from 'next'
import { Header } from './header'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default function RootLayout({ children }: React.PropsWithChildren) {
 
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Header/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}