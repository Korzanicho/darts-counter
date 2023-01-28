import { Ref, computed, ref } from 'vue'
import type { Player } from '../interfaces'

const states = [
	'before',
	'playing',
	'after'
]

const state = ref(states[0]);

export const useGame = () => {
  
  const setState = (newState: string) => {
    state.value = newState;
  };

  const getState = computed(() => state.value);
  
  return {
    getState,
		setState,
  }
}