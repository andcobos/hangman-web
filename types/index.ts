export type GameMode = 'solo' | 'multiplayer';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameState = 'menu' | 'setup' | 'transition' | 'playing' | 'gameover';
export type Turn = 'red' | 'blue';

export interface PlayerScore {
  red: number;
  blue: number;
}

export interface GameSettings {
  mode: GameMode;
  difficulty: Difficulty;
  maxHints: number;
}

export interface WordInfo {
  word: string;
  category: string;
}

export type Theme = 'dark' | 'light' | 'modern' | 'retro';

export interface GameStore {
  // Navigation & State
  gameState: GameState;
  setGameState: (state: GameState) => void;
  
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
  
  // Configuration
  settings: GameSettings;
  setSettings: (settings: Partial<GameSettings>) => void;
  
  // In-Game State
  currentWord: WordInfo | null;
  setCurrentWord: (word: WordInfo | null) => void;
  
  guessedLetters: string[];
  addGuessedLetter: (letter: string) => void;
  
  wrongGuesses: number;
  incrementWrongGuesses: () => void;
  
  hintsRemaining: number;
  useHint: (letter: string) => void;
  
  // Multiplayer specifics
  currentTurn: Turn;
  toggleTurn: () => void;
  scores: PlayerScore;
  updateScore: (player: Turn, points: number) => void;
  playerNames: { red: string; blue: string };
  setPlayerNames: (redName: string, blueName: string) => void;
  
  // Actions
  resetGame: () => void;
  startNewRound: (wordInfo: WordInfo) => void;
  resetRound: () => void;
  resetToMenu: () => void;
}
