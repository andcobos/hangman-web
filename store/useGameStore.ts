import { create } from 'zustand';
import { GameStore, GameSettings } from '@/types';

const defaultSettings: GameSettings = {
  mode: 'solo',
  difficulty: 'medium',
  maxHints: 3,
};

export const useGameStore = create<GameStore>((set) => ({
  gameState: 'menu',
  setGameState: (state) => set({ gameState: state }),

  settings: defaultSettings,
  setSettings: (newSettings) => set((state) => ({ 
    settings: { ...state.settings, ...newSettings } 
  })),

  currentWord: null,
  setCurrentWord: (word) => set({ currentWord: word }),

  guessedLetters: [],
  addGuessedLetter: (letter) => set((state) => {
    if (state.guessedLetters.includes(letter)) return state;
    return { guessedLetters: [...state.guessedLetters, letter] };
  }),

  wrongGuesses: 0,
  incrementWrongGuesses: () => set((state) => ({ wrongGuesses: state.wrongGuesses + 1 })),

  hintsRemaining: 3,
  useHint: (letter) => set((state) => {
    if (state.hintsRemaining <= 0 || state.guessedLetters.includes(letter)) return state;
    return {
      hintsRemaining: state.hintsRemaining - 1,
      guessedLetters: [...state.guessedLetters, letter]
    };
  }),

  currentTurn: 'red',
  toggleTurn: () => set((state) => ({ 
    currentTurn: state.currentTurn === 'red' ? 'blue' : 'red' 
  })),

  scores: { red: 0, blue: 0 },
  updateScore: (player, points) => set((state) => ({
    scores: { ...state.scores, [player]: state.scores[player] + points }
  })),

  resetGame: () => set({
    gameState: 'menu',
    settings: defaultSettings,
    currentWord: null,
    guessedLetters: [],
    wrongGuesses: 0,
    hintsRemaining: 3,
    currentTurn: 'red',
    scores: { red: 0, blue: 0 },
  }),

  startNewRound: (wordInfo) => set((state) => ({
    gameState: 'playing',
    currentWord: wordInfo,
    guessedLetters: [],
    wrongGuesses: 0,
    hintsRemaining: state.settings.maxHints,
    // currentTurn and scores remain from previous rounds if in multi
  })),

  resetRound: () => set((state) => ({
    guessedLetters: [],
    wrongGuesses: 0,
    hintsRemaining: state.settings.maxHints,
  }))
}));
