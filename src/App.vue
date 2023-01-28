<script setup lang="ts">
import DartTable from './components/DartTable.vue'
import PlayerList from './components/PlayerList.vue'
import NewPlayerForm from '@/components/NewPlayerForm.vue'
import TheLeaderboard from './components/TheLeaderboard.vue'

import { usePlayers } from './composables/usePlayers'
import { useGame } from './composables/useGame'

const { getPlayers } = usePlayers();
const { getState, setState } = useGame();
</script>

<template>
  <div class="before-game" v-if="getState === 'before'">
    <NewPlayerForm />
    <PlayerList />
    <v-btn
      color="primary"
      :disabled="getPlayers.length < 1"
      @click="setState('playing')"
    >
      START
    </v-btn>
  </div>

  <div class="game" v-else>
    <!-- <DartTable /> -->
    <TheLeaderboard />
  </div>
</template>

<style lang="sass" scoped>
</style>
