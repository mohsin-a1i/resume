import _ from "lodash"
import z, { ZodFormattedError } from "zod"

export type ActionState<T extends z.Schema = z.AnyZodObject> = {
  error?: ZodFormattedError<z.infer<T>>
  message?: string
}

export const setActionMessage = (message: string, state: ActionState<z.Schema> = {}): ActionState<z.Schema> => {
  state.message = message
  return state
}

export const setActionError = (message: string, state: ActionState<z.Schema> = {}, path?: string): ActionState<z.Schema> => {
  path = path ? `error.${path}._errors` : "error._errors"
  _.set(state, path, [..._.get(state, path, []), message])
  return state
}

