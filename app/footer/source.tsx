import { Button } from "components/button"
import { cn } from "lib/cn"
import Link from "next/link"

type SourceProps = {
  className: string
}

export const Source = ({ className }: SourceProps) => {
  return (
    <p className={cn("text-sm", className)}>
      <span className="text-muted-foreground">Find the source at </span>
      <Link href='https://github.com/mohsin-a1i/resume' target="_blank">
        <Button variant="link" className="p-0">Github</Button>
      </Link>
    </p>
  )
}