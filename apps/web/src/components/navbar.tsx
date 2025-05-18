'use client';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
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
import { Popover, PopoverContent, PopoverTrigger } from '@lf/ui/components/base/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@lf/ui/components/base/avatar';
import { LogOut, Menu } from 'lucide-react';
import { cn } from '@lf/ui/lib/utils';
import LogoutConfirmation from '@/modals/logoutconfiramtion';
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

const Navbar = ({ user }: { user: User | null }) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isOpen || logoutModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, logoutModal]);

  return (
    <>
      <LogoutConfirmation modal={logoutModal} setModal={setLogoutModal} />
      <SlideInNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <header className="fixed top-0 left-0 z-[900] w-full pt-5 px-5 lg:px-0">
        <div className="max-w-5xl w-full relative mx-auto flex items-center justify-between rounded-full bg-secondary/10 p-2 lg:p-3 pl-5 bg-clip-padding backdrop-filter backdrop-blur-sm border">
          <div className="block lg:hidden">
            <Button onClick={() => setIsOpen(true)} size={'icon'} variant="ghost">
              <Menu />
            </Button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 lg:w-6 h-4 lg:h-6 bg-primary rounded-md"></div>
            <h1 className="text-xl lg:text-2xl font-extrabold">Linkfolio</h1>
          </div>
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
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Documentation
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {user ? (
            <Popover open={menuOpen} onOpenChange={setMenuOpen}>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage referrerPolicy="no-referrer" src={user?.user_metadata.avatar_url} />
                  <AvatarFallback>LF</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-fit h-fit max-w-60 mr-1 lg:mr-15 mt-4 relative z-[1000] flex flex-col gap-3">
                <div className="absolute z-0 -top-2 left-[83%] lg:left-[63%] -translate-x-1/2 w-4 h-4 rotate-45 border-t border-l bg-popover" />
                <div className="flex text-sm gap-1 items-center">
                  <span className="truncate max-w-[95%]">Signed in as: {user.email}</span>
                </div>
                <Button
                  onClick={() => {
                    setLogoutModal(true);
                    setMenuOpen(false);
                  }}
                  variant={'destructive'}
                  className="w-full cursor-pointer"
                >
                  Logout <LogOut />
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <Link
              href={'/signin'}
              className="bg-primary font-medium text-primary-foreground flex px-4 py-2 rounded-full items-center gap-2 text-sm cursor-pointer"
            >
              Sign in
            </Link>
          )}
        </div>
      </header>
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
