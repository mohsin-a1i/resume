import { Button } from "components/button";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import Link from "next/link";

type PlatformLinksProps = {
  className: string
}

export const PlatformLinks = ({ className }: PlatformLinksProps) => {
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold tracking-tight">
        Other Platforms
      </h3>
      <p className="text-sm text-muted-foreground">
        Discover me elsewhere
      </p>
      <div className="mt-4 space-x-2">
        <Link href='https://github.com/mohsin-a1i' target="_blank">
          <Button
            variant="outline"
            size="icon"
          >
            <GithubIcon className="h-4 w-4" />
          </Button>
        </Link>
        <Link href='https://linkedin.com/in/mohsina1i' target="_blank">
          <Button
            variant="outline"
            size="icon"
          >
            <LinkedinIcon className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}