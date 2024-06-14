import _ from "lodash"
import z, { ZodFormattedError } from "zod"

export type ActionState<T extends z.AnyZodObject> = {
  error?: ZodFormattedError<z.infer<T>>
  message?: string
}

export const setActionMessage = (message: string, state: ActionState<z.AnyZodObject> = {}): ActionState<z.AnyZodObject> => {
  state.message = message
  return state
}

export const setActionError = (message: string, state: ActionState<z.AnyZodObject> = {}, path?: string): ActionState<z.AnyZodObject> => {
  path = path ? `error.${path}._errors` : "error._errors"
  _.set(state, path, [..._.get(state, path, []), message])
  return state
}

