import { DiscordIcon } from "components/icons/discord";
import { GithubIcon } from "components/icons/github";
import { LinkedInIcon } from "components/icons/linkedin";
import { StackOverFlowIcon } from "components/icons/stackoverflow";
import { cn } from "lib/cn";
import { PlatformLink } from "./link";

type PlatformLinksProps = {
  className?: string
}

export const Platforms = ({ className }: PlatformLinksProps) => {
  return (
    <div className={cn("flex gap-2", className)}>
      <PlatformLink href='https://github.com/mohsin-a1i'>
        <GithubIcon className="h-4 w-4" />
      </PlatformLink>
      <PlatformLink href='https://linkedin.com/in/mohsina1i'>
        <LinkedInIcon className="h-4 w-4" />
      </PlatformLink>
      <PlatformLink href="https://stackoverflow.com/users/5286038/mohsin-ali'">
        <StackOverFlowIcon className="h-4 w-4" />
      </PlatformLink>
      <PlatformLink href="https://discord.com/users/456154510587592705">
        <DiscordIcon className="h-4 w-4" />
      </PlatformLink>
    </div>
  )
}