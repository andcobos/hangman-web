import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Gamepad2, Eye, EyeOff } from 'lucide-react';
import { useHangmanStore } from '@/store/useHangmanStore';
import { cn } from '@/lib/utils';

export const SetupScreen = () => {
  const { setGameState, startNewRound, currentTurn, scores, playerNames, setPlayerNames } = useHangmanStore();
  const [word, setWord] = useState('');
  const [category, setCategory] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [redName, setRedName] = useState(playerNames.red);
  const [blueName, setBlueName] = useState(playerNames.blue);

  const isFirstRound = scores.red === 0 && scores.blue === 0;

  const creatorTurn = currentTurn === 'red' ? 'blue' : 'red'; // Guess mode is currentTurn, creator is the OTHER one
  const creatorColor = creatorTurn === 'red' ? 'text-red-500' : 'text-blue-500';
  const creatorName = creatorTurn === 'red' 
    ? (isFirstRound && redName.trim() ? redName : playerNames.red) 
    : (isFirstRound && blueName.trim() ? blueName : playerNames.blue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim() || !category.trim()) return;
    
    if (isFirstRound) {
      setPlayerNames(redName.trim(), blueName.trim());
    }
    
    // Convert word to uppercase and remove extra spaces
    const cleanWord = word.trim().toUpperCase().replace(/\s+/g, ' ');
    
    startNewRound({ word: cleanWord, category: category.trim() });
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-md mx-auto p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4 }}
    >
      <button 
        onClick={() => setGameState('menu')}
        className="self-start mb-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={20} />
        Volver
      </button>

      <div className="text-center w-full mb-8">
        <h2 className="text-3xl font-bold mb-2">Preparar Partida</h2>
        <p className="text-muted-foreground">
          <span className={cn("font-bold", creatorColor)}>{creatorName}</span>, ingresa la palabra secreta.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {isFirstRound && (
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="space-y-2 flex-1">
              <label className="text-sm font-bold pl-1 text-red-500">Nombre Jugador Rojo</label>
              <input 
                type="text"
                value={redName}
                onChange={(e) => setRedName(e.target.value)}
                className="w-full p-4 bg-zinc-100 dark:bg-zinc-800/50 border-2 border-transparent focus:border-red-500 rounded-2xl font-medium outline-none transition-all placeholder:text-zinc-400"
                placeholder="Ej. Andrés"
                maxLength={15}
              />
            </div>
            <div className="space-y-2 flex-1">
              <label className="text-sm font-bold pl-1 text-blue-500">Nombre Jugador Azul</label>
              <input 
                type="text"
                value={blueName}
                onChange={(e) => setBlueName(e.target.value)}
                className="w-full p-4 bg-zinc-100 dark:bg-zinc-800/50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-medium outline-none transition-all placeholder:text-zinc-400"
                placeholder="Ej. Sofía"
                maxLength={15}
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-bold pl-1">Palabra Secreta</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              value={word}
              onChange={(e) => {
                const val = e.target.value.replace(/[^a-zA-ZñÑ\s]/g, '');
                setWord(val);
              }}
              className="w-full p-4 pr-12 bg-zinc-100 dark:bg-zinc-800/50 border-2 border-transparent focus:border-indigo-500 rounded-2xl font-medium outline-none transition-all placeholder:text-zinc-400"
              placeholder="Ej. BATERIA"
              maxLength={20}
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold pl-1">Pista o Categoría</label>
          <input 
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-4 bg-zinc-100 dark:bg-zinc-800/50 border-2 border-transparent focus:border-indigo-500 rounded-2xl font-medium outline-none transition-all placeholder:text-zinc-400"
            placeholder="Ej. Instrumento Musical"
            maxLength={30}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={!word.trim() || !category.trim()}
          className="w-full mt-6 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
        >
          <Gamepad2 size={24} />
          ¡Comenzar!
        </button>
      </form>
    </motion.div>
  );
};
