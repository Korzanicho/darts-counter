<script setup lang="ts">
import { useGame } from '@/composables/useGame';

const resolveNewGame = () => {
	useGame().resetGame();
}

const resolveContinueGame = () => {
	useGame().setState('playing');
	useGame().changePlayerToNext();
}

const { getCurrentWinnerName } = useGame();
</script>
<template>
	<div class="end-game">
		<v-row>
			<h2 class="end-game__title d-block mx-auto">
				Congratulations {{ getCurrentWinnerName }}!
			</h2>
		</v-row>
		<v-row class="end-game__buttons-wrapper">
			<v-col cols="6" class="text-center">
				<v-btn color="primary" @click="resolveNewGame">
					New Game
				</v-btn>
			</v-col>
			<v-col cols="6" class="text-center">
				<v-btn color="primary" @click="resolveContinueGame">
					Continue
				</v-btn>
			</v-col>
		</v-row>
	</div>
</template>
<style lang="sass">
	
</style>