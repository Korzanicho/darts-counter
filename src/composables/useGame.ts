import { Ref, computed, ref } from 'vue'
import type { Player } from '../interfaces'

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
    console.log('setCurrentPlayerId', id);
    currentPlayerId.value = id;
  };

  const setCurrentTurn = (newTurn: number) => {
    currentTurn.value = newTurn;
  };

  const setDarts = (newDarts: number) => {
    darts.value = newDarts;
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
  }
}