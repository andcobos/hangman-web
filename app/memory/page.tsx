"use client";

import { AnimatePresence } from 'framer-motion';
import { GlobalControls } from '@/components/ui/GlobalControls';
import { useMemoryStore } from '@/store/useMemoryStore';
import { useMemoryLogic } from '@/components/memory/hooks/useMemoryLogic';
import { SetupScreen } from '@/components/memory/screens/SetupScreen';
import { GameScreen } from '@/components/memory/screens/GameScreen';
import { GameOverScreen } from '@/components/memory/screens/GameOverScreen';
import { RotateCcw } from 'lucide-react';

export default function MemoryMatchPage() {
  const { status, resetGame } = useMemoryStore();
  
  // Initialize game logic hooks
  useMemoryLogic();

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center font-sans overflow-hidden pt-24 pb-8 relative">
      {/* Header Fijo */}
      <header className="fixed top-0 left-0 w-full h-16 bg-background/90 backdrop-blur-sm z-50 px-4 sm:px-6 flex items-center justify-between border-b border-border shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold tracking-widest text-primary uppercase">Memory Match</h1>
        
        <div className="flex items-center gap-2 sm:gap-3">
          {status !== 'SETUP' && (
            <button
              onClick={resetGame}
              className="p-2 sm:p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-md hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
              title="Reiniciar Juego"
            >
              <RotateCcw size={20} className="group-hover:-rotate-180 transition-transform duration-500" />
            </button>
          )}
          
          <GlobalControls className="flex items-center gap-2 sm:gap-3" />
        </div>
      </header>

      <div className="w-full max-w-4xl flex-1 flex flex-col justify-center items-center px-4 sm:px-8">
        <AnimatePresence mode="wait">
          {status === 'SETUP' && <SetupScreen key="setup" />}
          {(status === 'PREVIEW' || status === 'PLAYING') && <GameScreen key="game" />}
          {status === 'GAME_OVER' && <GameOverScreen key="gameover" />}
        </AnimatePresence>
      </div>
    </main>
  );
}
