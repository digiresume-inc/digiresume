'use client';
import * as React from 'react';
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
import { cn } from '@lf/ui/lib/utils';
import { Menu } from 'lucide-react';
import { FlipWords } from '@/components/flipword';
import { Button } from '@lf/ui/components/base/button';
import { Input } from '@lf/ui/components/base/input';
import { Label } from '@lf/ui/components/base/label';
import { Popover, PopoverContent, PopoverTrigger } from '@lf/ui/components/base/popover';
import UsernameCheck from '@/components/usernamecheck';

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

export default function DemoPage() {
  return (
    <div className="w-full h-[750px] lg:h-[994px] relative bg-background">
      <div className="absolute inset-0">
        {/* Dotted background only at the bottom with a fade on top */}
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 h-[400px] lg:h-[600px]',
            '[background-size:20px_20px]',
            '[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]',
            'dark:[background-image:radial-gradient(#09090b_1px,transparent_1px)]',
            '[mask-image:linear-gradient(to_top,black,transparent)]',
            'dark:[mask-image:linear-gradient(to_top,black,transparent)]',
            'mask-image-[linear-gradient(to_top,black,transparent)]'
          )}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-background"></div>
      <div className="min-h-screen h-[300vh] flex flex-col items-center justify-start w-full mx-auto px-4">
        <header className="fixed top-0 left-0 z-[900] w-full pt-5 px-5 lg:px-0">
          <div className="max-w-5xl w-full relative mx-auto flex items-center justify-between rounded-full bg-secondary/10 p-2 lg:p-3 pl-5 bg-clip-padding backdrop-filter backdrop-blur-sm border">
            <div className="block lg:hidden">
              <Popover>
                <PopoverTrigger asChild>
                  <Button size={'icon'} variant="ghost">
                    <Menu />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 z-[1000] ml-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Dimensions</h4>
                      <p className="text-sm text-muted-foreground">
                        Set the dimensions for the layer.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="width">Width</Label>
                        <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="maxWidth">Max. width</Label>
                        <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="height">Height</Label>
                        <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="maxHeight">Max. height</Label>
                        <Input id="maxHeight" defaultValue="none" className="col-span-2 h-8" />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
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
                  <Link href="/docs" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Documentation
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="bg-primary text-primary-foreground flex px-4 py-2 rounded-full items-center gap-2 text-sm cursor-pointer">
              Sign in
            </div>
          </div>
        </header>
        <main className="max-w-7xl sm:pt-18 container relative mx-auto px-6 pt-16 md:pt-24 lg:px-16 lg:pt-20 xl:px-20 overflow-hidden">
          <div className="relative">
            <div className="mx-auto">
              <div className="mx-auto max-w-2xl lg:col-span-6 lg:flex lg:items-center justify-center text-center">
                <div className="relative z-10 lg:h-auto pt-[60px] lg:min-h-[300px] flex flex-col items-center justify-center sm:mx-auto md:w-3/4 lg:mx-0 lg:w-full gap-4 lg:gap-8">
                  <div className="flex flex-col items-center">
                    <h1
                      className={`bricolage text-foreground font-bold text-3xl lg:text-6xl tracking-tight select-none`}
                    >
                      <span className="block cursor-pointer lg:mb-2">The Spotlight your</span>
                      <span className="block md:ml-0">
                        <FlipWords duration={3000} className="mr-4 text-primary" />
                        deserves
                      </span>
                    </h1>
                    <p className="pt-2 text-sm font-semibold text-muted-foreground my-3 text-sx sm:mt-5 lg:mb-0 sm:text-base lg:px-10">
                      Boost your web presence with Linkfolio — showcase projects, share startups,
                      organize links, grow your network, and attract opportunities in one sleek
                      portfolio.
                    </p>
                  </div>
                  <UsernameCheck />
                </div>
              </div>
            </div>
          </div>
        </main>
        <div className="relative flex lg:hidden">
          <div className="absolute bottom-0 left-0 w-full h-36 pointer-events-none bg-gradient-to-t from-background/80 to-transparent z-10" />
          <img className="animate-slide-up" src="/linkfolio_vertical.png" />
        </div>
        <div className="relative hidden lg:flex min-h-[554px] rounded-md">
          <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none bg-gradient-to-t from-background/80 to-transparent z-10" />
          <div className="lf-player-container">
            <div
              id="hero-image"
              style={{
                background: 'transparent',
                margin: '0 auto',
                outline: 'none',
                overflow: 'hidden',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 2880 1108"
                width={2880}
                height={1108}
                preserveAspectRatio="xMidYMid meet"
                style={{
                  width: '100%',
                  height: '100%',
                  transform: 'translate3d(0px, 0px, 0px)',
                  contentVisibility: 'visible',
                }}
              >
                <defs>
                  <clipPath id="__lottie_element_2">
                    <rect width={2880} height={1108} x={0} y={0} />
                  </clipPath>
                  <clipPath id="__lottie_element_8">
                    <path d="M0,0 L2664.1169,0 L2664.1169,1520.3256 L0,1520.3256z" />
                  </clipPath>
                  <clipPath id="__lottie_element_13">
                    <path d="M0,0 L2664.4368,0 L2664.4368,1520.3256 L0,1520.3256z" />
                  </clipPath>
                  <clipPath id="__lottie_element_18">
                    <path d="M0,0 L2628.9281,0 L2628.9281,1493.7767 L0,1493.7767z" />
                  </clipPath>
                </defs>
                <g clipPath="url(#__lottie_element_2)">
                  <g
                    className="animate-slide-up delay-1"
                    clipPath="url(#__lottie_element_8)"
                    transform="matrix(1,0,0,1,-191.48599243164062,313.66400146484375)"
                    opacity={1}
                    style={{ display: 'block' }}
                  >
                    <g
                      transform="matrix(1.3008414506912231,0,0,0.742423951625824,0,-0.07699999958276749)"
                      opacity={1}
                      style={{ display: 'block' }}
                    >
                      <image
                        href="/linkfolio_1.png"
                        width="2048px"
                        height="2048px"
                        preserveAspectRatio="xMidYMid slice"
                      />
                    </g>
                  </g>
                  <g
                    className="animate-slide-up delay-2"
                    clipPath="url(#__lottie_element_13)"
                    transform="matrix(1,0,0,1,-131.34500122070312,199.7919921875)"
                    opacity={1}
                    style={{ display: 'block' }}
                  >
                    <g
                      transform="matrix(1.3010013103485107,0,0,0.742423951625824,0,-0.07699999958276749)"
                      opacity={1}
                      style={{ display: 'block' }}
                    >
                      <image
                        href="/linkfolio_2.png"
                        width="2048px"
                        height="2048px"
                        preserveAspectRatio="xMidYMid slice"
                      />
                    </g>
                  </g>
                  <g
                    className="animate-slide-up delay-3"
                    clipPath="url(#__lottie_element_18)"
                    transform="matrix(1,0,0,1,136.09100341796875,76.9630126953125)"
                    opacity={1}
                    style={{ display: 'block' }}
                  >
                    <g
                      transform="matrix(1.2836627960205078,0,0,0.7294679284095764,0,-0.07500000298023224)"
                      opacity={1}
                      style={{ display: 'block' }}
                    >
                      <image
                        href="/linkfolio_3.png"
                        width="2048px"
                        height="2048px"
                        preserveAspectRatio="xMidYMid slice"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
