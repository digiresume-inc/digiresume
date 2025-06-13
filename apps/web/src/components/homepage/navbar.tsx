'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@lf/ui/components/base/navigation-menu';
import { Button } from '@lf/ui/components/base/button';
import { FileText, Menu, X } from 'lucide-react';
import { cn } from '@lf/ui/lib/utils';
import SlideInNavbar from './mobilenavbar';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SlideInNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <nav className="fixed top-0 left-0 z-[1000] w-full pt-5 px-5 lg:px-0">
        <div
          className={cn(
            'max-w-5xl w-full relative mx-auto flex items-center justify-between rounded-full p-2 lg:p-3 pl-5',
            {
              'bg-clip-padding backdrop-filter backdrop-blur-sm border bg-secondary/10': !isOpen,
              'bg-background': isOpen,
            }
          )}
        >
          <div className="block lg:hidden">
            <Button onClick={() => setIsOpen(!isOpen)} size={'lg'} variant="ghost">
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>

          <h1 className="text-xl lg:text-2xl font-extrabold pl-2">
            digiresu.<span className="text-primary">me</span>
          </h1>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          {/* <Icons.logo className="h-6 w-6" /> */}
                          <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Beautifully designed components that you can copy and paste into your
                            apps. Accessible. Customizable. Open Source.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Introduction">
                      Re-usable components built using Radix UI and Tailwind CSS.
                    </ListItem>
                    <ListItem href="/docs/installation" title="Installation">
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem href="/docs/primitives/typography" title="Typography">
                      Styles for headings, paragraphs, lists...etc
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                      <ListItem key={component.title} title={component.title} href={component.href}>
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/dashboard" className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Link
            href={'/signin'}
            className="bg-primary font-medium text-primary-foreground flex px-4 py-2 rounded-full items-center gap-2 text-xs lg:text-sm cursor-pointer"
          >
            Sign in
          </Link>
        </div>
      </nav>
    </>
  );
};

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';

export default Navbar;
