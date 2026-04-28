import { create } from 'zustand';

export type GameStatus = 'LOBBY' | 'WAITING_ROOM' | 'PLAYING' | 'COUNTDOWN' | 'VOTING' | 'RESULTS' | 'GAME_OVER';

export interface Player {
  id: string;
  name: string;
  isHost?: boolean;
  score?: number;
}

interface StopState {
  playerName: string;
  roomCode: string;
  isHost: boolean;
  gameStatus: GameStatus;
  currentLetter: string;
  players: Player[];
  
  // Acciones
  setPlayerName: (name: string) => void;
  setRoomCode: (code: string) => void;
  setIsHost: (isHost: boolean) => void;
  setGameStatus: (status: GameStatus) => void;
  setCurrentLetter: (letter: string) => void;
  setPlayers: (players: Player[]) => void;
  resetStore: () => void;
}

const initialState = {
  playerName: '',
  roomCode: '',
  isHost: false,
  gameStatus: 'LOBBY' as GameStatus,
  currentLetter: '',
  players: [],
};

export const useStopStore = create<StopState>((set) => ({
  ...initialState,
  
  setPlayerName: (name) => set({ playerName: name }),
  setRoomCode: (code) => set({ roomCode: code }),
  setIsHost: (isHost) => set({ isHost }),
  setGameStatus: (status) => set({ gameStatus: status }),
  setCurrentLetter: (letter) => set({ currentLetter: letter }),
  setPlayers: (players) => set({ players }),
  
  resetStore: () => set(initialState),
}));
