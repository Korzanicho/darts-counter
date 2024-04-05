<script setup lang="ts">
import { onMounted, ref } from 'vue';
import EndGame from '@/components/EndGame.vue';
import TurnInfo from '@/components/TurnInfo.vue';
import DartTable from '@/components/DartTable.vue';
import PlayerList from '@/components/PlayerList.vue';
import NewPlayerForm from '@/components/NewPlayerForm.vue';
import TheLeaderboard from '@/components/TheLeaderboard.vue';

import { useGame } from '@/composables/useGame';
import { usePlayers } from '@/composables/usePlayers';
import { useLocalstorage } from '@/composables/useLocalstorage';

const { getPlayers } = usePlayers();
const isConfirmDialogVisible = ref(false);
const { getState, setState, setCurrentPlayerId, setCurrentTurn, setDarts, setMemo, resetGame } = useGame();

const startGame = () => {
  setCurrentTurn(1);
  setState('playing');
  setCurrentPlayerId(getPlayers.value[0].id);
};

const restoreData = () => {
  const memo = useLocalstorage().getMemo();
  const state = useLocalstorage().getState();
  const darts = useLocalstorage().getDarts();
  const players = useLocalstorage().getPlayers();
  const currentTurn = useLocalstorage().getCurrentTurn();
  const currentPlayerId = useLocalstorage().getCurrentPlayerId();

  if (!players) return;

  usePlayers().setPlayers(players);

  if (state && currentPlayerId) {
    setMemo(memo);
    setState(state);
    setDarts(darts);
    setCurrentTurn(currentTurn);
    setCurrentPlayerId(currentPlayerId);
  }
};

const handleResetGame = () => {
  resetGame();
  isConfirmDialogVisible.value = false;
};

onMounted(() => {
  restoreData();
});
</script>

<template>
	<div
		class="before-game pb-3"
		v-if="getState === 'before'"
	>
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

		<div class="terms">
			&copy; 2024 Darts Counter |
			<a href="/privacy-policy.html">Privacy Policy</a> |
			<a href="/terms-and-conditions.html">Terms & Conditions</a>
		</div>
	</div>

	<div
		class="game"
		v-if="getState === 'playing'"
	>
		<v-dialog
			v-model="isConfirmDialogVisible"
			persistent
			width="auto"
		>
			<template v-slot:activator="{ props }">
				<v-icon
					class="game__close"
					size="x-large"
					v-bind="props"
				>
					mdi-exit-to-app
				</v-icon>
			</template>
			<v-card>
				<v-card-title class="text-h5"> Are you sure you want to leave the game? </v-card-title>
				<v-card-text
					>When you leave the game, you will lose all the points that the players had. The player list will not
					change.</v-card-text
				>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="green-darken-1"
						variant="text"
						@click="isConfirmDialogVisible = false"
					>
						Cancel
					</v-btn>
					<v-btn
						color="green-darken-1"
						variant="text"
						@click="handleResetGame"
					>
						Exit Game
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<TurnInfo />
		<v-row class="pa-3">
			<v-col
				cols="12"
				md="6"
			>
				<DartTable />
			</v-col>
			<v-col
				cols="12"
				md="6"
			>
				<TheLeaderboard />
			</v-col>
		</v-row>
	</div>

	<div
		class="after-game"
		v-if="getState === 'after'"
	>
		<EndGame />
	</div>
</template>

<style lang="sass" scoped>
.before-game
	height: 100%
	min-height: 93vh
	position: relative
	padding-bottom: 30px
	.terms
		left: 0
		right: 0
		bottom: -40px
		position: absolute
		text-align: center
		padding: 0.8rem
		a
			color: var(--primary)
			margin: 0 0.5rem
			text-decoration: none
			&:hover
				text-decoration: underline

.game
	position: relative
	&__close
		z-index: 1
		position: absolute
		top: 0
		left: 0
		cursor: pointer
		transform: rotate(180deg)
</style>
