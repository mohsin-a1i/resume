import { cn } from "lib/cn"
import { skills } from './data'

type SkillsCarouselProps = {
  className: string
}

export const SkillsGrid = ({ className }: SkillsCarouselProps) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {skills.map((skill) => (
        <div key={skill.id} className="border boder-border rounded-md px-6 p-3 flex flex-col items-center gap-2">
          <skill.icon className="w-14 h-14" />
          <p className="text-sm text-center">{skill.label}</p>
        </div>
      ))}
    </div>
  )
}