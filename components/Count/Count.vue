<template>
	<view class="container">
		<uni-icons type="minus" size="26" @click="sub"></uni-icons>
		<view class="number">
			{{ props.value }}
		</view>
		<uni-icons type="plus-filled" size="26" @click="add"></uni-icons>
	</view>
</template>

<script setup>
const props = defineProps({
	value: {
		type: Number,
		default: 1
	},
	maxCount: {
		type: Number,
		default: 1
	}
})
const emits = defineEmits(['update:value'])

function sub() {
	if (props.value == 1) {
		return
	}
	const newVal = props.value - 1
	emits('update:value', newVal)
}

function add() {
	const newVal = props.value + 1 > props.maxCount ? props.maxCount : props.value + 1
	emits('update:value', newVal)
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