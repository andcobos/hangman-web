"use client";

import { AnimatePresence } from 'framer-motion';
import { GlobalControls } from '@/components/ui/GlobalControls';
import { useStopStore } from '@/store/useStopStore';
import { useStopMultiplayer } from '@/components/stop/hooks/useStopMultiplayer';
import { LobbyScreen } from '@/components/stop/screens/LobbyScreen';
import { WaitingRoomScreen } from '@/components/stop/screens/WaitingRoomScreen';
import { GameScreen } from '@/components/stop/screens/GameScreen';
import { VotingScreen } from '@/components/stop/screens/VotingScreen';
import { ResultsScreen } from '@/components/stop/screens/ResultsScreen';
import { GameOverScreen } from '@/components/stop/screens/GameOverScreen';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { GameInfoModal } from '@/components/ui/GameInfoModal';

export default function StopGamePage() {
  const { gameStatus, resetStore } = useStopStore();
  const { leaveRoom } = useStopMultiplayer();
  const router = useRouter();

  // El onDisconnect de Firebase ya se encarga de la limpieza si el usuario cierra la pestaña.
  // El botón "Volver al Hub" ejecuta leaveRoom() manualmente.

  const handleGoHome = async (e: React.MouseEvent) => {
    e.preventDefault();
    await leaveRoom();
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center font-sans overflow-hidden pt-24 pb-8 relative">
      {/* Header Fijo */}
      <header className="fixed top-0 left-0 w-full h-16 bg-background/90 backdrop-blur-sm z-50 px-4 sm:px-6 flex items-center justify-between border-b border-border shadow-sm">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold tracking-widest text-emerald-500 uppercase">
            Bachillerato Stop
          </h1>
          <GameInfoModal 
            title="Instrucciones: Bachillerato Stop" 
            rules={[
              "El juego generará una letra aleatoria y categorías.",
              "El primer jugador en llenar todo presiona Stop para detener el tiempo.",
              "Todos los jugadores revisan y votan las respuestas.",
              "Únicas valen 2 puntos, repetidas 1 punto, rechazadas 0."
            ]} 
          />
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <GlobalControls 
            className="flex items-center gap-2 sm:gap-3" 
            onHomeClick={handleGoHome}
          />
        </div>
      </header>

      <div className="w-full max-w-4xl flex-1 flex flex-col justify-center items-center px-4 sm:px-8">
        <AnimatePresence mode="wait">
          {gameStatus === 'LOBBY' && <LobbyScreen key="lobby" />}
          {gameStatus === 'WAITING_ROOM' && <WaitingRoomScreen key="waiting" />}
          {(gameStatus === 'PLAYING' || gameStatus === 'COUNTDOWN') && <GameScreen key="game" />}
          {gameStatus === 'VOTING' && <VotingScreen key="voting" />}
          {gameStatus === 'RESULTS' && <ResultsScreen key="results" />}
          {gameStatus === 'GAME_OVER' && <GameOverScreen key="gameover" />}
        </AnimatePresence>
      </div>
    </main>
  );
}
