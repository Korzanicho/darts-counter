import type { Player, UseLocaLstorage } from '../interfaces'

export const useLocalstorage: Function = (): UseLocaLstorage => {

	const savePlayers = (players: Player[]): void => {
		localStorage.setItem('players', JSON.stringify(players));
	};

	const getPlayers = (): Player[] => {
		const players = localStorage.getItem('players');
		if (players) {
			return JSON.parse(players);
		}
		return [];
	};

	const saveWinners = (winners: Player[]): void => {
		localStorage.setItem('winners', JSON.stringify(winners));
	};

	const getWinners = (): Player[] => {
		const winners = localStorage.getItem('winners');
		if (winners) {
			return JSON.parse(winners);
		}
		return [];
	};

	const saveState = (state: string): void => {
		localStorage.setItem('state', state);
	};

	const getState = (): string => {
		const state = localStorage.getItem('state');
		if (state) {
			return state;
		}
		return 'before';
	};

	const saveCurrentPlayerId = (id: number): void => {
		localStorage.setItem('currentPlayerId', id.toString());
	};

	const getCurrentPlayerId = (): number => {
		const id = localStorage.getItem('currentPlayerId');
		if (id) {
			return parseInt(id);
		}
		return 0;
	};

	const saveCurrentTurn = (turn: number): void => {
		localStorage.setItem('currentTurn', turn.toString());
	};

	const getCurrentTurn = (): number => {
		const turn = localStorage.getItem('currentTurn');
		if (turn) {
			return parseInt(turn);
		}
		return 0;
	};

	const saveCurrentWinnerName = (name: string): void => {
		localStorage.setItem('currentWinnerName', name);
	};

	const getCurrentWinnerName = (): string => {
		const name = localStorage.getItem('currentWinnerName');
		if (name) {
			return name;
		}
		return '';
	};

	return {
		getState,
		getPlayers,
		getWinners,
		getCurrentTurn,
		getCurrentPlayerId,
		getCurrentWinnerName,

		saveState,
		saveWinners,
		savePlayers,
		saveCurrentTurn,
		saveCurrentPlayerId,
		saveCurrentWinnerName,
	};
};