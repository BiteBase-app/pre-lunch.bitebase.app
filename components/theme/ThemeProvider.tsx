import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext({
  accentColor: '#74C365',
  secondaryAccent: '#E23D28',
  contrastColor: '#F4C431',
  spacing: {
    xl: '64px',
    lg: '32px',
    md: '16px',
    sm: '8px'
  }
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', '#74C365');
    document.documentElement.style.setProperty('--secondary-accent', '#E23D28');
    document.documentElement.style.setProperty('--contrast-color', '#F4C431');
    document.documentElement.style.setProperty('--spacing-xl', '64px');
    document.documentElement.style.setProperty('--spacing-lg', '32px');
    document.documentElement.style.setProperty('--spacing-md', '16px');
    document.documentElement.style.setProperty('--spacing-sm', '8px');
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        accentColor: '#74C365',
        secondaryAccent: '#E23D28',
        contrastColor: '#F4C431',
        spacing: {
          xl: '64px',
          lg: '32px',
          md: '16px',
          sm: '8px'
        }
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);