import { motion } from 'framer-motion';
import { useStopStore } from '@/store/useStopStore';
import { useStopMultiplayer } from '../hooks/useStopMultiplayer';
import { Trophy, ArrowRight, XCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ResultsScreen() {
  const { players, isHost } = useStopStore();
  const { nextRound, endGame } = useStopMultiplayer();
  const router = useRouter();

  // Ordenar de mayor a menor puntaje
  const sortedPlayers = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));

  const handleEndGame = async () => {
    await endGame();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto space-y-8"
    >
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-4 bg-emerald-500/20 rounded-full mb-4">
          <Trophy className="w-12 h-12 text-emerald-500" />
        </div>
        <h2 className="text-4xl font-black text-emerald-500 uppercase tracking-widest">Resultados</h2>
        <p className="text-muted-foreground text-lg">Puntuación acumulada de la sala</p>
      </div>

      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
        <div className="bg-muted px-8 py-4 border-b border-border flex justify-between font-bold text-muted-foreground uppercase tracking-wider text-sm">
          <span>Jugador</span>
          <span>Puntos Totales</span>
        </div>
        <div className="divide-y divide-border/50">
          {sortedPlayers.map((player, index) => (
            <div
              key={player.id}
              className={`flex items-center justify-between p-6 px-8 transition-colors ${index === 0 ? 'bg-emerald-500/5' : 'hover:bg-muted/30'}`}
            >
              <div className="flex items-center gap-4">
                <span className={`text-2xl font-black ${index === 0 ? 'text-emerald-500' : 'text-muted-foreground/50'}`}>
                  #{index + 1}
                </span>
                <span className="text-xl font-bold text-foreground">{player.name}</span>
                {player.isHost && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-500 px-2 py-1 rounded font-bold uppercase">Host</span>
                )}
              </div>
              <span className={`text-3xl font-black ${index === 0 ? 'text-emerald-500' : 'text-foreground'}`}>
                {player.score || 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      {isHost ? (
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={nextRound}
            className="flex-1 flex justify-center items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl text-xl font-black transition-all shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            Siguiente Ronda
            <ArrowRight className="w-6 h-6" />
          </button>

          <button
            onClick={handleEndGame}
            className="flex-1 flex justify-center items-center gap-3 bg-card border-2 border-border hover:border-red-500 hover:bg-red-500/10 text-red-500 px-8 py-4 rounded-2xl text-xl font-black transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <XCircle className="w-6 h-6" />
            Terminar Juego
          </button>
        </div>
      ) : (
        <div className="mt-8 flex justify-center">
          <div className="bg-muted/50 border border-border px-8 py-4 rounded-2xl flex items-center gap-3 text-muted-foreground font-medium">
            <Loader2 className="w-5 h-5 animate-spin" />
            Esperando a que el Host inicie la siguiente ronda...
          </div>
        </div>
      )}
    </motion.div>
  );
}
