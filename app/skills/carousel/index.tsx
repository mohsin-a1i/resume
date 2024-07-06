import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "components/carousel"
import { skills } from './data'

type SkillsCarouselProps = {
  className: string
}

export const SkillsCarousel = ({ className }: SkillsCarouselProps) => {
  return (
    <Carousel className={className}>
      <CarouselContent className="space-x-2">
        {skills.map(skill => (
          <CarouselItem key={skill.id} className="basis-1/3 border boder-border rounded-md p-3 flex flex-col items-center gap-2">
            <skill.icon className="w-14 h-14" />
            <p className="text-sm">{skill.label}</p>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

  )
}