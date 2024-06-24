import { ActionStatus } from "components/actions/use-action"
import { Skeleton } from "components/skeleton"
import { motion } from "framer-motion"
import { cn } from "lib/cn"
import { CircleAlertIcon } from "lucide-react"
import { useEffect, useRef } from "react"
import { Message } from "../actions/chat"
import { MessageBubble } from "./bubble"

type ChatMessagesProps = {
  className: string
  messages: Message[]
  status: ActionStatus
}

export const ChatMessages = ({ className, messages, status }: ChatMessagesProps) => {
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = messagesRef.current as HTMLDivElement
    element.scrollTo(0, element.scrollHeight);
  }, [messages])

  return (
    <motion.div
      ref={messagesRef}
      className={cn("max-h-96 flex flex-col overflow-y-scroll", className)}
      layout
    >
      <MessageBubble>
        Hi! What would you like to know?
      </MessageBubble>
      {messages.map((message, index) => (
        <MessageBubble key={index} type={message.role}>
          {message.content}
        </MessageBubble>
      ))}
      {status === "executing" ? (
        <MessageBubble className="w-[70%] space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-[70%] h-4" />
        </MessageBubble>
      ) : status === "errored" ? (
        <MessageBubble className="flex items-center gap-2" type="error">
          <CircleAlertIcon className="w-4 h-4" />
          <span>Something went wrong</span>
        </MessageBubble>
      ) : null}
    </motion.div>
  )
}