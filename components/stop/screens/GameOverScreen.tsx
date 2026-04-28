import { motion } from 'framer-motion';
import { useStopStore } from '@/store/useStopStore';
import { useStopMultiplayer } from '../hooks/useStopMultiplayer';
import { Crown, RotateCcw, Home, Loader2, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function GameOverScreen() {
  const { players, isHost } = useStopStore();
  const { playAgain, leaveAndDestroyRoom } = useStopMultiplayer();
  const router = useRouter();

  // Ordenar de mayor a menor puntaje
  const sortedPlayers = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));
  const winner = sortedPlayers[0];

  const handleLeave = async () => {
    await leaveAndDestroyRoom();
    router.push('/');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center space-y-10"
    >
      <div className="text-center space-y-4">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
          className="inline-flex items-center justify-center p-6 bg-yellow-500/20 rounded-full mb-2 relative"
        >
          <Crown className="w-16 h-16 text-yellow-500" />
          <Star className="w-6 h-6 text-yellow-400 absolute top-0 right-0 animate-ping" />
        </motion.div>
        
        <h2 className="text-5xl md:text-6xl font-black text-foreground uppercase tracking-widest drop-shadow-sm">
          Fin del Juego
        </h2>
        
        {winner && (
          <div className="bg-card border-2 border-yellow-500/50 shadow-2xl shadow-yellow-500/20 px-8 py-6 rounded-3xl mt-6">
            <p className="text-muted-foreground uppercase tracking-widest text-sm font-bold mb-2">
              Gran Ganador
            </p>
            <h3 className="text-4xl font-black text-yellow-500 mb-1">{winner.name}</h3>
            <p className="text-2xl font-bold text-foreground">{winner.score || 0} Puntos Totales</p>
          </div>
        )}
      </div>

      <div className="w-full bg-card border border-border rounded-3xl overflow-hidden shadow-xl max-w-xl">
        <div className="bg-muted px-6 py-3 border-b border-border font-bold text-muted-foreground uppercase tracking-wider text-sm text-center">
          Posiciones Finales
        </div>
        <div className="divide-y divide-border/50">
          {sortedPlayers.map((player, index) => (
            <div 
              key={player.id} 
              className={`flex items-center justify-between p-4 px-6 ${index === 0 ? 'bg-yellow-500/5' : 'bg-transparent'}`}
            >
              <div className="flex items-center gap-4">
                <span className={`text-xl font-black ${index === 0 ? 'text-yellow-500' : 'text-muted-foreground/50'}`}>
                  #{index + 1}
                </span>
                <span className="text-lg font-bold text-foreground">{player.name}</span>
              </div>
              <span className={`text-2xl font-black ${index === 0 ? 'text-yellow-500' : 'text-foreground'}`}>
                {player.score || 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-xl">
        {isHost ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={playAgain}
              className="flex-1 flex justify-center items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl text-lg font-black transition-all shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <RotateCcw className="w-5 h-5" />
              Jugar Revancha
            </button>
            
            <button
              onClick={handleLeave}
              className="flex-1 flex justify-center items-center gap-3 bg-card border-2 border-border hover:border-red-500 hover:bg-red-500/10 text-red-500 px-8 py-4 rounded-2xl text-lg font-black transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Home className="w-5 h-5" />
              Volver al Inicio
            </button>
          </div>
        ) : (
          <div className="bg-muted/50 border border-border px-8 py-4 rounded-2xl flex items-center justify-center gap-3 text-muted-foreground font-medium text-center">
            <Loader2 className="w-5 h-5 animate-spin" />
            Esperando a que el anfitrión decida...
          </div>
        )}
      </div>
    </motion.div>
  );
}
