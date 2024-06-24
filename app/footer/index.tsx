import { Platforms } from "./platforms";
import { Source } from "./source";

export const Footer = () => {
  return (
    <footer className="absolute w-full bottom-0 bg-background border-t border-border">
      <div className="m-auto max-w-screen-lg px-6">
        <Platforms className="my-6" />
        <Source />
      </div>
    </footer>
  )
}