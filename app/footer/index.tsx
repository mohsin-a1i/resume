import { PlatformLinks } from "./platform-links";
import { SourceLink } from "./source-link";

export const Footer = () => {
  return (
    <footer className="absolute w-full bottom-0 bg-background border-t border-border">
      <div className="m-auto max-w-screen-lg px-6">
        <PlatformLinks className="my-6" />
        <SourceLink />
      </div>
    </footer>
  )
}