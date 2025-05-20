import * as React from 'react';
import { cn } from '@lf/ui/lib/utils';
import { FlipWords } from '@/components/flipword';
import UsernameCheck from '@/components/usernamecheck';
import { createSClient } from '@/supabase/server';
import Navbar from '@/components/navbar';
import { Spotlight } from '@lf/ui/components/base/spotlight';

const words = [
  'Startup ',
  'Project ',
  'Creation ',
  'Skills ',
  'Journey ',
  'Earnings ',
  'Blogs ',
  'Career ',
];

export default async function Home() {
  const supabase = createSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="w-full h-[750px] lg:h-[994px] relative bg-background">
      <Spotlight fill='var(--primary)' />
      <div className="absolute inset-0">
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
        <Navbar user={user} />
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
                        <FlipWords words={words} duration={3000} className="mr-4 text-primary" />
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
          <img className="animate-slide-up" src="/test/linkfolio_vertical.png" />
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
                    className="animate-fade delay-1"
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
                        href="/test/linkfolio_1.png"
                        width="2048px"
                        height="2048px"
                        preserveAspectRatio="xMidYMid slice"
                      />
                    </g>
                  </g>
                  <g
                    className="animate-fade delay-2"
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
                        href="/test/linkfolio_2.png"
                        width="2048px"
                        height="2048px"
                        preserveAspectRatio="xMidYMid slice"
                      />
                    </g>
                  </g>
                  <g
                    className="animate-fade delay-3"
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
                        href="/test/linkfolio_3.png"
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
