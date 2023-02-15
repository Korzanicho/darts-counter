<script setup lang="ts">
import { onMounted } from 'vue'
import EndGame from './components/EndGame.vue'
import TurnInfo from '@/components/TurnInfo.vue'
import DartTable from '@/components/DartTable.vue'
import PlayerList from '@/components/PlayerList.vue'
import NewPlayerForm from '@/components/NewPlayerForm.vue'
import TheLeaderboard from '@/components/TheLeaderboard.vue'

import { useGame } from './composables/useGame'
import { usePlayers } from './composables/usePlayers'
import { useLocalstorage } from './composables/useLocalstorage'

const { getPlayers } = usePlayers();
const { getState, setState, setCurrentPlayerId, setCurrentTurn } = useGame();

const startGame = () => {
  setCurrentTurn(1)
  setState('playing')
  setCurrentPlayerId(getPlayers.value[0].id);
}

const restoreData = () => {
  const state = useLocalstorage().getState();
  const players = useLocalstorage().getPlayers();
  const currentTurn = useLocalstorage().getCurrentTurn();
  const currentPlayerId = useLocalstorage().getCurrentPlayerId();

  if (!players) return;

  usePlayers().setPlayers(players);

  if (state && currentPlayerId) {
    setState(state);
    setCurrentTurn(currentTurn);
    setCurrentPlayerId(currentPlayerId);
  }
}

onMounted(() => {
  restoreData();
})
</script>

<template>
  <div class="app pa-4">
    <div class="before-game" v-if="getState === 'before'">
      <NewPlayerForm />
      <PlayerList />
      <v-btn
        class="mx-auto d-block"
        color="primary"
        size="x-large"
        :disabled="getPlayers.length < 1"
        @click="startGame"
      >
        START
      </v-btn>
    </div>
  
    <div class="game" v-if="getState === 'playing'">
      <TurnInfo />
      <v-row class="pa-3">
        <v-col cols="12" md="6">
          <DartTable />
        </v-col>
        <v-col cols="12" md="6">
          <TheLeaderboard />
        </v-col>
      </v-row>
    </div>

    <div class="after-game" v-if="getState === 'after'">
      <EndGame />
    </div>
  </div>
</template>

<style lang="sass" scoped>
</style>
