import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, ArrowRight } from 'lucide-react';
import { useStopStore } from '@/store/useStopStore';
import { useStopMultiplayer } from '../hooks/useStopMultiplayer';

export function LobbyScreen() {
  const { playerName, setPlayerName } = useStopStore();
  const { createRoom, joinRoom } = useStopMultiplayer();
  
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateRoom = async () => {
    if (!playerName.trim()) {
      setError('Debes ingresar tu nombre primero.');
      return;
    }
    setError('');
    setIsLoading(true);
    await createRoom(playerName.trim());
    setIsLoading(false);
  };

  const handleJoinRoom = async () => {
    if (!playerName.trim()) {
      setError('Debes ingresar tu nombre primero.');
      return;
    }
    if (!joinCode.trim() || joinCode.length !== 5) {
      setError('Ingresa un código válido de 5 letras.');
      return;
    }
    
    setError('');
    setIsLoading(true);
    const result = await joinRoom(joinCode.trim(), playerName.trim());
    setIsLoading(false);

    if (result && !result.success) {
      if (result.error === 'ROOM_NOT_FOUND') setError('La sala no existe.');
      else if (result.error === 'ROOM_NOT_WAITING') setError('La partida ya comenzó.');
      else setError('Error al unirse a la sala.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md bg-card border border-border/50 rounded-3xl p-8 shadow-xl space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-emerald-500">Bachillerato Stop</h2>
        <p className="text-muted-foreground font-medium">Ingresa para jugar con tus amigos</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground uppercase tracking-wider ml-1">Tu Nombre</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Ej. Carlos"
            className="w-full bg-background border-2 border-border rounded-xl px-4 py-3 text-lg font-medium text-foreground focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-muted-foreground/50"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm font-medium text-center bg-red-500/10 py-2 rounded-lg">
            {error}
          </p>
        )}
      </div>

      <div className="space-y-4 pt-4 border-t border-border/50">
        <button
          onClick={handleCreateRoom}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-5 h-5" />
          Crear Nueva Sala
        </button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink-0 mx-4 text-muted-foreground text-sm font-medium">O únete a una</span>
          <div className="flex-grow border-t border-border"></div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            placeholder="CÓDIGO"
            maxLength={5}
            className="flex-1 bg-background border-2 border-border rounded-xl px-4 py-3 text-lg font-bold text-foreground text-center focus:outline-none focus:border-emerald-500 transition-colors uppercase tracking-widest placeholder:tracking-normal placeholder:font-medium placeholder:text-muted-foreground/50"
          />
          <button
            onClick={handleJoinRoom}
            disabled={isLoading || joinCode.length !== 5}
            className="px-6 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
