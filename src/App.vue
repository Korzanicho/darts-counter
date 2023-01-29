<script setup lang="ts">
import TurnInfo from '@/components/TurnInfo.vue'
import DartTable from '@/components/DartTable.vue'
import PlayerList from '@/components/PlayerList.vue'
import NewPlayerForm from '@/components/NewPlayerForm.vue'
import TheLeaderboard from '@/components/TheLeaderboard.vue'

import { usePlayers } from './composables/usePlayers'
import { useGame } from './composables/useGame'

const { getPlayers } = usePlayers();
const { getState, setState, setCurrentPlayerId, setCurrentTurn } = useGame();

const startGame = () => {
  setCurrentTurn(1)
  setState('playing')
  setCurrentPlayerId(getPlayers.value[0].id);
}

</script>

<template>
  <div class="app pa-4">
    <div class="before-game" v-if="getState === 'before'">
      <NewPlayerForm />
      <PlayerList />
      <v-btn
        color="primary"
        :disabled="getPlayers.length < 1"
        @click="startGame"
      >
        START
      </v-btn>
    </div>
  
    <div class="game" v-else>
      <TurnInfo />
      <DartTable />
      <TheLeaderboard />
    </div>
  </div>
</template>

<style lang="sass" scoped>
</style>
