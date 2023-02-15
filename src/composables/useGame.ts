import { Ref, computed, ref } from 'vue'
import type { Player } from '../interfaces'
import { usePlayers } from './usePlayers'
import { useLocalstorage } from './useLocalstorage';

const localStorage = useLocalstorage();

const states = [
	'before',
	'playing',
	'after'
]

const state = ref(states[0]);
const currentPlayerId = ref<number>(0);
const currentTurn = ref(0);
const darts = ref(3);
const currentWinnerName = ref('');
const winners: Ref<Player[]> = ref([]);

export const useGame = () => {

  const addWinner = (player: Player) => {
    winners.value.push(player);
    localStorage.saveWinners(winners.value);
  }
  
  const setWinners = (newWinners: Player[]) => {
    winners.value = newWinners;
    localStorage.saveWinners(newWinners);
  };

  const setState = (newState: string) => {
    state.value = newState;
    localStorage.saveState(newState);
  };

  const setCurrentPlayerId = (id: number) => {
    currentPlayerId.value = id;
    localStorage.saveCurrentPlayerId(id);
  };

  const setCurrentTurn = (newTurn: number) => {
    currentTurn.value = newTurn;
    localStorage.saveCurrentTurn(newTurn);
  };

  const setDarts = (newDarts: number) => {
    darts.value = newDarts;
  };

  const setCurrentWinnerName = (name: string) => {
    currentWinnerName.value = name;
  };

  const changePlayerToNext = () => {
    let players: Player[] = usePlayers().getPlayers.value;
    players = players.filter(player => player.score != 0);

    const currentPlayerIndex = players.findIndex(player => player.id === currentPlayerId.value);
    const nextPlayerIndex = currentPlayerIndex + 1;
    if (nextPlayerIndex >= players.length) {
      setCurrentPlayerId(players[0].id);
      setCurrentTurn(getCurrentTurn.value + 1);
    } else {
      setCurrentPlayerId(players[nextPlayerIndex].id);
    }
  };

  const resetGame = () => {
    setState(states[0]);
    setCurrentPlayerId(0);
    setCurrentTurn(0);
    setDarts(3);
    setCurrentWinnerName('');
    setWinners([]);
    usePlayers().resetScores();
  };


  const getState = computed(() => state.value);
  const getDarts = computed(() => darts.value);
  const getWinners = computed(() => winners.value);
  const getCurrentTurn = computed(() => currentTurn.value);
  const getCurrentPlayerId = computed(() => currentPlayerId.value);
  const getCurrentWinnerName = computed(() => currentWinnerName.value);
  
  return {
    getState,
    getDarts,
    getWinners,
    getCurrentTurn,
    getCurrentPlayerId,
    getCurrentWinnerName,
		setState,
    setDarts,
    addWinner,
    resetGame,
    setCurrentTurn,
    setCurrentPlayerId,
    changePlayerToNext,
    setCurrentWinnerName
  }
}