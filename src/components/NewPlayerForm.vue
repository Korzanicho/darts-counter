<template>
  <v-container class="new-player-form">
    <v-form
      ref="form"
      @submit.prevent="addNewPlayer"
    >
      <v-row class="justify-center">
        <v-col cols="7">
          <v-text-field
            label="Player name"
            v-model="playerName"
            required
          />
        </v-col>
        <v-col cols="4">
          <v-btn
            class="mx-auto"
            type="submit"
            color="primary"
            height="55px"
          >
            Add
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePlayers } from '@/composables/usePlayers';

import type { Player } from '@/interfaces';
import type { Ref } from 'vue';

const { addPlayer, getPlayers } = usePlayers();

const colorOptions = [
  '#d5759d',
  '#58b958',
  '#4848ce',
  '#c7c761',
  '#3dc0c0',
  '#d243d2',
  '#f14646',
  '#808000',
  '#008080',
  '#008000',
  '#800080',
  '#000080',
];

const playerName: Ref<string> = ref('');

const addNewPlayer = (): any => {
  const colors = colorOptions.filter((color) => !getPlayers.value.some((player: Player) => player.color == color));
  const player: Player = {
    id: Date.now(),
    name: playerName.value,
    color: colors.shift() || '#FFABCD',
    score: 501,
  };
  addPlayer(player);
  playerName.value = '';
};
</script>

<style scoped lang="sass">
.new-player-form
  max-width: 500px
</style>
