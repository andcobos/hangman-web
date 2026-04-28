import { motion } from 'framer-motion';
import { useHangmanLogic } from '@/components/hangman/hooks/useHangmanLogic';
import { useHangmanStore } from '@/store/useHangmanStore';
import { HangmanDrawing } from '@/components/hangman/ui/HangmanDrawing';
import { WordDisplay } from '@/components/hangman/ui/WordDisplay';
import { VirtualKeyboard } from '@/components/hangman/ui/VirtualKeyboard';
import { cn } from '@/lib/utils';
import { Tag } from 'lucide-react';

export const GameScreen = () => {
  const { currentWord, guessedLetters, wrongGuesses, settings, currentTurn, scores, playerNames } = useHangmanStore();
  const { guess, isWinner, isLoser, maxErrors } = useHangmanLogic();

  if (!currentWord) return null;

  const guesserName = currentTurn === 'red' ? playerNames.red : playerNames.blue;
  const guesserColor = currentTurn === 'red' ? 'text-red-500' : 'text-blue-500';

  return (
    <motion.div
      className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 md:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Header / Top Bar */}
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex flex-col">
          {settings.mode === 'multiplayer' && (
            <span className={cn("font-bold text-lg", guesserColor)}>
              Turno: {guesserName}
            </span>
          )}
          <span className="text-sm text-muted-foreground font-medium flex items-center gap-1">
            <Tag size={14} /> <b>Categoría:</b> {currentWord.category}
          </span>
        </div>

        <div className="flex flex-col items-end">
          <span className={cn(
            "font-bold text-lg transition-colors",
            wrongGuesses >= maxErrors - 1 ? "text-red-500" : "text-foreground"
          )}>
            Errores: {wrongGuesses} / {maxErrors}
          </span>
          {settings.mode === 'multiplayer' && (
            <div className="text-sm font-semibold flex gap-3 text-muted-foreground">
              <span className="text-red-500 text-shadow-sm truncate max-w-[100px]" title={playerNames.red}>{playerNames.red}: {scores.red}</span>
              <span className="text-blue-500 text-shadow-sm truncate max-w-[100px]" title={playerNames.blue}>{playerNames.blue}: {scores.blue}</span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-8">
        <HangmanDrawing wrongGuesses={wrongGuesses} difficulty={settings.difficulty} />
      </div>

      <WordDisplay
        word={currentWord.word}
        guessedLetters={guessedLetters}
        isGameOver={isWinner || isLoser}
      />

      <div className="w-full mt-4">
        <VirtualKeyboard
          onGuess={guess}
          guessedLetters={guessedLetters}
          disabled={isWinner || isLoser}
          word={currentWord.word}
        />
      </div>
    </motion.div>
  );
};
