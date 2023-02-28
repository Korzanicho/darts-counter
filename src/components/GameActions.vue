<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useGame } from '@/composables/useGame'
import { usePlayers } from '@/composables/usePlayers'

const {
  getDarts,
  setDarts,
  changePlayerToNext,
  getCurrentPlayerId,
  getMemo,
  addMemo,
} = useGame()
const { addPlayerPoints } = usePlayers()
const emit = defineEmits(['player-change', 'undo'])
const resolveFault = () => {
  if (getDarts.value < 1) return
  addMemo(0)
  setDarts(getDarts.value - 1)
  addPlayerPoints(getCurrentPlayerId.value, 0)
}

const memo = ref(getMemo)

watch(getMemo, (newValue) => {
  memo.value = newValue
})

const changePlayer = () => {
  setDarts(3)
  changePlayerToNext()
  emit('player-change')
}
</script>
<template>
  <div class="game-actions d-flex justify-space-between my-4">
    <v-btn
      class="game-actions__button"
      :disabled="memo.length < 1"
      @click="emit('undo')"
    >
      UNDO
      <span v-if="memo.length > 0" class="game-actions__last-score">
        ({{ memo[memo.length - 1] }})
      </span>
    </v-btn>
    <v-btn class="game-actions__button" @click="resolveFault">FAULT</v-btn>
    <v-btn class="game-actions__button" @click="changePlayer">
      NEXT PLAYER
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>
.game-actions {
  &__button {
    flex-basis: 30%;
  }
}
</style>
