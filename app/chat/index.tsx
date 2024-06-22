"use client"

import { Form } from "@radix-ui/react-form"
import { useAction } from "components/actions/use-action"
import { ChatInput } from "components/ui/chat-input"
import { cn } from "lib/cn"
import { FormEvent, useState } from "react"
import { Message, chat } from "./actions/chat"

interface ChatProps {
  className?: string
}

export const Chat = ({ className }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const { execute } = useAction(chat, {
    onSuccess: (message) => {
      setMessages(messages => [...messages.slice(0, -1), message])
    }
  })

  return (
    <section id='chat' className={cn("m-auto max-w-xl p-6", className)}>
      <h3 className="text-2xl font-semibold tracking-tight">
        Digital Me
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">Want to ask something quick? Talk to a digital version of me</p>
      <div className="mt-4 flex flex-col">
        <div className="m-2 self-start bg-card border rounded-full rounded-bl-none py-2 px-4 text-sm">
          Hi! What would you like to know?
        </div>
        {messages.map((message, index) => (
          <div key={index} className={cn(
            "m-2 self-end bg-card border rounded-full py-2 px-4 text-sm",
            message.role === "user" ? "self-end rounded-br-none" : "self-start rounded-bl-none"
          )}>
            {message.content}
          </div>
        ))}
      </div>
      <Form
        onSubmit={(event: FormEvent) => {
          const formData = new FormData(event.target as HTMLFormElement)

          const message = { role: "user", content: formData.get("message") } as Message
          const assistantMessage = { role: "assistant", content: "..." } as Message
          setMessages(messages => [...messages, message, assistantMessage])

          execute(formData)
        }}
      >
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