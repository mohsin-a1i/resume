import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { Textarea } from "components/ui/textarea"
import { cn } from "lib/utils"
import { Send } from "lucide-react"

interface ContactProps {
  className?: string
}

export const Contact = ({ className }: ContactProps) => {
  return (
    <section id='contact' className={cn("m-auto max-w-lg p-6", className)}>
      <h3 className="text-2xl font-semibold tracking-tight">
        Lets work together
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">Shoot me a quick email and I&apos;ll get back to you as soon as I can</p>
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
