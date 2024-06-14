"use client"

import { Action, FormControl, FormField, FormLabel, FormRoot, FormSubmit } from "components/ui/form"
import { Send } from "lucide-react"
import { email } from "./actions/email"

export const ContactForm = () => {

  return (
    <FormRoot className="mt-4 grid grid-cols-2 gap-4" action={email as Action}>
      <FormField name='name' className="col-span-1">
        <FormLabel>Name</FormLabel>
        <FormControl placeholder="Name" />
      </FormField>
      <FormField name='email' className="col-span-1">
        <FormLabel>Email Address</FormLabel>
        <FormControl placeholder="name@company.com" />
      </FormField>
      <FormField name='message' className="col-span-2">
        <FormLabel>Message</FormLabel>
        <FormControl asChild>
          <textarea rows={3} />
        </FormControl>
      </FormField>
      <FormSubmit className="col-span-2">
        <span>Send</span>
        <Send className="ml-2 h-4 w-4" />
      </FormSubmit>
    </FormRoot>
  )
}