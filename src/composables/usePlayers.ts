import { Ref, computed, reactive } from 'vue'
import type { Player } from '../interfaces'

const players = reactive({
  value: []
});

export const usePlayers = () => {
  
  const addPlayer = (player: Player) => {
    console.log('addPlayer', player);
    players.value.push(player);
    console.log('players.value', players.value);
  };

  const removePlayer = (id: number) => {
    players.value = players.value.filter(player => player.id !== id);
  };

  const editPlayer = (player: Player) => {
    const playerIndex = players.value.findIndex(p => p.id === player.id);
    players.value.splice(playerIndex, 1, player);
  };

  const allPlayers = computed(() => players.value);
  
  return {
    players,
    addPlayer,
    removePlayer,
    editPlayer,
    allPlayers,
  }
}