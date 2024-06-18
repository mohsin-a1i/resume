"use client"

import { Button } from "components/ui/button"
import { FormControl, FormField, FormLabel, FormMessage, FormRoot, FormSubmit } from "components/ui/form"
import { LoadingSpinner } from "components/ui/loading-spinner"
import { Send } from "lucide-react"
import { email } from "./actions/email"

export const ContactForm = () => {
  return (
    <FormRoot className="mt-4 grid grid-cols-2 gap-4" action={email}>
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
        <FormMessage>
          A brief introduction of yourself
        </FormMessage>
      </FormField>
      <FormSubmit className="col-span-2">
        {(pending) => (
          <Button>
            {pending ? (<>
              <LoadingSpinner className='mr-2 h-4 w-4' />
              <span>Sending</span>
            </>) : (<>
              <span>Send</span>
              <Send className="ml-2 h-4 w-4" />
            </>)}
          </Button>
        )}
      </FormSubmit>
    </FormRoot>
  )
}