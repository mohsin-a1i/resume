import { motion } from "framer-motion"
import { cn } from "lib/cn"

type ChatBubbleProps = {
  className?: string
  type?: "user" | "assistant" | "system" | "error"
}

export const MessageBubble = ({ className, type = "assistant", children }: React.PropsWithChildren<ChatBubbleProps>) => {
  return (
    <motion.div
      className={cn(
        "m-2 max-w-[80%] rounded-xl py-2 px-4 text-sm",
        type === "user" ? "self-end bg-primary text-primary-foreground rounded-br-none"
          : type === "error" ? "self-start bg-destructive text-destructive-foreground rounded-bl-none"
            : "self-start bg-card text-card-foreground border rounded-bl-none",
        className
      )}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      layout
    >
      {children}
    </motion.div>
  )
}