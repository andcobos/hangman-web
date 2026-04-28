"use client";

import { useHangmanStore } from '@/store/useHangmanStore';
import { MainMenu } from '@/components/hangman/screens/MainMenu';
import { SetupScreen } from '@/components/hangman/screens/SetupScreen';
import { TransitionScreen } from '@/components/hangman/screens/TransitionScreen';
import { GameScreen } from '@/components/hangman/screens/GameScreen';
import { GameOverScreen } from '@/components/hangman/screens/GameOverScreen';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { GlobalControls } from '@/components/ui/GlobalControls';

export default function Home() {
  const { gameState, resetToMenu } = useHangmanStore();

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center font-sans overflow-hidden pt-24 pb-8 relative">
      {/* Header Fijo */}
      <header className="fixed top-0 left-0 w-full h-16 bg-background/90 backdrop-blur-sm z-50 px-4 sm:px-6 flex items-center justify-between border-b border-border shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold tracking-widest text-primary uppercase">Hangman</h1>
        
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Botón de Reinicio Local en el Header */}
          {gameState !== 'menu' && (
            <button
              onClick={resetToMenu}
              className="p-2 sm:p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-md hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
              title="Reiniciar Juego"
            >
              <RotateCcw size={20} className="group-hover:-rotate-180 transition-transform duration-500" />
            </button>
          )}
          
          <GlobalControls className="flex items-center gap-2 sm:gap-3" />
        </div>
      </header>
      <AnimatePresence mode="wait">
        <motion.div
          key={gameState}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="w-full flex justify-center items-center flex-1"
        >
          {gameState === 'menu' && <MainMenu />}
          {gameState === 'setup' && <SetupScreen />}
          {gameState === 'transition' && <TransitionScreen />}
          {gameState === 'playing' && <GameScreen />}
          {gameState === 'gameover' && <GameOverScreen />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
