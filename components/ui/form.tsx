"use client"

import * as FormPrimitive from "@radix-ui/react-form"
import { cn } from "lib/cn"
import React from "react"
import { Button, ButtonProps } from "./button"

export const FormRoot = FormPrimitive.Root

export const FormField = React.forwardRef<
  React.ElementRef<typeof FormPrimitive.Field>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Field>
>(({ className, children, ...props }, ref) => {
  return (
    <FormPrimitive.Field
      ref={ref}
      className={cn(
        "space-y-1",
        className
      )}
      {...props}
    >
      {children}
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
        "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-none file:bg-transparent file:text-sm file:py-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
        "text-sm text-muted-foreground",
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

