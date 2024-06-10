import { ResponsiveLayout } from "components/ui/responsive-layout";
import { DarkModeMenu } from "./dark-mode-menu";

export function Header() {
  return (
    <ResponsiveLayout>
      <DarkModeMenu className="float-end"/>
    </ResponsiveLayout>
  )
}