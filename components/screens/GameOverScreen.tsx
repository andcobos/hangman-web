import { motion } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { getRandomWord } from '@/lib/mockWords';
import { RotateCcw, Home, Trophy, Frown } from 'lucide-react';
import { cn } from '@/lib/utils';

export const GameOverScreen = () => {
  const { currentWord, guessedLetters, settings, resetGame, startNewRound, setGameState, toggleTurn, currentTurn, playerNames } = useGameStore();

  if (!currentWord) return null;

  const isWinner = currentWord.word.split('').every((letter) => guessedLetters.includes(letter) || letter === ' ');

  const handlePlayAgain = () => {
    if (settings.mode === 'solo') {
      startNewRound(getRandomWord());
    } else {
      toggleTurn();
      setGameState('setup');
    }
  };

  const winTextColor = settings.mode === 'solo' 
    ? "text-green-500" 
    : currentTurn === 'red' ? "text-red-500" : "text-blue-500";
    
  // If playing multiplayer, whoever won the round
  const winnerName = settings.mode === 'multiplayer' 
    ? (currentTurn === 'red' ? playerNames.red : playerNames.blue)
    : '¡Ganaste!';

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-md mx-auto p-6 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ type: "spring", damping: 20 }}
    >
      <div className="mb-8 relative">
        <motion.div
           initial={{ y: -50, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.2, type: "spring" }}
        >
          {isWinner ? (
            <Trophy size={100} className="text-yellow-400 mx-auto drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
          ) : (
            <Frown size={100} className="text-zinc-500 mx-auto" />
          )}
        </motion.div>
      </div>

      <h1 className={cn("text-5xl font-black mb-4", isWinner ? winTextColor : "text-red-500")}>
        {isWinner ? (settings.mode === 'multiplayer' ? `¡${winnerName} Gana!` : '¡Has Ganado!') : '¡Fin del Juego!'}
      </h1>

      <div className="space-y-2 mb-12">
        <p className="text-xl text-muted-foreground font-medium">La palabra era:</p>
        <p className="text-4xl font-extrabold tracking-widest text-foreground">{currentWord.word}</p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <button
          onClick={handlePlayAgain}
          className="flex items-center justify-center gap-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all active:scale-95 shadow-lg shadow-indigo-500/25"
        >
          <RotateCcw size={24} />
          {settings.mode === 'multiplayer' ? 'Siguiente Ronda (Cambio de Turno)' : 'Jugar de Nuevo'}
        </button>

        <button
          onClick={resetGame}
          className="flex items-center justify-center gap-3 w-full bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-foreground font-bold py-4 px-6 rounded-2xl transition-all active:scale-95"
        >
          <Home size={24} />
          Menú Principal
        </button>
      </div>
    </motion.div>
  );
};
