"use client"

import * as FormPrimitive from "@radix-ui/react-form"
import { ActionState } from "components/actions/builder"
import { ActionStatus, useAction } from "components/actions/use-action"
import { cn } from "lib/cn"
import _ from "lodash"
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react"
import { useToast } from "./toasts/use-toast"

type FormContext = { status: ActionStatus, error?: { _errors: string[] } }
const FormContext = createContext<FormContext>({ status: "idle" })
export const useForm = () => useContext(FormContext)

type FormRootProps = {
  defaultData?: Record<string, any>
  onSuccess: (data: any) => void
  action: (state: ActionState, payload: FormData) => Promise<ActionState>,
} & Omit<React.ComponentPropsWithoutRef<typeof FormPrimitive.Root>, "action">

export const FormRoot = (({ className, action, defaultData, onSuccess, children, ...props }: FormRootProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const { toast } = useToast()

  const { execute, status, validationErrors } = useAction(action, {
    onSuccess: (data) => {
      formRef.current?.reset()
      onSuccess(data)
    },
    onServerError: (serverError) => {
      toast({ title: "Error", description: serverError, variant: "destructive" })
    }
  })

  useEffect(() => {
    if (!defaultData) return

    for (const [name, value] of Object.entries(defaultData)) {
      const input = formRef.current?.elements.namedItem(name)
      if (!input) continue
      (input as HTMLInputElement).value = value
    }
  }, [defaultData])

  return (
    <FormContext.Provider value={{ status, error: validationErrors }}>
      <FormPrimitive.Root
        ref={formRef}
        className={className}
        action={execute}
        {...props}
      >
        {children}
      </FormPrimitive.Root>
    </FormContext.Provider>
  )
})

export const FormField = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Field>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Field>
>(({ className, name, serverInvalid, children, ...props }, ref) => {
  const { error } = useForm()
  const errors = useMemo(() => _.get(error, name)?._errors, [error, name])

  const setErrorMessage = useCallback((children: ReactNode) => {
    const childrenWithErrorMessage: ReactNode[] = []

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === FormMessage) return
      return childrenWithErrorMessage.push(child)
    })

    childrenWithErrorMessage.push(
      <FormMessage key="error">
        {errors?.[0]}
      </FormMessage>
    )

    return childrenWithErrorMessage
  }, [errors])

  return (
    <FormPrimitive.Field
      ref={ref}
      className={cn(
        "group space-y-1",
        className
      )}
      name={name}
      serverInvalid={serverInvalid || !!errors}
      {...props}
    >
      {errors ? setErrorMessage(children) : children}
    </FormPrimitive.Field>
  )
})
FormField.displayName = FormPrimitive.Field.displayName

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Label>
>(({ className, children, ...props }, ref) => {
  return (
    <FormPrimitive.Label
      ref={ref}
      className={cn(
        "text-sm",
        className
      )}
      {...props}
    >
      {children}
    </FormPrimitive.Label>
  )
})
FormLabel.displayName = FormPrimitive.Label.displayName

export const FormControl = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Control>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Control>
>(({ className, children, ...props }, ref) => {
  return (
    <FormPrimitive.Control
      ref={ref}
      className={cn(
        "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-none file:bg-transparent file:text-sm file:py-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[invalid]:border-destructive data-[invalid]:focus-visible:ring-destructive",
        className
      )}
      {...props}
    >
      {children}
    </FormPrimitive.Control>
  )
})
FormControl.displayName = FormPrimitive.Control.displayName

export const FormMessage = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Message>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Message>
>(({ className, children, ...props }, ref) => {
  return (
    <FormPrimitive.Message
      ref={ref}
      className={cn(
        "block text-sm text-muted-foreground group-data-[invalid]:text-destructive",
        className
      )}
      {...props}
    >
      {children}
    </FormPrimitive.Message>
  )
})
FormMessage.displayName = FormPrimitive.Message.displayName

export const FormValidityState = FormPrimitive.ValidityState

type FormSubmitProps = {
  children: (pending: ActionStatus) => ReactNode
} & Omit<React.ComponentPropsWithoutRef<typeof FormPrimitive.Submit>, "children">

export const FormSubmit = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Submit>,
  FormSubmitProps
>(({ className, children, ...props }, ref) => {
  const { status } = useForm()

  return (
    <FormPrimitive.Submit
      ref={ref}
      className={className}
      disabled={status === "executing"}
      {...props}
      asChild
    >
      {children(status)}
    </FormPrimitive.Submit>
  )
})
FormSubmit.displayName = FormPrimitive.Submit.displayName

