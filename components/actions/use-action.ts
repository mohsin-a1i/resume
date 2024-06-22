import { useCallback, useEffect, useState } from "react"
import { flushSync, useFormState } from "react-dom"
import z from "zod"
import { ActionState, ValidationErrors } from "./builder"

export type ActionStatus = "idle" | "executing" | "succeeded" | "errored"

type UseStateActionReturn<I extends z.Schema, D> = {
  execute: (input: FormData | z.infer<I>) => void
} & ({
  status: "idle"
  data: undefined,
  validationErrors: undefined
  serverError: undefined
} | {
  status: "executing"
  data?: D,
  validationErrors: undefined
  serverError: undefined
} | {
  status: "succeeded",
  data: D,
  validationErrors: undefined
  serverError: undefined
} | {
  status: "errored"
  data: undefined
  validationErrors: ValidationErrors
  serverError: undefined
} | {
  status: "errored"
  data: undefined
  validationErrors: undefined
  serverError: string
})

type Callbacks<I extends z.Schema, D> = {
  onExecute?: (input: z.infer<I>) => void
  onSuccess?: (data: D, input: z.infer<I>) => void
  onValidationError?: (error: ValidationErrors, input: z.infer<I>) => void
  onServerError?: (error: string, input: z.infer<I>) => void
}

export const useAction = <I extends z.Schema, D>(
  action: (state: ActionState<D>, input: FormData | z.infer<I>) => Promise<ActionState<D>>,
  { onExecute, onSuccess, onValidationError, onServerError }: Callbacks<I, D>
): UseStateActionReturn<I, D> => {
  const [state, stateAction] = useFormState<ActionState<D>, FormData>(action, {})
  const [status, setStatus] = useState<ActionStatus>("idle")
  const [input, setInput] = useState<z.infer<I>>()
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>()
  const [serverError, setServerError] = useState<string>()

  const execute = useCallback((input: FormData | z.infer<I>) => {
    flushSync(() => {
      setInput(input)
      setStatus("executing")
      setValidationErrors(undefined)
      setServerError(undefined)
      if (onExecute) onExecute(input)
    })
    stateAction(input)
  }, [onExecute, stateAction])

  useEffect(() => {
    if (status !== "executing") return

    const { data, validationErrors, serverError } = state
    if (validationErrors) {
      setValidationErrors(validationErrors)
      setStatus("errored")
      if (onValidationError) onValidationError(validationErrors, input)
    } else if (serverError) {
      setServerError(serverError)
      setStatus("errored")
      if (onServerError) onServerError(serverError, input)
    } else {
      setStatus("succeeded")
      if (onSuccess) onSuccess(data as D, input)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return {
    execute,
    status,
    data: state.data,
    validationErrors,
    serverError
  } as UseStateActionReturn<I, D>
}