import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = [
  {
    id: 'classic-warm',
    name: 'Classic Warm',
    colors: ['#C8A27C', '#FAF7F2'],
    isDark: false,
  },
  {
    id: 'forest-sage',
    name: 'Forest Sage',
    colors: ['#557A61', '#F3F6F4'],
    isDark: false,
  },
];

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'classic-warm';
  });

  useEffect(() => {
    // Apply the data-theme attribute to root html element
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = (newTheme) => {
    if (themes.some((t) => t.id === newTheme)) {
      setThemeState(newTheme);
    }
  };

  const currentTheme = themes.find((t) => t.id === theme) || themes[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
