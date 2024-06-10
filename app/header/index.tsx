import { ResponsiveLayout } from "components/ui/responsive-layout";
import { DarkModeMenu } from "./dark-mode-menu";

export const Header = () => {
  return (
    <header className="sticky top-0 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <ResponsiveLayout className="p-2 flex">
        <DarkModeMenu className="ml-auto" />
      </ResponsiveLayout>
    </header>

  )
}