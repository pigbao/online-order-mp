<template>
	<view class="container">
		<view class="list">
			<view class="item">
				<view class="head">
					<view class="type">
						自取
					</view>
					<view class="time">
						2034-04-11 15:54:29
					</view>
					<view class="status">
						已完成
					</view>
				</view>
				<view class="order-info">
					<scroll-view class="goods" :scroll-x="true">
						<image class="img" mode="aspectFill" v-for="item in 6"
							src="http://192.168.0.104:7001/public/uploads/2024/04/13/171299934064127.png"></image>
					</scroll-view>
					<view class="info">
						<view class="money">
							￥16
						</view>
						<view class="count">
							共2件
						</view>
					</view>
				</view>
				<view class="footer">
					<button class="button">再来一单</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
</script>

<style scoped lang="scss">
	.container {
		padding-bottom: 50rpx;

		.list {
			padding: 20rpx;

			.item {
				background-color: #fff;
				border-radius: 16rpx;
				padding: 20rpx;

				.head {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 26rpx;
					margin-bottom: 10rpx;

					.type {
						color: #fff;
						background-color: #86B394;
						padding: 4rpx 10rpx;
						margin-right: 10rpx;
						border-radius: 8rpx;
						font-size: 22rpx;
					}

					.time {
						flex: 1;
					}
				}

				.order-info {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx 0;

					.goods {
						flex: 1;
						display: flex;
						overflow-x: auto;
						white-space: nowrap;

						.img {
							width: 120rpx;
							height: 120rpx;
							background-color: #fff;
							flex-shrink: 0;
							margin-right: 10rpx;
							display: inline-block;
						}
					}

					.info {
						width: 150rpx;
						display: flex;
						flex-direction: column;
						align-items: flex-end;

						.money {
							font-size: 32rpx;
							font-weight: 600;
						}

						.count {
							font-size: 24rpx;
							color: #a1a1aa;
						}
					}
				}

				.footer {
					display: flex;
					justify-content: flex-end;
					width: 100%;
					border-top: 1rpx dashed rgba(0, 0, 0, 0.06);
					padding-top: 20rpx;

					.button {
						margin: 0;
						background-color: #86B394;
						color: #fff;
						border-radius: 50rpx;
						height: 70rpx;
						line-height: 70rpx;
						font-size: 28rpx;
					}
				}
			}
		}
	}
</style>