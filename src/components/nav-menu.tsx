'use client';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import Link from "next/link";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import React from "react";
import { cn } from "@/lib/utils";

  export default function NavMenu() {
    const components = [
      {
        title: "❤️ Commitment Score",
        href: "/commitment",
        description: "Based on endorsment of UN water resolutions.",
      },
      {
        title: "💰 Agency Score",
        href: "/agency",
        description: "Based on GDP per capita.",
      },
      {
        title: "😰 Challenges score",
        href: "/challenges",
        description: "Climatic factors making it hard to implement change.",
      },
      {
        title: "🏆 Progress Score",
        href: "/progress",
        description: "Progress in delivering water-related UN SDG goals.",
      }
    ]
    return (
        <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <Link href="/in/overview" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Overview
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
            <NavigationMenuTrigger>
                <Link href={"/in/bb"}>Building Blocks</Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 grid-cols-1">
                {components.map((component) => (
                    <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                    >
                    {component.description}
                    </ListItem>
                ))}
                </ul>
            </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
            <NavigationMenuTrigger>
                <Link href={"/in/un"}>UN Data</Link>
            </NavigationMenuTrigger>
            </NavigationMenuItem>
        </NavigationMenuList>
        </NavigationMenu>
    )
  }


  const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"