import { Platforms } from "app/platforms"
import { buttonVariants } from "components/button"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger
} from "components/drawer"
import { cn } from "lib/cn"
import { MenuIcon } from "lucide-react"
import { DrawerNavigationDesctiption, DrawerNavigationHeading, DrawerNavigationLink, NavigationLink } from "./link"
import { Logo } from "./logo"


export const Navigation = () => {
  return (
    <>
      <Drawer
        noBodyStyles={true}
        shouldScaleBackground={false}
        disablePreventScroll={true}
      >
        <DrawerTrigger className={cn("md:hidden", buttonVariants({ variant: "outline", size: "icon" }))}>
          <MenuIcon />
        </DrawerTrigger>
        <DrawerContent>
          <nav className="flex flex-col p-4 gap-1">
            <DrawerNavigationLink href='#chat'>
              <DrawerNavigationHeading>Digital Me</DrawerNavigationHeading>
              <DrawerNavigationDesctiption>Talk to a digital version of me</DrawerNavigationDesctiption>
            </DrawerNavigationLink>
            <DrawerNavigationLink href='#skills'>
              <DrawerNavigationHeading>Expertise</DrawerNavigationHeading>
              <DrawerNavigationDesctiption>The many technologies I have worked with</DrawerNavigationDesctiption>
            </DrawerNavigationLink>
            <DrawerNavigationLink href='#contact'>
              <DrawerNavigationHeading>Lets Work</DrawerNavigationHeading>
              <DrawerNavigationDesctiption>Send me a quick email</DrawerNavigationDesctiption>
            </DrawerNavigationLink>
          </nav>
          <DrawerFooter>
            <Platforms className="ml-auto" />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <nav className="hidden md:flex flex-row items-center gap-1">
        <NavigationLink href='#introduction' className="px-2">
          <Logo className="h-6 w-6" />
        </NavigationLink>
        <NavigationLink href='#chat' className="px-4 py-2">Digital Me</NavigationLink>
        <NavigationLink href='#skills' className="px-4 py-2">Expertise</NavigationLink>
        <NavigationLink href='#contact' className="px-4 py-2">Lets Work</NavigationLink>
      </nav>
    </>
  )
}