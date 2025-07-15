<template>
  <button
    class="a-button"
    :class="{ 'a-button--disabled': props.isDisabled }"
    :disabled="props.isDisabled"
    @click="props.isDisabled ? $emit('click') : null"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

</script>

<style lang="scss" scoped>
.a-button {
  border: none;
  color: #fff;
  transition: .3s;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  background: $colorAccent;

  &:hover:not(&--disabled) {
    background: darken($colorAccent, 10%);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  &:active:not(&--disabled) {
    background: darken($colorAccent, 20%);
  }

  &--disabled {
    cursor: not-allowed;
    background: $colorDisabled;
  }
}
</style>
