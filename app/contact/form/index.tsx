"use client"

import { Button } from "components/button"
import { FormControl, FormField, FormLabel, FormRoot, FormSubmit } from "components/form"
import { LoadingSpinner } from "components/loading-spinner"
import { useToast } from "components/toasts/use-toast"
import { Send } from "lucide-react"
import { useCallback } from "react"
import { email } from "./actions/email"

export const ContactForm = () => {
  const { toast } = useToast()

  const onSuccess = useCallback(() => {
    toast({ description: "Thanks for reaching out. Will get back to you soon!" })
  }, [toast])

  return (
    <FormRoot
      className="mt-4 grid grid-cols-2 gap-4"
      action={email}
      onSuccess={onSuccess}
    >
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
          <textarea
            placeholder="I am looking for..."
            rows={3}
          />
        </FormControl>
      </FormField>
      <FormSubmit className="col-span-2">
        {(status) => (
          <Button>
            {status === "executing" ? (<>
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