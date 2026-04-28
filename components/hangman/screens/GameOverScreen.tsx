import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useHangmanStore } from '@/store/useHangmanStore';
import { getRandomWord } from '@/lib/mockWords';
import { RotateCcw, Home, Trophy, Frown } from 'lucide-react';
import { cn } from '@/lib/utils';

export const GameOverScreen = () => {
  const { currentWord, guessedLetters, settings, resetGame, startNewRound, setGameState, toggleTurn, currentTurn, playerNames, updateScore, resetRound, setCurrentWord } = useHangmanStore();

  // Create a frozen snapshot of the state on mount to prevent flickering during exit animation
  const snapshot = useMemo(() => {
    if (!currentWord) return null;
    const won = currentWord.word.toUpperCase().split('').every((letter) => guessedLetters.includes(letter) || letter === ' ');
    return {
      word: currentWord.word,
      isWinner: won,
      mode: settings.mode,
      currentTurn,
      playerNames
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!snapshot) return null;

  const { isWinner, word, mode, currentTurn: snapTurn, playerNames: snapNames } = snapshot;

  const handlePlayAgain = () => {
    if (settings.mode === 'solo') {
      // First change game state to playing, then reset
      setGameState('playing');
      startNewRound(getRandomWord());
    } else {
      if (isWinner) {
        updateScore(currentTurn, 1);
      } else {
        const otherPlayer = currentTurn === 'red' ? 'blue' : 'red';
        updateScore(otherPlayer, 1);
      }
      setGameState('setup');
      toggleTurn();
      resetRound();
      setCurrentWord(null);
    }
  };

  const handleReset = () => {
    setGameState('menu');
    resetGame();
  };

  const creatorTurn = snapTurn === 'red' ? 'blue' : 'red';
  const roundWinner = isWinner ? snapTurn : creatorTurn;
  const roundWinnerName = roundWinner === 'red' ? snapNames.red : snapNames.blue;
  const roundWinnerColor = roundWinner === 'red' ? "text-red-500" : "text-blue-500";

  const titleText = mode === 'multiplayer'
    ? `¡${roundWinnerName} Gana!`
    : isWinner ? '¡Has Ganado!' : '¡Fin del Juego!';

  const titleColor = mode === 'multiplayer'
    ? roundWinnerColor
    : isWinner ? "text-green-500" : "text-red-500";

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

      <h1 className={cn("text-5xl font-black mb-4", titleColor)}>
        {titleText}
      </h1>

      <div className="space-y-2 mb-12">
        <p className="text-xl text-muted-foreground font-medium">La palabra era:</p>
        <p className="text-4xl font-extrabold tracking-widest text-foreground">{word}</p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <button
          onClick={handlePlayAgain}
          className="flex items-center justify-center gap-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all active:scale-95 shadow-lg shadow-indigo-500/25"
        >
          <RotateCcw size={24} />
          {mode === 'multiplayer' ? 'Siguiente Ronda (Cambio de Turno)' : 'Jugar de Nuevo'}
        </button>

        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-3 w-full bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-foreground font-bold py-4 px-6 rounded-2xl transition-all active:scale-95"
        >
          <Home size={24} />
          Menú Principal
        </button>
      </div>
    </motion.div>
  );
};
