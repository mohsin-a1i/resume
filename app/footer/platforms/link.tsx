import { Button } from "components/button"
import Link from "next/link"

type PlatformLinkProps = {
  href: string
}

export const PlatformLink = ({ href, children }: React.PropsWithChildren<PlatformLinkProps>) => {
  return (
    <Link href={href} target="_blank">
      <Button
        variant="outline"
        size="icon"
      >
        {children}
      </Button>
    </Link>
  )
}