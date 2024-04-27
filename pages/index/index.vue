<template>
	<view class="container">
		<swiper class="swiper" circular :autoplay="true">
			<swiper-item v-for="(item, index) in bannerList" :key="index" @click="handleSwiper(item)">
				<view class="swiper-item" :style="`background-image: url(${item.url});`"></view>
			</swiper-item>
		</swiper>

		<view class="relative">
			<view class="card">
				<view class="card-head">
					<view class="user-info">
						Yo~ 了子同学
					</view>
				</view>
				<view class="card-body">
					<view class="item" @click="handleGo(1)">
						<view class="img">
							<image style="width: 100%; height: 100%; background-color: #fff;" mode="aspectFit" :src="takeOutImg">
							</image>
						</view>
						<view class="label">
							到店自取
						</view>
					</view>
					<view class="divider">
					</view>
					<view class="item" @click="handleGo(2)">
						<view class="img">
							<image style="width: 100%; height: 100%; background-color: #fff;" mode="aspectFit" :src="deliveryImg">
							</image>
						</view>
						<view class="label">
							外卖配送
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { apiBannerList } from '@/api/index.js'
const takeOutImg = ref('../../static/index/takeOut.png')
const deliveryImg = ref('../../static/index/delivery.png')

const bannerList = ref([])

function handleGo(isTakeout) {
	uni.switchTab({
		url: `/pages/goods/goods?isTakeout=${isTakeout}`
	})
}

async function getBannerList() {
	try {
		const res = await apiBannerList()
		console.log('res :>> ', res);
		bannerList.value = res
	} catch (error) {
		console.error(error);
	}
}
getBannerList()


function handleSwiper(item) {
	console.log('item :>> ', item);
	if (item?.goodsId) {
		uni.navigateTo({
			url: `/pages/goodsDetail/goodsDetail?goodsId=${item.goodsId}`
		})
	}
}
</script>

<style scoped lang="scss">
.container {

	.swiper {
		height: 800rpx;


		.swiper-item {
			height: 100%;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;

		}
	}

	.relative {
		position: relative;
		padding: 20rpx;

		.card {
			border-radius: 12rpx;
			position: absolute;
			top: -80rpx;
			left: 20rpx;
			right: 20rpx;

			.card-head {
				background-color: rgba(255, 255, 255, 0.95);
				font-size: 24rpx;
				font-weight: blod;
				height: 80rpx;
				display: flex;
				align-items: center;
				border-radius: 12rpx 12rpx 0 0;
				padding: 0 20rpx;
			}

			.card-body {
				background-color: #fff;
				display: flex;
				align-items: center;
				padding-top: 50rpx;
				padding-bottom: 50rpx;
				border-radius: 0 0 12rpx 12rpx;

				.item {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;

					.img {
						height: 200rpx;
						width: 200rpx;
						margin-bottom: 30rpx;
					}

					.label {
						font-weight: 500;
						font-size: 36rpx;
					}
				}

				.divider {
					background-color: #000;
					height: 100rpx;
					width: 1rpx;
					opacity: 0.06;
				}
			}
		}
	}
}
</style>