import { cn } from "lib/utils"
import React from "react"

interface ResponsiveLayoutProps {
  className?: string
}

export function ResponsiveLayout({ className, children }: React.PropsWithChildren<ResponsiveLayoutProps>) {
  return (
    <div className={cn("m-auto w-full max-w-screen-lg", className)}>
      {children}
    </div>
  )
}