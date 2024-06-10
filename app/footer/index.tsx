import { Button } from "components/ui/button";
import { ResponsiveLayout } from "components/ui/responsive-layout";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="absolute w-full bottom-0 bg-background border-t border-border">
      <ResponsiveLayout className="p-2">
        <p className="text-sm">
          <span className="text-muted-foreground">You can find the source at </span>
          <Link href='https://github.com/mohsin-a1i/resume'>
            <Button variant="link" className="p-0">Github</Button>
          </Link>
        </p>
      </ResponsiveLayout>
    </footer>
  )
}