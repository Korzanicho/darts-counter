<script setup lang="ts">
import { ref } from 'vue'
import { usePlayers } from '../composables/usePlayers'

const { getPlayers, setScore } = usePlayers();

const editablePlayerId = ref(0)
const editablePoints = ref(0)

const handleEditPoints = (id: number, score: number) => {
	editablePlayerId.value = id
	editablePoints.value = score || 0
}

const handleSavePoints = () => {
	setScore(editablePlayerId.value, editablePoints.value)
	editablePlayerId.value = 0
}
</script>

<template>
	<div class="the-leaderboard">
		<v-table class="the-leaderboard__table" theme="dark">
			<thead>
				<tr>
					<th class="the-leaderboard__title text-left">
						Player
					</th>
					<th class="the-leaderboard__title text-center">
						Scores
					</th>
					<th class="the-leaderboard__title text-right">
						Actions
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="player in getPlayers"
					:key="player.id"
				>
					<td class="the-leaderboard__player-name" :style="{ '--color-player': player.color }">{{ player.name }}</td>
					<td class="the-leaderboard__score text-center">
						<span v-if="editablePlayerId !== player.id">{{ player.score }}</span>
						<v-text-field
							v-else
							type="number"
							v-model="editablePoints"
							label="Player points"
						/>
					</td>
					<td class="the-leaderboard__edit text-right">
						<v-icon
							size="small"
							class="me-2"
							@click="handleEditPoints(player.id, player.score)"
							v-if="editablePlayerId !== player.id"
						>
							mdi-pencil
						</v-icon>
						<v-icon
							size="small"
							class="me-2"
							@click="handleSavePoints()"
							v-else
						>
							mdi-check
						</v-icon>
					</td>
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