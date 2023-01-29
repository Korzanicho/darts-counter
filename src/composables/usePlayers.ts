import { Ref, computed, reactive } from 'vue'
import type { Player } from '../interfaces'

const players = reactive({
  value: []
});

export const usePlayers = () => {

  const addPlayerPoints = (id: number, points: number) => {
    const playerIndex = players.value.findIndex(player => player.id === id);
    if (players.value[playerIndex].score - points < 0) return;
    players.value[playerIndex].score -= points;
  };

  const setScore = (id: number, score: number) => {
    const playerIndex = players.value.findIndex(player => player.id === id);
    players.value[playerIndex].score = score;
  };
  
  const addPlayer = (player: Player) => {
    players.value.push(player);
  };

  const removePlayer = (id: number) => {
    players.value = players.value.filter(player => player.id !== id);
  };

  const editPlayer = (player: Player) => {
    const playerIndex = players.value.findIndex(p => p.id === player.id);
    players.value.splice(playerIndex, 1, player);
  };

  const getPlayerById = (id: number) => {
    return players.value.find(player => player.id === id);
  };

  const getPlayers = computed(() => players.value);
  
  return {
    players,
    getPlayers,
    setScore,
    addPlayer,
    editPlayer,
    removePlayer,
    getPlayerById,
    addPlayerPoints
  }
}