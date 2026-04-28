import { motion } from 'framer-motion';
import { Play, Users, Crown, Loader2 } from 'lucide-react';
import { useStopStore } from '@/store/useStopStore';
import { useStopMultiplayer } from '../hooks/useStopMultiplayer';

export function WaitingRoomScreen() {
  const { roomCode, isHost, players } = useStopStore();
  const { startGame } = useStopMultiplayer();

  const handleStartGame = () => {
    if (isHost) {
      startGame();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-2xl bg-card border border-border/50 rounded-3xl p-8 shadow-2xl flex flex-col items-center space-y-8"
    >
      <div className="text-center space-y-2 w-full">
        <h2 className="text-2xl font-bold text-muted-foreground uppercase tracking-widest">Código de la Sala</h2>
        <div className="bg-background border-2 border-dashed border-emerald-500/50 rounded-2xl py-6 flex items-center justify-center">
          <span className="text-6xl font-black text-emerald-500 tracking-[0.2em] ml-4">{roomCode}</span>
        </div>
        <p className="text-sm text-muted-foreground">Comparte este código con tus amigos para que se unan.</p>
      </div>

      <div className="w-full bg-background border border-border rounded-2xl overflow-hidden">
        <div className="bg-muted p-4 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <Users className="w-5 h-5 text-emerald-500" />
            Jugadores Conectados
          </div>
          <span className="bg-emerald-500/20 text-emerald-500 px-3 py-1 rounded-full text-sm font-bold">
            {players.length}
          </span>
        </div>
        <ul className="divide-y divide-border/50">
          {players.length === 0 ? (
            <li className="p-8 flex flex-col items-center justify-center text-muted-foreground gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500/50" />
              Esperando jugadores...
            </li>
          ) : (
            players.map((player) => (
              <li key={player.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <span className="font-medium text-lg text-foreground flex items-center gap-2">
                  {player.name}
                  {player.isHost && <Crown className="w-4 h-4 text-yellow-500" title="Host" />}
                </span>
                <span className="text-xs font-bold px-2 py-1 bg-muted rounded text-muted-foreground uppercase tracking-wider">
                  {player.isHost ? 'Host' : 'Jugador'}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>

      {isHost ? (
        <button
          onClick={handleStartGame}
          disabled={players.length < 1} // Idealmente requerir 2 jugadores, pero 1 para pruebas
          className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-5 rounded-xl text-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Play className="w-6 h-6" fill="currentColor" />
          Iniciar Partida
        </button>
      ) : (
        <div className="w-full bg-muted/50 border border-border py-5 rounded-xl flex items-center justify-center gap-3 text-muted-foreground font-medium">
          <Loader2 className="w-5 h-5 animate-spin" />
          Esperando a que el Host inicie la partida...
        </div>
      )}
    </motion.div>
  );
}
