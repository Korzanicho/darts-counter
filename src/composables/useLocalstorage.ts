import type { Player } from '../interfaces'

export const useLocalstorage = () => {

	const savePlayers = (players: Player[]) => {
		localStorage.setItem('players', JSON.stringify(players));
	};

	const getPlayers = () => {
		const players = localStorage.getItem('players');
		if (players) {
			return JSON.parse(players);
		}
		return [];
	};

	const saveWinners = (winners: Player[]) => {
		localStorage.setItem('winners', JSON.stringify(winners));
	};

	const getWinners = () => {
		const winners = localStorage.getItem('winners');
		if (winners) {
			return JSON.parse(winners);
		}
		return [];
	};

	const saveState = (state: string) => {
		localStorage.setItem('state', state);
	};

	const getState = () => {
		const state = localStorage.getItem('state');
		if (state) {
			return state;
		}
		return 'before';
	};

	const saveCurrentPlayerId = (id: number) => {
		localStorage.setItem('currentPlayerId', id.toString());
	};

	const getCurrentPlayerId = () => {
		const id = localStorage.getItem('currentPlayerId');
		if (id) {
			return parseInt(id);
		}
		return 0;
	};

	const saveCurrentTurn = (turn: number) => {
		localStorage.setItem('currentTurn', turn.toString());
	};

	const getCurrentTurn = () => {
		const turn = localStorage.getItem('currentTurn');
		if (turn) {
			return parseInt(turn);
		}
		return 0;
	};

	const saveCurrentWinnerName = (name: string) => {
		localStorage.setItem('currentWinnerName', name);
	};

	const getCurrentWinnerName = () => {
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