"use client"

import { ActionState } from "lib/actions"
import { useEffect, useRef } from "react"
import { useFormState } from "react-dom"
import z from "zod"

type ServerAction<T> = (state: T, payload: FormData) => Promise<T>

interface UseFormOptions {
  defaultData?: Record<string, unknown>
  clearOnSumbit?: boolean
}

export function useForm<T extends ActionState<z.Schema>>(serverAction: ServerAction<T>, options?: UseFormOptions) {
  const ref = useRef<HTMLFormElement>(null)
  const [{ message, error }, action] = useFormState(serverAction, {} as Awaited<T>)

  useEffect(() => {
    const form = ref.current
    if (!form) return

    if (!options?.defaultData) return

    for (const [name, value] of Object.entries(options?.defaultData)) {
      const input = form.elements.namedItem(name) as HTMLInputElement
      if (!input) continue
      input.value = value as string
    }
  }, [options?.defaultData])

  useEffect(() => {
    const form = ref.current
    if (!form) return

    if (options?.clearOnSumbit === false) return

    if (message) form.reset()
  }, [message, options?.clearOnSumbit])

  return { ref, action, error: error as T["error"] }
}