<script setup lang="ts">
import { useGame } from '@/composables/useGame'
import { usePlayers } from '@/composables/usePlayers'
import { ref, watch } from 'vue'

const { getDarts, getCurrentPlayerId, getCurrentTurn, getMemo } = useGame()
const { getPlayerById } = usePlayers()

const memo = ref(getMemo)

watch(getMemo, (newValue) => {
  memo.value = newValue
})
</script>
<template>
  <div class="turn-info text-center">
    <div class="turn-info__round-number">Round {{ getCurrentTurn }}</div>
    <div class="turn-info__player mt-2 mb-6">
      {{ getPlayerById(getCurrentPlayerId)?.name }}
    </div>
    <div class="turn-info__darts d-flex">
      <div class="mr-2">
        <span
          class="turn-info__points"
          v-for="(points, i) in memo"
          :key="`${i}-${points}`"
        >
          <span v-if="i !== 0">&nbsp;- </span> {{ points }}
        </span>
      </div>
      <img
        src="@/assets/dart.svg"
        alt="Dart"
        class="turn-info__dart"
        v-for="i in getDarts"
        :key="i"
      />
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
    width: 1rem
    margin-right: 0.5rem
  &__points
    font-size: 1rem
</style>
