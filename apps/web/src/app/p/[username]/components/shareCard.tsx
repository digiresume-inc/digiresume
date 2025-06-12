'use client';
import { Check, Copy, ExternalLink } from 'lucide-react';
import React, { useState } from 'react';
import { SiFacebook, SiLinkedin, SiTelegram, SiWhatsapp, SiX } from 'react-icons/si';
import QRCodeGenerator from './qrGenerator';
import { Button } from '@lf/ui/components/base/button';
import { hexToHSL } from '@lf/utils';

const ShareCard = ({ profile, t }: { profile: any; t: any }) => {
  const [modal, setModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/${profile.username}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // reset after 2 seconds
  };
  return (
    <>
      <Button
        variant={'outline'}
        size={'icon'}
        onClick={() => setModal(true)}
        style={
          {
            '--text-color': t.foreground,
            '--border-color': hexToHSL(t.primary, 0.6),
            '--hover-background': t.secondary,
          } as React.CSSProperties
        }
        className="absolute top-0 lg:top-4 right-4 lg:right-24 !bg-transparent hover:!bg-[var(--hover-background)] !text-[var(--text-color)] !border-[var(--border-color)]"
      >
        <ExternalLink />
      </Button>
      {modal && (
        <div
          className="px-5 z-[100] fixed h-full w-full flex items-center justify-center top-0 left-0 backdrop-blur"
          style={{
            pointerEvents: 'auto',
            background: hexToHSL(t.primary, 0.2),
          }}
        >
          <div
            style={{
              pointerEvents: 'auto',
              background: t.card,
              borderColor: t.border,
            }}
            data-state={modal ? 'open' : 'closed'}
            className="relative z-50 w-full border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95  rounded-lg md:w-full bg-dash-sidebar sm:align-middle sm:w-full sm:max-w-sm p-0 gap-0 pb-5 !block"
          >
            <div
              style={{
                borderColor: t.border,
              }}
              className="flex flex-col gap-1.5 text-center sm:text-left py-4 px-5 border-b "
            >
              <h2 className="text-base leading-none font-normal">
                <span
                  style={{
                    color: t?.foreground,
                  }}
                  className="break-words"
                >
                  Share Page
                </span>
              </h2>
            </div>
            <div className="py-4 px-5 overflow-hidden">
              <div className="p-2 flex items-center justify-center mx-auto">
                <QRCodeGenerator
                  link={`${process.env.NEXT_PUBLIC_BASE_URL}/${profile.username}`}
                  color={t.foreground}
                />
              </div>
              <div className="space-y-4">
                <div
                  style={{
                    background: 'transparent',
                    borderColor: t.border,
                  }}
                  className="rounded-md border w-full px-2 py-1 relative"
                >
                  <p
                    style={{
                      color: t?.foreground,
                    }}
                    className="w-[93%] text-ellipsis truncate text-sm lg:text-base"
                  >
                    {process.env.NEXT_PUBLIC_BASE_URL?.replace(/(^\w+:|^)\/\//, '')}/
                    {profile.username}
                  </p>
                  <p
                    onClick={handleCopy}
                    title="copy link"
                    className="p-1 rounded-md absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    {copied ? (
                      <Check size={16} className="text-green-500 transition-transform scale-110" />
                    ) : (
                      <Copy
                        size={16}
                        style={{ color: t?.foreground }}
                        className="transition-transform hover:scale-110"
                      />
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                background: t.border,
              }}
              className="w-full h-px"
            />
            <div className="flex gap-2 px-5 pt-5 items-center justify-center">
              <a
                href={`whatsapp://send?text=${process.env.NEXT_PUBLIC_BASE_URL}/${profile.username}`}
                data-action="share/whatsapp/share"
                style={{
                  background: 'transparent',
                  borderColor: t.border,
                  color: t.foreground,
                }}
                className="p-2.5 lg:p-3 border rounded-full"
              >
                <SiWhatsapp className="text-xl lg:text-2xl" />
              </a>
              <a
                target="_blank"
                href={`http://x.com/share?text=Checkout my Linkfolio page%0A&url=${process.env.NEXT_PUBLIC_BASE_URL}/${profile.username}`}
                style={{
                  background: 'transparent',
                  borderColor: t.border,
                  color: t.foreground,
                }}
                className="p-2.5 lg:p-3 border rounded-full"
              >
                <SiX className="text-xl lg:text-2xl" />
              </a>
              <a
                target="_blank"
                href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_BASE_URL}/${profile.username}`}
                style={{
                  background: 'transparent',
                  borderColor: t.border,
                  color: t.foreground,
                }}
                className="p-2.5 lg:p-3 border rounded-full"
              >
                <SiFacebook className="text-xl lg:text-2xl" />
              </a>{' '}
              <a
                target="_blank"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${process.env.NEXT_PUBLIC_BASE_URL}/${profile.username}&text=Checkout my Linkfolio page`}
                style={{
                  background: 'transparent',
                  borderColor: t.border,
                  color: t.foreground,
                }}
                className="p-2.5 lg:p-3 border rounded-full"
              >
                <SiLinkedin className="text-xl lg:text-2xl" />
              </a>{' '}
              <a
                target="_blank"
                href={`https://telegram.me/share/url?url=${process.env.NEXT_PUBLIC_BASE_URL}/${profile.username}&text=Checkout my Linkfolio page`}
                style={{
                  background: 'transparent',
                  borderColor: t.border,
                  color: t.foreground,
                }}
                className="p-2.5 lg:p-3 border rounded-full"
              >
                <SiTelegram className="text-xl lg:text-2xl" />
              </a>{' '}
            </div>
            <button
              onClick={() => setModal(false)}
              type="button"
              style={{
                color: t.foreground,
              }}
              className="cursor-pointer absolute right-4 top-4 rounded-sm opacity-50 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x h-4 w-4"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareCard;
