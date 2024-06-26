"use client"

import { Placeholders } from "components/placeholders"
import { cn } from "lib/cn"
import { SearchIcon } from "lucide-react"
import { useState } from "react"

type SeachProps = {
  className: string
  placeholders: string[]
}

export const Search = ({ className, placeholders }: SeachProps) => {
  const [value, setValue] = useState<string>()

  return (
    <div className={cn("relative h-12 bg-background border border-input rounded-full ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 px-3 py-2 flex items-center gap-2", className)}>
      <SearchIcon className="w-4 h-4 text-muted-foreground" />
      <input
        className="w-full bg-transparent text-sm outline-none file:border-none file:bg-transparent file:text-sm file:py-0 placeholder:text-muted-foreground"
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="absolute inset-0 pointer-events-none pl-9 flex items-center">
        <Placeholders placeholders={placeholders} show={!value} />
      </div>
    </div>
  )
}