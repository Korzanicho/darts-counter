<template>
	<component
		:is="tag"
		class="a-text"
	>
		<slot></slot>
	</component>
</template>

<script setup lang="ts">
defineProps({
	tag: {
		type: String,
		default: 'p',
	}
});
</script>

<style scoped>

</style>