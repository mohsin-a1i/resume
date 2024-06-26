"use client"

import { Form } from "@radix-ui/react-form"
import { useAction } from "components/actions/use-action"
import { cn } from "lib/cn"
import { useRef, useState } from "react"
import { Message, chat } from "./actions/chat"
import { ChatInput, ChatInputRef } from "./input"
import { ChatMessages } from "./messages"

interface ChatProps {
  className?: string
}

export const Chat = ({ className }: ChatProps) => {
  const inputRef = useRef<ChatInputRef>(null)
  const [messages, setMessages] = useState<Message[]>([])

  const { execute, status } = useAction(chat, {
    onExecute: (messages: Message[]) => {
      setMessages(messages)
      inputRef.current?.clear()
    },
    onSuccess: (message) => {
      setMessages(messages => [...messages, message])
    }
  })

  return (
    <section id='chat' className={cn("m-auto max-w-xl p-6", className)}>
      <h3 className="text-2xl font-semibold tracking-tight">
        Talk To Digital Me
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">Want to ask something quick? Talk to a digital version of me</p>
      <ChatMessages
        className="mt-4"
        messages={messages}
        status={status}
      />
      <Form action={(formData) => {
        const message = { role: "user", content: formData.get("message") } as Message
        const previousMessages = status === "errored" ? messages.slice(0, -1) : messages
        execute([...previousMessages, message])
      }}>
        <ChatInput
          ref={inputRef}
          className='mt-4'
          name="message"
          placeholders={[
            "Where do you currently work?",
            "Do you speak Urdu?",
            "How many years of expirence do you have?",
            "What was your last role?"
          ]}
          status={status}
        />
      </Form>
    </section>
  )
}