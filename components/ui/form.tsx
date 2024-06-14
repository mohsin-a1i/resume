"use client"

import * as FormPrimitive from "@radix-ui/react-form"
import { ActionState } from "lib/actions"
import { cn } from "lib/cn"
import _ from "lodash"
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react"
import { useFormState } from "react-dom"
import { ZodFormattedError, z } from "zod"
import { Button, ButtonProps } from "./button"
import { useToast } from "./use-toast"

type FormContext = { error?: ZodFormattedError<z.infer<z.AnyZodObject>> }
const FormContext = createContext<FormContext>({})
export const useForm = () => useContext(FormContext)

export type Action = Parameters<typeof useFormState<ActionState<z.AnyZodObject>>>[0]

type FormProps = {
  defaultData?: Record<string, any>
  action: Action
} & React.ComponentPropsWithoutRef<typeof FormPrimitive.Root>

export const FormRoot = (({ className, action, defaultData, children, ...props }: FormProps) => {
  const ref = useRef<HTMLFormElement>(null)
  const [state, formAction] = useFormState<ActionState<z.AnyZodObject>>(action, {})
  const { message, error } = state
  const { toast } = useToast()

  useEffect(() => {
    const form = ref.current
    if (!form) return
    if (!defaultData) return

    for (const [name, value] of Object.entries(defaultData)) {
      const input = form.elements.namedItem(name) as HTMLInputElement
      if (!input) continue
      input.value = value
    }
  }, [defaultData])

  useEffect(() => {
    const form = ref.current
    if (!form) return
    if (!message) return

    toast({ description: message })
    form.reset()
  }, [message, toast])

  useEffect(() => {
    const actionError = state.error?._errors?.[0]
    if (!actionError) return

    toast({ title: "Error", description: actionError, variant: "destructive" })
  }, [state, toast])

  return (
    <FormContext.Provider value={{ error }}>
      <FormPrimitive.Root
        ref={ref}
        className={className}
        action={formAction}
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

export const FormSubmit = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Submit>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Submit> & ButtonProps
>(({ className, children, ...props }, ref) => {
  return (
    <FormPrimitive.Submit
      ref={ref}
      className={className}
      {...props}
      asChild
    >
      <Button>
        {children}
      </Button>
    </FormPrimitive.Submit>
  )
})
FormSubmit.displayName = FormPrimitive.Submit.displayName

