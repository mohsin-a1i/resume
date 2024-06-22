import { NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuRoot } from "components/navigation-menu"
import { Logo } from "./logo"

export const Navigation = () => {
  return (
    <NavigationMenuRoot>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href='#introduction'>
            <Logo className="h-6 w-6" />
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href='#chat'>
            Digital Me
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href='#contact'>
            Lets Work
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenuRoot>
  )
}