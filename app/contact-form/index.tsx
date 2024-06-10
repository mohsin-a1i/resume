import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { Textarea } from "components/ui/textarea"
import { cn } from "lib/utils"
import { Send } from "lucide-react"

interface ContactFormProps {
  className?: string
}

export const ContactForm = ({ className }: ContactFormProps) => {
  return (
    <section className={cn("m-auto max-w-md", className)}>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Lets work together
      </h3>
      <p className="text-sm text-muted-foreground">Shoot me a quick email and I'll get back to you as soon as I can</p>
      <form className="mt-4 grid grid-cols-2 gap-4">
        <div className="col-span-1 space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id='name' placeholder="Name" />
        </div>
        <div className="col-span-1 space-y-1">
          <Label htmlFor="email">Email Address</Label>
          <Input id='email' placeholder="name@company.com" />
        </div>
        <div className="col-span-2 space-y-1">
          <Label htmlFor="message">Message</Label>
          <Textarea id='message' placeholder="What should we work on?" />
        </div>
        <Button className="col-span-2" type="submit">
          <span>Send</span>
          <Send className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </section>
  )
}
