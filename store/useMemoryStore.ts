import { create } from 'zustand';
import type { LucideIcon } from 'lucide-react';

export type GameMode = 'SOLO' | 'MULTI';
export type GameStatus = 'SETUP' | 'PREVIEW' | 'PLAYING' | 'GAME_OVER';
export type Theme = 'TECHNOLOGY' | 'ANIMALS';

export interface MemoryCard {
  id: string;
  icon: LucideIcon;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryState {
  status: GameStatus;
  mode: GameMode;
  theme: Theme;
  gridSize: 8 | 12 | 16;
  cards: MemoryCard[];
  flippedIndices: number[];
  isLocked: boolean;
  player1Score: number;
  player2Score: number;
  currentPlayer: 1 | 2;
  attempts: number;
  
  // Actions
  setStatus: (status: GameStatus) => void;
  setMode: (mode: GameMode) => void;
  setTheme: (theme: Theme) => void;
  setGridSize: (size: 8 | 12 | 16) => void;
  setCards: (cards: MemoryCard[]) => void;
  startGame: (cards: MemoryCard[]) => void;
  flipCard: (index: number) => void;
  evaluateMatch: () => void;
  resetGame: () => void;
  endPreview: () => void;
}

export const useMemoryStore = create<MemoryState>((set, get) => ({
  status: 'SETUP',
  mode: 'SOLO',
  theme: 'TECHNOLOGY',
  gridSize: 12,
  cards: [],
  flippedIndices: [],
  isLocked: false,
  player1Score: 0,
  player2Score: 0,
  currentPlayer: 1,
  attempts: 0,

  setStatus: (status) => set({ status }),
  setMode: (mode) => set({ mode }),
  setTheme: (theme) => set({ theme }),
  setGridSize: (gridSize) => set({ gridSize }),
  setCards: (cards) => set({ cards }),
  
  startGame: (initialCards) => set({
    status: 'PREVIEW',
    cards: initialCards.map(c => ({ ...c, isFlipped: true })), // All face up initially
    flippedIndices: [],
    isLocked: true, // Locked during preview
    player1Score: 0,
    player2Score: 0,
    currentPlayer: 1,
    attempts: 0,
  }),

  endPreview: () => set((state) => ({
    status: 'PLAYING',
    isLocked: false,
    cards: state.cards.map(c => ({ ...c, isFlipped: false })) // Face down
  })),

  flipCard: (index) => set((state) => {
    // If locked, already matched, already flipped, or we already have 2 flipped
    if (
      state.isLocked ||
      state.status !== 'PLAYING' ||
      state.cards[index].isMatched ||
      state.cards[index].isFlipped ||
      state.flippedIndices.length >= 2
    ) {
      return state;
    }

    const newCards = [...state.cards];
    newCards[index] = { ...newCards[index], isFlipped: true };

    const newFlippedIndices = [...state.flippedIndices, index];

    // If we just flipped the second card, lock the board to prevent more clicks until evaluateMatch
    const shouldLock = newFlippedIndices.length === 2;

    return {
      cards: newCards,
      flippedIndices: newFlippedIndices,
      isLocked: shouldLock,
      attempts: state.mode === 'SOLO' && shouldLock ? state.attempts + 1 : state.attempts
    };
  }),

  evaluateMatch: () => set((state) => {
    if (state.flippedIndices.length !== 2) return state;

    const [index1, index2] = state.flippedIndices;
    const card1 = state.cards[index1];
    const card2 = state.cards[index2];

    const isMatch = card1.icon === card2.icon;
    const newCards = [...state.cards];

    let newPlayer1Score = state.player1Score;
    let newPlayer2Score = state.player2Score;
    let nextPlayer = state.currentPlayer;

    if (isMatch) {
      newCards[index1] = { ...newCards[index1], isMatched: true };
      newCards[index2] = { ...newCards[index2], isMatched: true };

      if (state.mode === 'MULTI') {
        if (state.currentPlayer === 1) newPlayer1Score += 1;
        else newPlayer2Score += 1;
        // Same player keeps the turn if match
      }
    } else {
      // Flip back
      newCards[index1] = { ...newCards[index1], isFlipped: false };
      newCards[index2] = { ...newCards[index2], isFlipped: false };

      if (state.mode === 'MULTI') {
        // Switch turn if no match
        nextPlayer = state.currentPlayer === 1 ? 2 : 1;
      }
    }

    // Check game over
    const allMatched = newCards.every(c => c.isMatched);

    return {
      cards: newCards,
      flippedIndices: [],
      isLocked: false,
      player1Score: newPlayer1Score,
      player2Score: newPlayer2Score,
      currentPlayer: nextPlayer,
      status: allMatched ? 'GAME_OVER' : state.status
    };
  }),

  resetGame: () => set({
    status: 'SETUP',
    cards: [],
    flippedIndices: [],
    isLocked: false,
    player1Score: 0,
    player2Score: 0,
    currentPlayer: 1,
    attempts: 0
  })
}));
