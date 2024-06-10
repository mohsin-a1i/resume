import { Viewport } from 'next'
import { ReactNode } from 'react'
import '../styles/global.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

interface RootLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: RootLayoutProps) {
 
  return (
    <html lang="en" className='dark'>
      <body className=''>
        {children}
      </body>
    </html>
  )
}