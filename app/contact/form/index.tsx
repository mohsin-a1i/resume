"use client"

import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { Textarea } from "components/ui/textarea"
import { useForm } from "components/use-form"
import { Send } from "lucide-react"
import { email } from "./actions/email"

export const ContactForm = () => {
  const { ref, action, error } = useForm(email)

  return (
    <form ref={ref} action={action} className="mt-4 grid grid-cols-2 gap-4">
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
  )
}