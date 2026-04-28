import { useEffect, useCallback } from 'react';
import { useHangmanStore } from '@/store/useHangmanStore';

export const useHangmanLogic = () => {
  const {
    currentWord,
    guessedLetters,
    wrongGuesses,
    settings,
    addGuessedLetter,
    incrementWrongGuesses,
    setGameState,
    currentTurn,
    toggleTurn,
  } = useHangmanStore();

  const maxErrors = settings.difficulty === 'easy' ? 4 : settings.difficulty === 'medium' ? 6 : 8;

  const isWinner = currentWord &&
    currentWord.word.toUpperCase().split('').every((letter) => guessedLetters.includes(letter) || letter === ' ');

  const isLoser = wrongGuesses >= maxErrors;

  useEffect(() => {
    if (isWinner || isLoser) {
      const timer = setTimeout(() => setGameState('gameover'), 800);
      return () => clearTimeout(timer);
    }
  }, [isWinner, isLoser, setGameState]);

  const guess = useCallback((letter: string) => {
    const uppercaseLetter = letter.toUpperCase();
    if (guessedLetters.includes(uppercaseLetter) || isWinner || isLoser) {
      return;
    }

    addGuessedLetter(uppercaseLetter);

    if (currentWord && !currentWord.word.toUpperCase().includes(uppercaseLetter)) {
      incrementWrongGuesses();
    }
  }, [guessedLetters, isWinner, isLoser, addGuessedLetter, currentWord, incrementWrongGuesses]);

  // Handle Keyboard events
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-zñ]$/i)) return; // Allow ñ
      e.preventDefault();
      guess(key);
    };

    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guess]);

  return { guess, isWinner, isLoser, maxErrors };
};
