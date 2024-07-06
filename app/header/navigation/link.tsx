import { DrawerClose } from 'components/drawer'
import { cn } from 'lib/cn'
import Link from 'next/link'

type NavigationLinkProps = {
  className?: string
  href: string
}

export const NavigationLink = ({ className, href, children }: React.PropsWithChildren<NavigationLinkProps>) => {
  return (
    <Link href={href}>
      <button className={cn("text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50", className)}>
        {children}
      </button>
    </Link>
  )
}

export const DrawerNavigationLink = ({ className, href, children }: React.PropsWithChildren<NavigationLinkProps>) => {
  return (
    <Link href={href}>
      <DrawerClose className={cn("w-full flex flex-col rounded-md px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50", className)}>
        {children}
      </DrawerClose>
    </Link>
  )
}

export const DrawerNavigationHeading = ({ children }: React.PropsWithChildren) => {
  return (
    <p>{children}</p>
  )
}

export const DrawerNavigationDesctiption = ({ children }: React.PropsWithChildren) => {
  return (
    <p className="text-left text-sm text-muted-foreground">{children}</p>
  )
}