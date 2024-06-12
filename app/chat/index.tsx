import { PlaceholdersInputForm } from "components/ui/placeholders-input-form"
import { cn } from "lib/cn"

interface ChatProps {
  className?: string
}

export const Chat = ({ className }: ChatProps) => {
  return (
    <section id='chat' className={cn("m-auto max-w-lg p-6", className)}>
      <h3 className="text-2xl font-semibold tracking-tight">
        Digital Me
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">Want to ask something quick? Talk to a digital version of me</p>
      <div className="mt-4 flex flex-col">
        <div className="m-2 self-start bg-card border rounded-full py-2 px-4 text-sm">
          Hi! What would you like to know?
        </div>
        <div className="m-2 self-end bg-card border rounded-full py-2 px-4 text-sm">
          What is your name?
        </div>
      </div>
      <PlaceholdersInputForm
        className='mt-4'
        placeholders={[
          "Have you worked with Kafka?",
          "Do you speak spanish?",
          "How many years of expirence do you have?"
        ]}
      />
    </section>
  )
}