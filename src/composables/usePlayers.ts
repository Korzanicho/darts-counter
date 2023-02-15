import { Ref, computed, reactive } from 'vue'
import { useGame } from './useGame'
import { useLocalstorage } from './useLocalstorage';
import type { Player } from '../interfaces'

const players = reactive({
  value: []
});

export const usePlayers = () => {

  const addPlayerPoints = (id: number, points: number) => {
    const playerIndex = players.value.findIndex(player => player.id === id);
    if (players.value[playerIndex].score - points < 0) return;
    players.value[playerIndex].score -= points;

    if (players.value[playerIndex].score === 0) {
      useGame().setState('after');
      useGame().setCurrentWinnerName(players.value[playerIndex].name);
      useGame().addWinner(players.value[playerIndex]);
    }

    useLocalstorage().savePlayers(players.value);
  };

  const setScore = (id: number, score: number) => {
    const playerIndex = players.value.findIndex(player => player.id === id);
    players.value[playerIndex].score = score;

    useLocalstorage().savePlayers(players.value); 
  };
  
  const addPlayer = (player: Player) => {
    players.value.push(player);

    useLocalstorage().savePlayers(players.value);
  };

  const setPlayers = (newPlayers: Player[]) => {
    players.value = newPlayers;
  };

  const removePlayer = (id: number) => {
    players.value = players.value.filter(player => player.id !== id);

    useLocalstorage().savePlayers(players.value);
  };

  const editPlayer = (player: Player) => {
    const playerIndex = players.value.findIndex(p => p.id === player.id);
    players.value.splice(playerIndex, 1, player);

    useLocalstorage().savePlayers(players.value);
  };

  const getPlayerById = (id: number) => {
    return players.value.find(player => player.id === id);
  };

  const getPlayers = computed(() => players.value);

  const removePlayers = () => {
    players.value = [];
    useLocalstorage().savePlayers(players.value);
  };

  const resetScores = () => {
    players.value.forEach(player => {
      player.score = 501;
    });
    useLocalstorage().savePlayers(players.value);
  };
  
  return {
    players,
    getPlayers,
    setScore,
    addPlayer,
    setPlayers,
    editPlayer,
    resetScores,
    removePlayer,
    removePlayers,
    getPlayerById,
    addPlayerPoints
  }
}