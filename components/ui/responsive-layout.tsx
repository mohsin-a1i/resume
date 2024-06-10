import * as React from "react"

import { cn } from "lib/utils"

interface ResponsiveLayoutProps {
  className?: string
}

export const ResponsiveLayout = ({ className, children }: React.PropsWithChildren<ResponsiveLayoutProps>) => {
  return (
    <div className={cn("m-auto w-full max-w-screen-lg", className)}>
      {children}
    </div>
  )
}