"use client";

import { useEffect, useState } from 'react';
import { Home, Palette } from 'lucide-react';
import Link from 'next/link';
import { Theme } from '@/types';

const THEMES: Theme[] = ['dark', 'light', 'modern', 'retro'];

interface GlobalControlsProps {
  className?: string;
}

export const GlobalControls = ({ className }: GlobalControlsProps) => {
  const [theme, setTheme] = useState<Theme>('dark');

  // Load theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('game-theme') as Theme;
    if (savedTheme && THEMES.includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.className = theme; // This overrides all previous theme classes
    localStorage.setItem('game-theme', theme);
  }, [theme]);

  const cycleTheme = () => {
    const currentIndex = THEMES.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setTheme(THEMES[nextIndex]);
  };

  return (
    <div className={className || "fixed top-4 right-4 z-50 flex items-center gap-3"}>
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
      <Link
        href="/"
        className="p-3 bg-destructive hover:bg-red-500 text-white rounded-full hover:scale-110 active:scale-95 transition-all shadow-md flex items-center justify-center"
        title="Volver al Hub"
      >
        <Home size={20} />
      </Link>
    </div>
  );
};
