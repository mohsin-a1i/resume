"use server"

import { ActionState, setActionError, setActionMessage } from "lib/actions"
import { errorMap } from "lib/zod/error-map"
import z from "zod"

const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(["assistant", "user"]),
    content: z.string()
  }))
})

export async function chat(currentState: ActionState<typeof chatSchema>, actionData: FormData): Promise<ActionState<typeof chatSchema>> {
  const { success, data, error } = chatSchema.safeParse(Object.fromEntries(actionData), { errorMap })
  if (!success) return { error: error.format() }
  const { messages } = data

  try {
    console.log("Generating chat message")
    await new Promise(resolve => setTimeout(resolve, 4000))
    return setActionMessage("Hi")
  } catch (error) {
    return setActionError((error as Error).message)
  }
}