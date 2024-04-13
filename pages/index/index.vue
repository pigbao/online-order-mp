<template>
	<view class="container">
		<swiper class="swiper" circular :autoplay="true">
			<swiper-item>
				<view class="swiper-item uni-bg-red"></view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-green"></view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-blue"></view>
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
					<view class="item">
						<view class="img">
							<image style="width: 100%; height: 100%; background-color: #fff;" mode="aspectFit"
								:src="takeOutImg"></image>
						</view>
						<view class="label">
							到店自取
						</view>
					</view>
					<view class="divider">

					</view>
					<view class="item">
						<view class="img">
							<image style="width: 100%; height: 100%; background-color: #fff;" mode="aspectFit"
								:src="deliveryImg"></image>
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
	const takeOutImg = ref('../../static/index/takeOut.png')
	const deliveryImg = ref('../../static/index/delivery.png')
</script>

<style scoped lang="scss">
	.container {

		.swiper {
			height: 800rpx;

			.swiper-item {
				height: 100%;
			}

			.uni-bg-red {
				background-color: red;
			}

			.uni-bg-green {
				background-color: green;
			}

			.uni-bg-blue {
				background-color: blue;
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