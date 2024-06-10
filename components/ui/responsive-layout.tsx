import { cn } from "lib/utils"
import React from "react"

interface ResponsiveLayoutProps {
  className?: string
}

export function ResponsiveLayout({ className, children }: React.PropsWithChildren<ResponsiveLayoutProps>) {
  return (
    <div className='p-4 flex justify-center'>
      <div className={cn("w-full max-w-screen-lg", className)}>
        {children}
      </div>
    </div>
  )
}