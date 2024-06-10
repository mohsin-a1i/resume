import { FlipSentences } from "components/ui/fllip-sentences";

export const Introduction = () => {
  return (
    <section className="text-center">
      <p className="text-muted-foreground leading-relaxed">This is</p>
      <h1 className="scroll-m-20 text-4xl font-extrabold leading-relaxed tracking-tight lg:text-5xl">
        Mohsin Ali
      </h1>
      <p className="leading-relaxed">
        <span className="text-muted-foreground">A full stack developer that has worked</span>
        <FlipSentences
          className="px-2 text-foreground"
          sentences={[
            'as a freelancer',
            'in startups',
            'in corporations'
          ]}
        />
      </p>
    </section>
  )
}