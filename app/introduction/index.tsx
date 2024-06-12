import { FlipSentences } from "components/ui/fllip-sentences";
import { cn } from "lib/cn";

interface IntroductionProps {
  className: string
}

export const Introduction = ({ className }: IntroductionProps) => {
  return (
    <section id='introduction' className={cn("py-24 px-6 text-center", className)}>
      <h1 className="text-4xl font-extrabold leading-relaxed tracking-tight lg:text-5xl">
        Mohsin Ali
      </h1>
      <p className="mt-1">
        A full stack developer that has worked
      </p>
      <FlipSentences
        className="block text-primary"
        sentences={[
          "as a freelancer",
          "in startups",
          "in corporations"
        ]}
      />
    </section>
  )
}