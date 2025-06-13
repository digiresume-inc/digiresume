'use client';
import { Button } from '@dr/ui/components/base/button';
import { Tabs, TabsList, TabsTrigger } from '@dr/ui/components/base/tabs';
import { Theme, Themes } from '@dr/utils';
import { ArrowDown, ArrowUp, Smile } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ThemesTest = () => {
  const [counter, setCounter] = useState(0);
  const [theme, setTheme] = useState<Theme>(Themes[counter] as Theme);

  function hexToHSL(hex: string, alpha = 1): string {
    hex = hex.replace('#', '');

    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h *= 60;
    }

    return `hsla(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${alpha})`;
  }

  useEffect(() => {
    setTheme(Themes[counter] as Theme);
  }, [counter]);

  return (
    <div
      style={{
        background: theme.theme_data.background,
      }}
      className="h-screen w-full"
    >
      <div
        style={{
          background: theme.theme_data.background,
        }}
        className="h-screen max-w-3xl py-12 w-full flex flex-col gap-4 mx-auto"
      >
        <div className="flex items-center justify-start gap-2">
          <Button
            style={{
              background: theme.theme_data.secondary,
              color: theme.theme_data.foreground,
              border: hexToHSL(theme.theme_data.primary, 0.3),
            }}
            disabled={counter === Themes.length - 1}
            onClick={() => {
              if (counter < Themes.length - 1) {
                setCounter(counter + 1);
              }
            }}
            variant={'outline'}
            size={'icon'}
          >
            <ArrowUp />
          </Button>
          <p
            style={{
              color: theme.theme_data.foreground,
            }}
            className="font-semibold text-lg"
          >
            Current Theme: {counter}
          </p>
          <Button
            style={{
              background: theme.theme_data.secondary,
              color: theme.theme_data.foreground,
              border: hexToHSL(theme.theme_data.primary, 0.3),
            }}
            disabled={counter === 0}
            onClick={() => {
              if (counter > 0) {
                setCounter(counter - 1);
              }
            }}
            variant={'outline'}
            size={'icon'}
          >
            <ArrowDown />
          </Button>
        </div>
        {/* headline */}
        <div className="flex flex-col items-start justify-center gap-2">
          <p
            style={{
              color: theme.theme_data.foreground,
            }}
            className="font-bold text-2xl"
          >
            Full Stack Web/App Developer{' '}
          </p>
          <p
            style={{
              color: hexToHSL(theme.theme_data.foreground, 0.7),
            }}
            className="font-medium text-base"
          >
            Contributor @Dub.co · VBIT Alumni
          </p>
        </div>
        {/* badge */}
        <div
          style={{
            background: theme.theme_data.secondary,
            color: theme.theme_data.foreground,
          }}
          className="w-fit h-6 flex items-center justify-center rounded-full px-3 text-sm font-medium gap-2"
        >
          <Smile size={15} /> Badge
        </div>
        {/* card */}
        <div
          style={{
            background: theme.theme_data.card,
            borderColor: hexToHSL(theme.theme_data.primary, 0.3),
          }}
          className="w-74 h-36 rounded-lg border p-4 flex flex-col gap-2"
        >
          <div className="flex items-center justify-start gap-2">
            <p style={{ color: theme.theme_data.foreground }} className="text-lg font-semibold">
              Card Text
            </p>
            <div
              style={{
                background: theme.theme_data.secondary,
                color: theme.theme_data.foreground,
              }}
              className="w-fit h-6 flex items-center justify-center rounded-full px-3 text-sm font-medium gap-2"
            >
              <Smile size={15} /> Badge
            </div>
          </div>
          <p
            style={{ color: hexToHSL(theme.theme_data.foreground, 0.7) }}
            className="text-sm line-clamp-3"
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi, facilis labore.
            Asperiores eligendi vitae, atque ducimus minus totam quod repellendus aliquid ea
            possimus id. Minima modi at aliquid aspernatur veniam?
          </p>
        </div>
        <div
          style={{
            background: theme.theme_data.primary,
          }}
          className="w-74 h-8 rounded-lg"
        />
        <div
          style={{
            color: hexToHSL(theme.theme_data.foreground, 0.7),
          }}
        >
          <a
            style={{
              borderColor: hexToHSL(theme.theme_data.primary),
            }}
            className={`changeon_hover cursor-pointer w-fit flex items-center gap-0.5 border-b-2 border-dashed transition-colors`}
          >
            <Smile className="w-[13px] h-[13px]" />
            <p>Resume</p>
          </a>
          <style jsx>{`
            .changeon_hover:hover {
              color: ${hexToHSL(theme.theme_data.foreground)};
              border-color: ${hexToHSL(theme.theme_data.primary)};
            }
          `}</style>
        </div>
        {/* Tabs */}
        <Tabs defaultValue="profile" className="w-full mt-12">
          <div className="overflow-x-auto">
            <TabsList
              style={{
                background: theme.theme_data.background,
              }}
              className="flex w-fit gap-4 lg:gap-6 px-2 lg:px-3 rounded-none"
            >
              <TabsTrigger
                value="experience"
                style={
                  {
                    '--active-text-color': theme.theme_data.foreground,
                    '--inactive-text-color': hexToHSL(theme.theme_data.foreground, 0.7),
                    '--active-border-color': theme.theme_data.primary,
                    '--background-color': theme.theme_data.background,
                  } as React.CSSProperties
                }
                className="border-t-0 border-r-0 border-l-0 cursor-pointer border-b-[3px] border-transparent data-[state=active]:bg-[var(----background-color)] data-[state=active]:border-[var(--active-border-color)] text-[var(--inactive-text-color)] data-[state=active]:text-[var(--active-text-color)] pb-[18px] pt-4 text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
              >
                Experience
              </TabsTrigger>
              <TabsTrigger
                style={
                  {
                    '--active-text-color': theme.theme_data.foreground,
                    '--inactive-text-color': hexToHSL(theme.theme_data.foreground, 0.7),
                    '--active-border-color': theme.theme_data.primary,
                    '--background-color': theme.theme_data.background,
                  } as React.CSSProperties
                }
                className="border-t-0 border-r-0 border-l-0 cursor-pointer border-b-[3px] border-transparent data-[state=active]:bg-[var(----background-color)] data-[state=active]:border-[var(--active-border-color)] text-[var(--inactive-text-color)] data-[state=active]:text-[var(--active-text-color)] pb-[18px] pt-4 text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                value="startups"
              >
                Startups
              </TabsTrigger>
              <TabsTrigger
                style={
                  {
                    '--active-text-color': theme.theme_data.foreground,
                    '--inactive-text-color': hexToHSL(theme.theme_data.foreground, 0.7),
                    '--active-border-color': theme.theme_data.primary,
                    '--background-color': theme.theme_data.background,
                  } as React.CSSProperties
                }
                className="border-t-0 border-r-0 border-l-0 cursor-pointer border-b-[3px] border-transparent data-[state=active]:bg-[var(----background-color)] data-[state=active]:border-[var(--active-border-color)] text-[var(--inactive-text-color)] data-[state=active]:text-[var(--active-text-color)] pb-[18px] pt-4 text-sm font-bold tracking-[0.015em] bg-transparent rounded-none focus-visible:ring-0 focus-visible:outline-none"
                value="projects"
              >
                Projects
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ThemesTest;
