<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useGame } from '@/composables/useGame';
import { usePlayers } from '@/composables/usePlayers';

const { getDarts, setDarts, changePlayerToNext, getCurrentPlayerId, getMemo, addMemo } = useGame();

const { addPlayerPoints } = usePlayers();

const emit = defineEmits(['player-change', 'undo']);

const resolveFault = () => {
  if (getDarts.value < 1) return;
  addMemo(0);
  setDarts(getDarts.value - 1);
  addPlayerPoints(getCurrentPlayerId.value, 0);
};

const memo = ref(getMemo);

watch(getMemo, (newValue) => {
  memo.value = newValue;
});

const changePlayer = () => {
  setDarts(3);
  changePlayerToNext();
  emit('player-change');
};
</script>
<template>
  <div class="game-actions d-flex justify-space-between my-4">
    <v-tooltip
      location="top"
      :text="`Undo ${memo[memo.length - 1] || ''}`"
    >
      <template v-slot:activator="{ props }">
        <div
          v-bind="props"
          @click="emit('undo')"
          style="cursor: pointer"
          class="game-actions__action"
        >
          <v-icon size="x-large"> mdi-undo </v-icon>
          <span
            v-if="memo.length > 0"
            class="game-actions__last-score"
          >
            ({{ memo[memo.length - 1] }})
          </span>
        </div>
      </template>
    </v-tooltip>
    <v-tooltip
      location="top"
      text="Fault"
    >
      <template v-slot:activator="{ props }">
        <v-icon
          size="x-large"
          v-bind="props"
          @click="resolveFault"
          class="game-actions__action"
        >
          mdi-alpha-x-box-outline
        </v-icon>
      </template>
    </v-tooltip>
    <v-tooltip
      location="top"
      text="Next player"
    >
      <template v-slot:activator="{ props }">
        <v-icon
          size="x-large"
          v-bind="props"
          @click="changePlayer"
          class="game-actions__action"
        >
          mdi-account-arrow-right
        </v-icon>
      </template>
    </v-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.game-actions {
  margin: 0 auto;
  max-width: 400px;
  &__action {
    flex-basis: 33%;
    &:last-child {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
