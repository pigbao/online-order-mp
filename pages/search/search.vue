<template>
	<view class="container">
		<view class="search-bar">
			<uni-search-bar @confirm="search"></uni-search-bar>
		</view>
		<view class="goods">
			<view class="item" v-for="item in goods" @click="handleSelect(item)">
				<image style="width: 100rpx; height: 100rpx; background-color: #eee;border-radius: 4rpx;"
					mode="aspectFit" :src="item.img"></image>
				<view class="name">
					{{item.goodsName}}
				</view>
				<view class="money">
					￥{{item.minMoney}}起
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	function search() {

	}

	const goods = ref([{
		goodsId: 1,
		goodsName: '奶茶',
		intro: '巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉',
		minMoney: '19'
	}, {
		goodsId: 1,
		goodsName: '奶茶',
		intro: '巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉',
		minMoney: '19'
	}, {
		goodsId: 1,
		goodsName: '奶茶',
		intro: '巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉',
		minMoney: '19'
	}, {
		goodsId: 1,
		goodsName: '奶茶',
		intro: '巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉',
		minMoney: '19'
	}, ])

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