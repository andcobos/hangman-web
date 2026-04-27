"use client";

import { useGameStore } from '@/store/useGameStore';
import { MainMenu } from '@/components/screens/MainMenu';
import { SetupScreen } from '@/components/screens/SetupScreen';
import { TransitionScreen } from '@/components/screens/TransitionScreen';
import { GameScreen } from '@/components/screens/GameScreen';
import { GameOverScreen } from '@/components/screens/GameOverScreen';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const { gameState } = useGameStore();

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center font-sans overflow-hidden py-8">
      <AnimatePresence mode="wait">
        {gameState === 'menu' && <MainMenu key="menu" />}
        {gameState === 'setup' && <SetupScreen key="setup" />}
        {gameState === 'transition' && <TransitionScreen key="transition" />}
        {gameState === 'playing' && <GameScreen key="playing" />}
        {gameState === 'gameover' && <GameOverScreen key="gameover" />}
      </AnimatePresence>
    </main>
  );
}
