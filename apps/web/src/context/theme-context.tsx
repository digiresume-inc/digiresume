'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextType = {
  isWhiteTheme: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isWhiteTheme, setIsWhiteTheme] = useState(false);

  useEffect(() => {
    const homePage = document.getElementById('homePage');
    if (isWhiteTheme) {
      homePage?.classList.add('theme-white');
    } else {
      homePage?.classList.remove('theme-white');
    }

    const interval = setInterval(() => {
      setIsWhiteTheme((prev) => {
        const newTheme = !prev;
        const homePage = document.getElementById('homePage');
        if (newTheme) {
          homePage?.classList.add('theme-white');
        } else {
          homePage?.classList.remove('theme-white');
        }
        return newTheme;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [isWhiteTheme]);

  return (
    <ThemeContext.Provider value={{ isWhiteTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
