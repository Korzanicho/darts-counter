<template>
	<a
		class="a-anchor"
		:href="href"
	>
		<slot></slot>
	</a>
</template>

<script setup lang="ts">
defineProps({
	href: {
		type: String,
		default: '#',
	}
});
</script>

<style lang="sass" scoped>
.a-anchor
	color: #FFFFFF
	margin: 0 0.5rem
	text-decoration: none
	&:hover
		text-decoration: underline
</style>