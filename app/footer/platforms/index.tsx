import { DiscordIcon } from "components/icons/discord";
import { GithubIcon } from "components/icons/github";
import { LinkedInIcon } from "components/icons/linkedin";
import { StackOverFlowIcon } from "components/icons/stackoverflow";
import { PlatformLink } from "./link";

type PlatformLinksProps = {
  className: string
}

export const Platforms = ({ className }: PlatformLinksProps) => {
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold tracking-tight">
        Other Platforms
      </h3>
      <p className="text-sm text-muted-foreground">
        Discover me elsewhere
      </p>
      <div className="mt-4 flex gap-2">
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
    </div>
  )
}