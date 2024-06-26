import { cn } from "lib/cn";
import dynamic from "next/dynamic";
import { Search } from "./search";
const SkillsGraph = dynamic(() => import("./graph"), { ssr: false })

interface SkillsProps {
  className?: string
}

export const Skills = async ({ className }: SkillsProps) => {
  return (
    <section id='skills' className={cn("m-auto max-w-xl p-6", className)}>
      <h3 className="text-2xl font-semibold tracking-tight">
        My Expertise
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">The many technologies I have worked with over the years</p>
      <Search
        className="mt-6"
        placeholders={[
          "Data scraping",
          "Spring framework",
          "Amazon web services",
          "Data engineering"
        ]}
      />
      <SkillsGraph className="mt-6" />
    </section>
  )
}
