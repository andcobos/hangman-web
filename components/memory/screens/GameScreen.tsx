import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { Board } from '../ui/Board';

export function GameScreen() {
  const { mode, status, player1Score, player2Score, currentPlayer, attempts, resetGame } = useMemoryStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col items-center space-y-8"
    >
      {/* Header Stats */}
      <div className="w-full max-w-2xl flex items-center justify-between bg-card p-4 rounded-2xl border border-border/50 shadow-sm">
        {mode === 'SOLO' ? (
          <div className="flex-1 text-center text-lg font-semibold">
            Intentos: <span className="text-primary">{attempts}</span>
          </div>
        ) : (
          <>
            <div className={`flex-1 flex flex-col items-center justify-center py-2 px-2 sm:px-4 rounded-xl border-2 transition-all duration-300 ${currentPlayer === 1 ? 'bg-blue-500/20 border-blue-500 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] scale-105' : 'bg-transparent border-transparent text-muted-foreground opacity-50 grayscale'}`}>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold mb-1">Jugador Azul</span>
              <span className="text-2xl sm:text-3xl font-black leading-none">{player1Score}</span>
            </div>
            <div className="mx-2 sm:mx-4 text-muted-foreground font-black text-lg sm:text-xl opacity-50">VS</div>
            <div className={`flex-1 flex flex-col items-center justify-center py-2 px-2 sm:px-4 rounded-xl border-2 transition-all duration-300 ${currentPlayer === 2 ? 'bg-red-500/20 border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] scale-105' : 'bg-transparent border-transparent text-muted-foreground opacity-50 grayscale'}`}>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold mb-1">Jugador Rojo</span>
              <span className="text-2xl sm:text-3xl font-black leading-none">{player2Score}</span>
            </div>
          </>
        )}
      </div>

      {/* Status Message */}
      <div className="h-8 flex items-center justify-center">
        {status === 'PREVIEW' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold animate-pulse text-xl"
          >
            ¡Memoriza las cartas!
          </motion.div>
        )}
        {status === 'PLAYING' && mode === 'MULTI' && (
          <div className="text-muted-foreground font-medium flex items-center gap-2">
            Turno de: <span className={`font-bold px-3 py-1 rounded-full transition-colors ${currentPlayer === 1 ? 'bg-blue-500/20 text-blue-500' : 'bg-red-500/20 text-red-500'}`}>Jugador {currentPlayer === 1 ? 'Azul' : 'Rojo'}</span>
          </div>
        )}
      </div>

      {/* Game Board */}
      <Board />

      {/* Controls */}
      <div className="pt-8 flex gap-4">
        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border/50 bg-card hover:bg-muted text-foreground transition-all font-medium"
        >
          <LogOut className="w-5 h-5" />
          Salir
        </button>
      </div>
    </motion.div>
  );
}
