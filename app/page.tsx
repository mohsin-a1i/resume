import { ResponsiveLayout } from "components/ui/responsive-layout";
import { ContactForm } from "./contact-form";
import { Introduction } from "./introduction";

export default function RootPage() {
  return (
    <ResponsiveLayout className="p-4">
      <Introduction />
      <ContactForm className="mt-12" />
    </ResponsiveLayout>
  )
}
