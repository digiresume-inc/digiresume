'use client';
import { Button } from '@lf/ui/components/base/button';
import { NewTheme, NewThemes } from '@lf/utils';
import { Save } from 'lucide-react';
import React, { useState } from 'react';

const ThemeSelect = ({
  theme,
  localTheme,
  setLocalTheme,
}: {
  theme: any;
  localTheme: any;
  setLocalTheme: React.Dispatch<React.SetStateAction<NewTheme | null>>;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {['default', 'light', 'dark'].map((type) => (
        <div key={type} className="mb-4 px-6">
          <h3 className="text-sm font-semibold capitalize mb-2">{type} Themes</h3>
          <div className="flex flex-wrap gap-4">
            {NewThemes.filter((t) => t.theme_type === type).map((t: NewTheme) => (
              <div key={t.id} className="flex items-center p-2">
                <input
                  id={`radio-${t.id}`}
                  aria-describedby={`radio-text-${t.id}`}
                  type="radio"
                  name="colorPalette"
                  checked={localTheme.id === Number(t.id)}
                  onChange={() => setLocalTheme(t)}
                  value={t.theme_type}
                  className="w-4 h-4 bg-gray-100 mr-2"
                />
                <label
                  htmlFor={`radio-${t.id}`}
                  className="flex rounded-lg overflow-hidden w-32 h-12 border border-lightsecondary-border dark:border-0"
                >
                  <div
                    className="w-[45%] h-full"
                    style={{ backgroundColor: t.theme_data.background }}
                  ></div>
                  <div
                    className="w-[30%] h-full"
                    style={{ backgroundColor: t.theme_data.secondary }}
                  ></div>
                  <div
                    className="w-[15%] h-full"
                    style={{ backgroundColor: t.theme_data.foreground }}
                  ></div>
                  <div
                    className="w-[10%] h-full"
                    style={{ backgroundColor: t.theme_data.primary }}
                  ></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Button disabled={theme.id === localTheme.id} className="ml-auto" variant={'outline'}>
        Save Changes <Save />
      </Button>
    </div>
  );
};

export default ThemeSelect;
