import type { ComputedRef } from 'vue';
export interface Players {
  value: Player[],
}

export interface Player {
  id: number,
  name: string,
  color: string,
  score: number,
}

export interface UsePlayers {
  players: Players;
  getPlayers: ComputedRef<Player[]>;
  setScore: (id: number, score: number) => void;
  addPlayer: (player: Player) => void;
  setPlayers: (newPlayers: Player[]) => void;
  editPlayer: (player: Player) => void;
  resetScores: () => void;
  removePlayer: (id: number) => void;
  removePlayers: () => void;
  getPlayerById: (id: number) => Player | undefined;
  addPlayerPoints: (id: number, points: number) => void;
}

export interface UseLocaLstorage {
  savePlayers: (players: Player[]) => void;
  getPlayers: () => Player[];
  saveWinners: (winners: Player[]) => void;
  getWinners: () => Player[];
  saveState: (state: string) => void;
  getState: () => string;
  saveCurrentPlayerId: (id: number) => void;
  getCurrentPlayerId: () => number;
  saveCurrentTurn: (turn: number) => void;
  getCurrentTurn: () => number;
  saveCurrentWinnerName: (name: string) => void;
  getCurrentWinnerName: () => string;
}

export interface UseGame {
  getState: ComputedRef<string>;
  setState: (state: string) => void;
  getCurrentTurn: ComputedRef<number>;
  setCurrentTurn: (turn: number) => void;
  getCurrentPlayerId: ComputedRef<number>;
  setCurrentPlayerId: (id: number) => void;
  getCurrentWinnerName: ComputedRef<string>;
  setCurrentWinnerName: (name: string) => void;
  addWinner: (winner: Player) => void;
  getWinners: ComputedRef<Player[]>;
  resetGame: () => void;
  getDarts: ComputedRef<number>;
  setDarts: (darts: number) => void;
  changePlayerToNext: () => void;
}