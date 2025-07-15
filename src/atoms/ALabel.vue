<template>
	<label class="a-label">
		<span class="a-label__text">{{ text }}</span>
		<slot></slot>
	</label>
</template>

<script setup lang="ts">
defineProps({
	text: {
		type: String,
		default: 'Label',
	},
})
</script>
<style>
.a-label {
  display: flex;
  flex-direction: column-reverse;
}
.a-label > .a-label__text {
  transition: all .2s;
  transform-origin: top left;
}
.a-label > input[placeholder=" "]:not(:focus):placeholder-shown + .a-label__text {
  transform: translateY(1em) scale(1.25);
  pointer-events: none;
  opacity: .5
}
</style>
