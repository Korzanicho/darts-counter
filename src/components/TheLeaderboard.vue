<script setup lang="ts">
import { usePlayers } from '../composables/usePlayers'

const { getPlayers } = usePlayers();
</script>

<template>
	<div class="the-leaderboard">
		<v-table class="the-leaderboard__table" theme="dark">
			<thead>
				<tr>
					<th class="the-leaderboard__title text-left">
						Player
					</th>
					<th class="the-leaderboard__title text-left">
						Scores
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="player in getPlayers"
					:key="player.id"
				>
					<td class="the-leaderboard__player-name" :style="{ '--color-player': player.color }">{{ player.name }}</td>
					<td class="the-leaderboard__score">{{ player.score }}</td>
				</tr>
			</tbody>
		</v-table>
	</div>
</template>
<style lang="sass">
	.the-leaderboard
		&__player-name::before
			content: ''
			display: inline-block
			width: 1rem
			height: 1rem
			margin-right: 1rem
			background-color: var(--color-player)
</style>