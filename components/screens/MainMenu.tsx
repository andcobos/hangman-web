import { motion } from 'framer-motion';
import { Play, Users } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { getRandomWord } from '@/lib/mockWords';

export const MainMenu = () => {
  const { setGameState, setSettings, startNewRound } = useGameStore();

  const handleSolo = () => {
    setSettings({ mode: 'solo' });
    const randomWord = getRandomWord();
    startNewRound(randomWord);
  };

  const handleMultiplayer = () => {
    setSettings({ mode: 'multiplayer' });
    setGameState('setup');
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[70vh] gap-8 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-purple-600 drop-shadow-sm">
          Ahorcado
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-medium">El juego clásico, renovado.</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs mt-8">
        <button
          onClick={handleSolo}
          className="flex items-center justify-center gap-3 w-full bg-foreground text-background font-semibold py-4 px-6 rounded-2xl hover:scale-105 transition-transform active:scale-95 shadow-lg"
        >
          <Play size={24} />
          Un Jugador
        </button>
        
        <button
          onClick={handleMultiplayer}
          className="flex items-center justify-center gap-3 w-full bg-white dark:bg-zinc-800 text-foreground border-2 border-border font-semibold py-4 px-6 rounded-2xl hover:scale-105 transition-transform active:scale-95 shadow-lg"
        >
          <Users size={24} />
          Multijugador Local
        </button>
      </div>

      <div className="mt-12 w-full max-w-xs space-y-2">
        <label className="text-sm font-semibold text-muted-foreground block text-center">Dificultad por Defecto</label>
        <select 
          onChange={(e) => setSettings({ difficulty: e.target.value as any })}
          className="w-full bg-transparent border-2 border-border rounded-xl p-3 text-center font-medium focus:outline-none focus:border-indigo-500 transition-colors"
          defaultValue="medium"
        >
          <option value="easy">Fácil (4 errores)</option>
          <option value="medium">Medio (6 errores)</option>
          <option value="hard">Difícil (8 errores)</option>
        </select>
      </div>
    </motion.div>
  );
};
