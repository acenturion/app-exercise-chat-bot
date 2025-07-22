import React, { createContext, useContext, useState, useMemo } from 'react';
import { useColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextProps {
  colorScheme: ThemeMode;
  setColorScheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useColorScheme() as ThemeMode;
  const [colorScheme, setColorScheme] = useState<ThemeMode>(systemScheme || 'light');

  const toggleTheme = () => {
    setColorScheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const value = useMemo(() => ({ colorScheme, setColorScheme, toggleTheme }), [colorScheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used within a ThemeProvider');
  return ctx;
};
