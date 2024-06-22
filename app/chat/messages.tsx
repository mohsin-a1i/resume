import { ActionStatus } from "components/actions/use-action"
import { Skeleton } from "components/skeleton"
import { motion } from "framer-motion"
import { cn } from "lib/cn"
import { CircleAlertIcon } from "lucide-react"
import { useEffect, useRef } from "react"
import { Message } from "./actions/chat"
import { ChatBubble } from "./bubble"

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
      <ChatBubble>
        Hi! What would you like to know?
      </ChatBubble>
      {messages.map((message, index) => (
        <ChatBubble key={index} type={message.role}>
          {message.content}
        </ChatBubble>
      ))}
      {status === "executing" ? (
        <ChatBubble className="w-[70%] space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-[70%] h-4" />
        </ChatBubble>
      ) : status === "errored" ? (
        <ChatBubble className="flex items-center gap-2" type="error">
          <CircleAlertIcon className="w-4 h-4" />
          <span>Something went wrong</span>
        </ChatBubble>
      ) : null}
    </motion.div>
  )
}