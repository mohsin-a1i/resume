"use client"

import { Form } from "@radix-ui/react-form"
import { ChatInput } from "components/ui/chat-input"
import { cn } from "lib/cn"
import { useState } from "react"
import { useFormState } from "react-dom"
import { chat } from "./actions/chat"

interface ChatProps {
  className?: string
}

interface Message {
  role: "system" | "assistant" | "user"
  content: string
}

export const Chat = ({ className }: ChatProps) => {
  const [state, action] = useFormState(chat, {})
  const [messages, setMessages] = useState<Message[]>([])

  return (
    <section id='chat' className={cn("m-auto max-w-xl p-6", className)}>
      <h3 className="text-2xl font-semibold tracking-tight">
        Digital Me
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">Want to ask something quick? Talk to a digital version of me</p>
      <div className="mt-4 flex flex-col">
        <div className="m-2 self-start bg-card border rounded-full py-2 px-4 text-sm">
          Hi! What would you like to know?
        </div>
        {messages.map((message, index) => (
          <div key={index} className={cn(
            "m-2 self-end bg-card border rounded-full py-2 px-4 text-sm",
            message.role === "user" ? "self-end" : "self-start"
          )}>
            {message.content}
          </div>
        ))}
      </div>
      <Form action={action}>

        <ChatInput
          className='mt-4'
          name="message"
          placeholders={[
            "Have you worked with Kafka?",
            "Do you speak spanish?",
            "How many years of expirence do you have?"
          ]}
        />
      </Form>
    </section>
  )
}