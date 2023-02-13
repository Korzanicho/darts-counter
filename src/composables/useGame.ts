import { Ref, computed, ref } from 'vue'
import type { Player } from '../interfaces'
import { usePlayers } from './usePlayers'

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
  }
  
  const setState = (newState: string) => {
    state.value = newState;
  };

  const setCurrentPlayerId = (id: number) => {
    currentPlayerId.value = id;
  };

  const setCurrentTurn = (newTurn: number) => {
    currentTurn.value = newTurn;
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
      setCurrentTurn(currentTurn.value++);
    } else {
      setCurrentPlayerId(players[nextPlayerIndex].id);
    }
  };

  const resetGame = () => {
    state.value = states[0];
    currentPlayerId.value = 0;
    currentTurn.value = 0;
    darts.value = 3;
    currentWinnerName.value = '';
    winners.value = [];
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