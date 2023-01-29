<script setup lang="ts">
import { useGame } from '../composables/useGame'
import { usePlayers } from '../composables/usePlayers'

const { getDarts, getCurrentPlayerId, getCurrentTurn } = useGame();
const { getPlayerById } = usePlayers();

</script>
<template>
	<div class="turn-info text-center">
		<div class="turn-info__round-number">Round {{ getCurrentTurn }}</div>
		<div class="turn-info__player mt-2 mb-6">{{ getPlayerById(getCurrentPlayerId).name }}</div>
		<div class="turn-info__darts d-flex">
			<img src="@/assets/dart.svg" alt="Dart" class="turn-info__dart" v-for="i in getDarts" :key="i" />
		</div>
	</div>
</template>
<style lang="sass">
.turn-info
	position: relative
	&__round-number
		font-size: 2rem
	&__player
		font-size: 1.5rem
	&__darts
		font-size: 1.5rem
		position: absolute
		right: 35px
		top: 0
	&__dart
		margin-right: 0.5rem
</style>