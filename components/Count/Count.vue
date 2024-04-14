<template>
	<view class="container">
		<uni-icons type="minus" size="26"></uni-icons>
		<view class="number">
			{{props.value}}
		</view>
		<uni-icons type="plus-filled" size="26"></uni-icons>
	</view>
</template>

<script setup>
	const props = defineProps({
		value: {
			type: Number,
			default: 1
		}
	})
	const emits = defineEmits(['udpate:value'])

	function sub() {
		if (props.value == 1) {
			return
		}
		const newVal = props.value - 1
		emits('udpate:value', newVal)
	}

	function add() {
		const newVal = props.value + 1
		emits('udpate:value', newVal)
	}
</script>

<style scoped lang="scss">
	.container {
		display: flex;
		align-items: center;

		.number {
			padding: 0 16rpx;
		}
	}
</style>