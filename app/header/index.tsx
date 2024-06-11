import { Navigation } from "./navigation"
import { ThemeButton } from "./theme-button"

export const Header = () => {
  return (
    <header className="sticky top-0 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="m-auto max-w-screen-lg p-2 flex items-center">
        <Navigation />
        <ThemeButton className="ml-auto" />
      </div>
    </header>

  )
}