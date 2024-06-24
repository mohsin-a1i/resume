import { Button } from "components/button"
import Link from "next/link"

export const Source = () => {
  return (
    <p className="text-sm">
      <span className="text-muted-foreground">Find the source at </span>
      <Link href='https://github.com/mohsin-a1i/resume' target="_blank">
        <Button variant="link" className="p-0">Github</Button>
      </Link>
    </p>
  )
}