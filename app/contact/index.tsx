import { cn } from "lib/cn"
import { ContactForm } from "./form"

interface ContactProps {
  className?: string
}

export const Contact = ({ className }: ContactProps) => {
  return (
    <section id='contact' className={cn("m-auto max-w-xl p-6", className)}>
      <h3 className="text-2xl font-semibold tracking-tight">
        Lets Work Together
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">Send me a quick email and I&apos;ll get back to you as soon as I can</p>
      <ContactForm />
    </section>
  )
}
