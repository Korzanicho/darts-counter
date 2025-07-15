<template>
  <img
    :src="props.src"
    :alt="props.alt"
    class="a-image"
  />
</template>

<script setup lang="ts">
const props = defineProps({
	src: {
		type: String,
		required: true,
	},
	alt: {
		type: String,
		required: true,
	},
});
</script>

<style scoped></style>
