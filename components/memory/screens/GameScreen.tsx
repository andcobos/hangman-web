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
            <div className={`flex-1 text-center py-2 rounded-xl transition-colors ${currentPlayer === 1 ? 'bg-primary/20 text-primary font-bold' : 'text-muted-foreground'}`}>
              J1: {player1Score}
            </div>
            <div className="mx-4 text-muted-foreground font-bold">VS</div>
            <div className={`flex-1 text-center py-2 rounded-xl transition-colors ${currentPlayer === 2 ? 'bg-primary/20 text-primary font-bold' : 'text-muted-foreground'}`}>
              J2: {player2Score}
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
          <div className="text-muted-foreground font-medium">
            Turno de: <span className="text-primary font-bold">Jugador {currentPlayer}</span>
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
