<template>
  <v-container>
    <v-form ref="form" @submit.prevent="addNewPlayer">
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            label="Nazwa gracza"
            v-model="playerName"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-btn type="submit" color="primary">Dodaj gracza</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePlayers } from '../composables/usePlayers'

import type { Player } from '../interfaces'
import type { Ref } from 'vue';

const { addPlayer } = usePlayers()

const colorOptions = [
	'#FFABCD', '#00FF00', '#0000FF',
	'#FFFF00', '#00FFFF', '#FF00FF',
	'#800000', '#808000', '#008080',
	'#008000', '#800080', '#000080',
]

const playerName: Ref<string> = ref('')

const addNewPlayer = () => {
	const player: Player = {
		id: Date.now(),
		name: playerName.value,
		color: colorOptions.shift() || '#FFABCD',
		points: 501,
	}
	addPlayer(player)
	playerName.value = ''
}
</script>