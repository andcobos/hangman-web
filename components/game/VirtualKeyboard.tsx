import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { cn } from '@/lib/utils'; // I will create a simple utils.ts for cn

interface VirtualKeyboardProps {
  onGuess: (letter: string) => void;
  guessedLetters: string[];
  disabled: boolean;
  word: string;
}

const KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'] // Removed Backspace/Enter since it's Hangman guess
];

export const VirtualKeyboard = ({ onGuess, guessedLetters, disabled, word }: VirtualKeyboardProps) => {
  const { hintsRemaining, useHint } = useGameStore();

  const handleHint = () => {
    if (hintsRemaining <= 0 || disabled) return;
    
    // Find a letter not yet guessed
    const unguessedLetters = word.toUpperCase().split('').filter(char => 
      char !== ' ' && !guessedLetters.includes(char)
    );
    
    if (unguessedLetters.length > 0) {
      const randomHint = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)];
      useHint(randomHint);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 px-2 select-none">
      <div className="flex justify-between items-center mb-4 px-2">
        <span className="text-sm font-medium text-muted-foreground">Pistas restantes: {hintsRemaining}</span>
        <button 
          onClick={handleHint}
          disabled={disabled || hintsRemaining <= 0}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold transition-all shadow-sm",
            hintsRemaining > 0 && !disabled
              ? "bg-amber-400 hover:bg-amber-500 text-amber-950 active:scale-95"
              : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
          )}
        >
          <Lightbulb size={16} /> 
          Pista
        </button>
      </div>

      <div className="flex flex-col gap-2 relative">
        {KEYS.map((row, i) => (
          <div key={i} className="flex justify-center gap-1 md:gap-2">
            {row.map((key) => {
              const isGuessed = guessedLetters.includes(key);
              const isCorrectGuess = isGuessed && word.toUpperCase().includes(key);
              const isWrongGuess = isGuessed && !word.toUpperCase().includes(key);
              
              return (
                <motion.button
                  key={key}
                  disabled={isGuessed || disabled}
                  onClick={() => onGuess(key)}
                  whileTap={!isGuessed && !disabled ? { scale: 0.9 } : undefined}
                  animate={
                    isCorrectGuess ? { scale: [1, 1.15, 1] } :
                    isWrongGuess ? { x: [0, -4, 4, -4, 4, 0] } :
                    { scale: 1, x: 0 }
                  }
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "h-12 flex-1 max-w-[40px] md:max-w-[48px] rounded-lg font-bold text-lg md:text-xl transition-colors shadow-sm",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    isCorrectGuess ? "bg-green-500 text-white shadow-none" : "",
                    isWrongGuess ? "bg-zinc-300 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-600 shadow-none opacity-50" : "",
                    !isGuessed ? "bg-background text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-border" : ""
                  )}
                >
                  {key}
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
