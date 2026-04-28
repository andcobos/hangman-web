import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Home } from 'lucide-react';
import { useMemoryStore } from '@/store/useMemoryStore';
import Link from 'next/link';

export function GameOverScreen() {
  const { mode, player1Score, player2Score, attempts, resetGame, setStatus } = useMemoryStore();

  const getWinnerText = () => {
    if (mode === 'SOLO') return '¡Completado!';
    if (player1Score > player2Score) return '¡Jugador Azul Gana!';
    if (player2Score > player1Score) return '¡Jugador Rojo Gana!';
    return '¡Empate!';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md w-full mx-auto bg-card p-8 rounded-3xl border border-border/50 shadow-2xl text-center space-y-8"
    >
      <div className="flex justify-center">
        <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center">
          <Trophy className="w-12 h-12 text-yellow-500" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
          {getWinnerText()}
        </h2>
        <p className="text-muted-foreground text-lg">Fin del juego</p>
      </div>

      <div className="bg-muted/50 p-6 rounded-2xl space-y-4">
        {mode === 'SOLO' ? (
          <div className="text-xl font-medium">
            Intentos totales:{' '}
            <span className="text-primary font-bold text-2xl ml-2">{attempts}</span>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`flex justify-between items-center text-xl font-bold ${player1Score > player2Score ? 'text-blue-500' : 'text-muted-foreground'}`}>
              <span>Jugador Azul</span>
              <span>{player1Score} pts</span>
            </div>
            <div className="h-px bg-border/50 w-full" />
            <div className={`flex justify-between items-center text-xl font-bold ${player2Score > player1Score ? 'text-red-500' : 'text-muted-foreground'}`}>
              <span>Jugador Rojo</span>
              <span>{player2Score} pts</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => setStatus('SETUP')}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          <RotateCcw className="w-5 h-5" />
          Jugar de Nuevo
        </button>
        
        <Link 
          href="/" 
          onClick={resetGame}
          className="w-full flex items-center justify-center gap-2 bg-muted text-muted-foreground py-4 rounded-xl font-bold hover:bg-muted/80 hover:text-foreground transition-all"
        >
          <Home className="w-5 h-5" />
          Volver al Lobby
        </Link>
      </div>
    </motion.div>
  );
}
