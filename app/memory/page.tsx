"use client";

import { AnimatePresence } from 'framer-motion';
import { GlobalControls } from '@/components/ui/GlobalControls';
import { useMemoryStore } from '@/store/useMemoryStore';
import { useMemoryLogic } from '@/components/memory/hooks/useMemoryLogic';
import { SetupScreen } from '@/components/memory/screens/SetupScreen';
import { GameScreen } from '@/components/memory/screens/GameScreen';
import { GameOverScreen } from '@/components/memory/screens/GameOverScreen';

export default function MemoryMatchPage() {
  const { status } = useMemoryStore();
  
  // Initialize game logic hooks
  useMemoryLogic();

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center py-16 px-4 sm:px-8 font-sans">
      <GlobalControls />

      <div className="w-full max-w-4xl flex-1 flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          {status === 'SETUP' && <SetupScreen key="setup" />}
          {(status === 'PREVIEW' || status === 'PLAYING') && <GameScreen key="game" />}
          {status === 'GAME_OVER' && <GameOverScreen key="gameover" />}
        </AnimatePresence>
      </div>
    </main>
  );
}
