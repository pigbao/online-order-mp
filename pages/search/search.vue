<template>
	<view class="container">
		<view class="search-bar">
			<uni-search-bar @blur="search" v-model="searchValue"></uni-search-bar>
		</view>
		<view class="goods">
			<view class="item" v-for="item in goods" @click="handleSelect(item)">
				<image style="width: 100rpx; height: 100rpx; background-color: #eee;border-radius: 4rpx;" mode="aspectFill"
					:src="item.img"></image>
				<view class="name">
					{{ item.goodsName }}
				</view>
				<view class="money">
					￥{{ item.minPrice / 100 }}起
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { apiSearchGoods } from '@/api/goods'
const goods = ref([])
async function search(e) {
	try {
		if (!e?.value) {
			return
		}
		const res = await apiSearchGoods(e.value)
		goods.value = res
	} catch (error) {
		console.error(error);
	}
}


function handleSelect(goods) {
	uni.navigateTo({
		url: "/pages/goodsDetail/goodsDetail"
	})
}
</script>

<style scoped lang="scss">
.container {
	.search-bar {
		background-color: #fff;
	}

	.goods {

		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #fff;
			padding: 20rpx;

			.name {
				flex: 1;
				padding: 0 20rpx;
			}

			.money {
				font-weight: 600;
			}
		}
	}
}
</style>