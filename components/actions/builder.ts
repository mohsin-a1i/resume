import { ZodError, z } from "zod"
import { errorMap } from "./error-map"

export type Action<I extends z.Schema, D = any> = (input: z.infer<I>, previousData: D) => Promise<D>

export type ValidationErrors = { _errors: string[] }

export type ActionState<D = any> = {
  data?: D,
  validationErrors?: ValidationErrors
  serverError?: string
}

export class ActionBuilder<I extends z.Schema, D = any> {
  private validationSchema?: I

  schema(schema: I) {
    this.validationSchema = schema
    return this
  }

  action(action: Action<I, D>) {
    return async (state: ActionState<D>, input: FormData) => {
      return this.execute(action, Object.fromEntries(input), state.data as D)
    }
  }

  private async execute(action: Action<I, D>, input: z.infer<I>, previousData: D): Promise<ActionState<D>> {
    try {
      if (this.validationSchema) this.validationSchema.parse(input, { errorMap })
      const data = await action(input, previousData)
      return { data }
    } catch (error) {
      if (error instanceof ZodError) return { validationErrors: error.format() }
      return { serverError: (error as Error).message }
    }
  }
}