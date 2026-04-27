import { motion } from 'framer-motion';

interface WordDisplayProps {
  word: string;
  guessedLetters: string[];
  isGameOver: boolean;
}

export const WordDisplay = ({ word, guessedLetters, isGameOver }: WordDisplayProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 my-8">
      {word.split('').map((letter, index) => {
        if (letter === ' ') {
          return <div key={index} className="w-4 md:w-8" />;
        }
        
        const isGuessed = guessedLetters.includes(letter.toUpperCase());
        const showLetter = isGuessed || isGameOver;
        const colorClass = !isGuessed && isGameOver ? 'text-red-500' : 'text-foreground';

        return (
          <div 
            key={index} 
            className="flex flex-col items-center justify-center"
          >
            <div className={`h-10 w-8 md:h-14 md:w-10 flex items-center justify-center text-2xl md:text-3xl font-bold uppercase transition-all duration-300 ${colorClass}`}>
              {showLetter && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {letter}
                </motion.span>
              )}
            </div>
            <div className="w-full h-1 bg-foreground/30 rounded-full" />
          </div>
        );
      })}
    </div>
  );
};
