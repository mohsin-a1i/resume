import { cn } from "lib/cn"
import { skills } from './data'

type SkillsCarouselProps = {
  className: string
}

export const SkillsGrid = ({ className }: SkillsCarouselProps) => {
  return (
    <div className={cn("flex gap-2 overflow-y-scroll", className)}>
      {Object.entries(skills).map(([key, skills]) => (
        <div key={key} className="w-1/3 md:w-1/4 shrink-0 pb-4 flex flex-col gap-2">
          {skills.map((skill) => (
            <div key={skill.id} className="border boder-border rounded-md p-3 flex flex-col items-center gap-2">
              <skill.icon className="w-14 h-14" />
              <p className="text-sm text-center">{skill.label}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}