<template>
  <v-container class="player-list">
    <v-row>
      <v-col
        v-for="(player, index) in getPlayers"
        :key="index"
        cols="12"
      >
        <div class="player-list__wrapper pa-5 rounded-lg">
          <h2
            class="player-list__name"
            :style="{ '--color-player': player.color }"
          >
            {{ player.name }}
          </h2>
          <button
            class="player-list__remove-btn"
            @click="removePlayer(player.id)"
          >
            X
          </button>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { usePlayers } from '@/composables/usePlayers';

const { getPlayers, removePlayer } = usePlayers();
</script>

<style lang="sass" scoped>
.player-list
  max-width: 500px
  &__wrapper
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 1rem
    background: #fff
  &__name
    color: #000
    font-weight: 700
    font-size: 1.5rem
    &::before
      content: ''
      display: inline-block
      width: 1rem
      height: 1rem
      margin-right: 1rem
      background-color: var(--color-player)
  &__remove-btn
    font-size: 1.5rem
    font-weight: 700
    color: #000
    background: transparent
    border: none
    cursor: pointer
</style>
