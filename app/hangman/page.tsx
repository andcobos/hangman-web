"use client";

import { useHangmanStore } from '@/store/useHangmanStore';
import { MainMenu } from '@/components/hangman/screens/MainMenu';
import { SetupScreen } from '@/components/hangman/screens/SetupScreen';
import { TransitionScreen } from '@/components/hangman/screens/TransitionScreen';
import { GameScreen } from '@/components/hangman/screens/GameScreen';
import { GameOverScreen } from '@/components/hangman/screens/GameOverScreen';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

export default function Home() {
  const { gameState, resetToMenu } = useHangmanStore();

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center font-sans overflow-hidden py-8 relative">
      {/* Botón Flotante de Reinicio Local */}
      {gameState !== 'menu' && (
        <button
          onClick={resetToMenu}
          className="fixed bottom-6 right-6 z-50 p-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
          title="Reiniciar Juego"
        >
          <RotateCcw size={24} className="group-hover:-rotate-180 transition-transform duration-500" />
        </button>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={gameState}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
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
