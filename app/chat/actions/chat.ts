"use server"

import { ActionBuilder } from "components/actions/builder"
import z from "zod"


export type Message = z.infer<typeof messageSchema>

const messageSchema = z.object({
  role: z.enum(["system", "assistant", "user"]),
  content: z.string()
})
const chatSchema = z.array(messageSchema)

export const chat = new ActionBuilder<typeof chatSchema, Message>()
  .schema(chatSchema)
  .action(async (messages) => {
    await new Promise(resolve => setTimeout(resolve, 3000))
    return { role: "assistant", content: "Sorry I cant help you with that" }
  })