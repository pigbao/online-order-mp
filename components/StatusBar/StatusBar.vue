<template>
	<view class="status_bar">
		<!-- 这里是状态栏 -->
	</view>
</template>

<script setup>
	const props = defineProps({
		style: {
			type: String,
			default: ''
		}
	})
</script>

<style scoped lang="scss">
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #fff;
	}
</style>