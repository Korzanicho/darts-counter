import { Ref, computed, ref } from 'vue'
import type { ComputedRef } from 'vue'
import type { Player, UseGame } from '@/interfaces'
import { usePlayers } from './usePlayers'
import { useLocalstorage } from './useLocalstorage'

const localStorage = useLocalstorage()

const states: string[] = ['before', 'playing', 'after']

const state: Ref<string> = ref(states[0])
const currentPlayerId: Ref<number> = ref(0)
const currentTurn: Ref<number> = ref(0)
const darts: Ref<number> = ref(3)
const currentWinnerName: Ref<string> = ref('')
const winners: Ref<Player[]> = ref([])
const memo: Ref = ref([])

const setMemo = (newMemo: number[]): void => {
  memo.value = newMemo
  localStorage.saveMemo(newMemo)
}

const resetMemo = (): void => {
  memo.value.length = 0
  localStorage.saveMemo(memo.value)
}
const addMemo = (score: number): void => {
  memo.value.push(score)
  localStorage.saveMemo(memo.value)
}
const getLatestMemo = (): number => {
  const lastScore = memo.value.pop()
  localStorage.saveMemo(memo.value)
  return lastScore
}

export const useGame: Function = (): UseGame => {
  const addWinner = (player: Player): void => {
    winners.value.push(player)
    localStorage.saveWinners(winners.value)
  }

  const setWinners = (newWinners: Player[]): void => {
    winners.value = newWinners
    localStorage.saveWinners(newWinners)
  }

  const setState = (newState: string): void => {
    state.value = newState
    localStorage.saveState(newState)
  }

  const setCurrentPlayerId = (id: number): void => {
    currentPlayerId.value = id
    localStorage.saveCurrentPlayerId(id)
  }

  const setCurrentTurn = (newTurn: number): void => {
    currentTurn.value = newTurn
    localStorage.saveCurrentTurn(newTurn)
  }

  const setDarts = (newDarts: number): void => {
    darts.value = newDarts
    localStorage.saveDarts(newDarts)
  }

  const setCurrentWinnerName = (name: string): void => {
    currentWinnerName.value = name
  }

  const changePlayerToNext = (): void => {
    let players: Player[] = usePlayers().getPlayers.value
    players = players.filter((player) => player.score != 0)

    const currentPlayerIndex: number = players.findIndex(
      (player) => player.id === currentPlayerId.value
    )
    const nextPlayerIndex: number = currentPlayerIndex + 1
    if (nextPlayerIndex >= players.length) {
      setCurrentPlayerId(players[0].id)
      setCurrentTurn(getCurrentTurn.value + 1)
    } else {
      setCurrentPlayerId(players[nextPlayerIndex].id)
    }
  }

  const resetGame = (): void => {
    setState(states[0])
    setCurrentPlayerId(0)
    setCurrentTurn(0)
    setDarts(3)
    setCurrentWinnerName('')
    setWinners([])
    usePlayers().resetScores()
  }

  const getMemo: ComputedRef<number[]> = computed(() => memo.value)
  const getState: ComputedRef<string> = computed(() => state.value)
  const getDarts: ComputedRef<number> = computed(() => darts.value)
  const getWinners: ComputedRef<Player[]> = computed(() => winners.value)
  const getCurrentTurn: ComputedRef<number> = computed(() => currentTurn.value)
  const getCurrentPlayerId: ComputedRef<number> = computed(
    () => currentPlayerId.value
  )
  const getCurrentWinnerName: ComputedRef<string> = computed(
    () => currentWinnerName.value
  )

  return {
    getMemo,
    getState,
    getDarts,
    getWinners,
    getCurrentTurn,
    getCurrentPlayerId,
    getCurrentWinnerName,
    addMemo,
    setMemo,
    setState,
    setDarts,
    resetMemo,
    addWinner,
    resetGame,
    getLatestMemo,
    setCurrentTurn,
    setCurrentPlayerId,
    changePlayerToNext,
    setCurrentWinnerName,
  }
}
