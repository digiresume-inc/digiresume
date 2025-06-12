import React from 'react';

const HeroImage = () => {
  return (
    <>
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
    </>
  );
};

export default HeroImage;
