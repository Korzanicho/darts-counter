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

export const useGame = () => {
  
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

  const changePlayerToNext = () => {
    const players = usePlayers().getPlayers.value;
    const currentPlayerIndex = players.findIndex(player => player.id === currentPlayerId.value);
    const nextPlayerIndex = currentPlayerIndex + 1;
    if (nextPlayerIndex >= players.length) {
      setCurrentPlayerId(players[0].id);
      setCurrentTurn(currentTurn.value++);
    } else {
      setCurrentPlayerId(players[nextPlayerIndex].id);
    }
  };

  const getState = computed(() => state.value);
  const getDarts = computed(() => darts.value);
  const getCurrentTurn = computed(() => currentTurn.value);
  const getCurrentPlayerId = computed(() => currentPlayerId.value);
  
  return {
    getState,
    getDarts,
    getCurrentTurn,
    getCurrentPlayerId,
		setState,
    setDarts,
    setCurrentTurn,
    setCurrentPlayerId,
    changePlayerToNext,
  }
}