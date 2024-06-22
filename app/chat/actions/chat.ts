"use server"

import { ActionBuilder } from "components/actions/builder"
import z from "zod"

export type Message = {
  role: "system" | "assistant" | "user"
  content: string
}

const chatSchema = z.object({
  message: z.string()
})

export const chat = new ActionBuilder<typeof chatSchema, Message>()
  .schema(chatSchema)
  .action(async ({ message }) => {
    await new Promise(resolve => setTimeout(resolve, 8000))
    return { role: "assistant", content: message }
  })