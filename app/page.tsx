"use client";

import { useGameStore } from '@/store/useGameStore';
import { MainMenu } from '@/components/screens/MainMenu';
import { SetupScreen } from '@/components/screens/SetupScreen';
import { TransitionScreen } from '@/components/screens/TransitionScreen';
import { GameScreen } from '@/components/screens/GameScreen';
import { GameOverScreen } from '@/components/screens/GameOverScreen';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const { gameState } = useGameStore();

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center font-sans overflow-hidden py-8">
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
