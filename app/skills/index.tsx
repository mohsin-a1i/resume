import { cn } from "lib/cn"
import { SearchIcon } from "lucide-react"
import { Bubbles } from "./bubbles"

interface SkillsProps {
  className?: string
}

export const Skills = ({ className }: SkillsProps) => {
  return (
    <section id='skills' className={cn("m-auto max-w-xl p-6", className)}>
      <h3 className="text-2xl font-semibold tracking-tight">
        My Expertise
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">The many technologies I have worked with over the years</p>
      <div className="mt-6 bg-background border border-input rounded-full ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 px-3 py-2 flex items-center gap-2">
        <SearchIcon className="w-4 h-4 text-muted-foreground" />
        <input
          className="w-full text-sm outline-none file:border-none file:bg-transparent file:text-sm file:py-0 placeholder:text-muted-foreground"
          placeholder="Search"
        />
      </div>
      <Bubbles />
    </section>
  )
}
