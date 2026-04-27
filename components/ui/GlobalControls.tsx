"use client";

import { useEffect } from 'react';
import { Home, Palette } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { Theme } from '@/types';

const THEMES: Theme[] = ['dark', 'light', 'modern', 'retro'];

export const GlobalControls = () => {
  const { resetToMenu, theme, setTheme } = useGameStore();

  useEffect(() => {
    const html = document.documentElement;
    html.className = theme; // This overrides all previous theme classes
  }, [theme]);

  const cycleTheme = () => {
    const currentIndex = THEMES.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setTheme(THEMES[nextIndex]);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
      {/* Theme Toggle Button */}
      <button
        onClick={cycleTheme}
        className="p-3 bg-background border-2 border-border rounded-full hover:scale-110 active:scale-95 transition-all text-foreground shadow-md flex items-center justify-center group relative gap-2"
        title="Cambiar Tema"
      >
        <Palette size={20} />
        {/* Optional: Add a small text to indicate current theme only on hover */}
        <span className="hidden md:block text-xs font-bold uppercase w-12 text-center">
          {theme}
        </span>
      </button>

      {/* Home / Reset Button */}
      <button
        onClick={resetToMenu}
        className="p-3 bg-destructive hover:bg-red-500 text-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-md flex items-center justify-center"
        title="Volver al Menú"
      >
        <Home size={20} />
      </button>
    </div>
  );
};
