import _ from "lodash"
import z, { ZodFormattedError } from "zod"

type FormattedMessage<T> = {
  [K in keyof T]?: { _messages: string[] }
} & {
  _messages?: string[]
}

export type ActionState<T extends z.Schema> = {
  error?: ZodFormattedError<z.infer<T>>
  message?: FormattedMessage<z.infer<T>>
}

export function setActionError(message: string, state: ActionState<z.Schema> = {}, path?: string): ActionState<z.Schema> {
  path = path ? `message.${path}._messages` : "error._messages"
  return setStateValue(message, path, state)
}

export const setActionMessage = (message: string, state: ActionState<z.Schema> = {}, path?: string): ActionState<z.Schema> => {
  path = path ? `error.${path}._errors` : "error._errors"
  return setStateValue(message, path, state)
}

const setStateValue = (message: string, path: string, state: ActionState<z.Schema>): ActionState<z.Schema> => {
  _.set(state, path, [..._.get(state, path, []), message])
  return state
}

