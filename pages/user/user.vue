<template>
	<view class="container" :style="`background-image: url(${url});`">
		<view class="header">

			<view class="user-info">
				<view class="avatar">
					<image class="image" mode="aspectFit" :src="goods?.img"></image>
				</view>
				<view class="name">
					了子同学
				</view>
				<view class="tip">
					感谢您的支持
				</view>
			</view>
		</view>

		<view class="card">
			<view class="list">
				<view class="item" @click="address">
					<uni-icons type="location-filled" size="26"></uni-icons>
					<view class="label">
						地址管理
					</view>
					<uni-icons type="right" size="16"></uni-icons>
				</view>
				<view class="item" @click="call">
					<uni-icons type="headphones" size="26"></uni-icons>
					<view class="label">
						联系客服
					</view>
					<uni-icons type="right" size="16"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
const url = ref('http://192.168.0.104:7001/public/uploads/2024/04/13/8.webp')

function address() {
	uni.navigateTo({
		url: "/pages/address/address"
	})
}

function call() {
	uni.makePhoneCall({
		phoneNumber: '13685079602'
	})
}
</script>

<style scoped lang="scss">
.container {
	min-height: 500rpx;
	background-repeat: no-repeat;
	background-size: 100% 600rpx;

	.header {
		padding: 500rpx 20rpx 0 20rpx;

		.user-info {
			background-color: #fff;
			padding: 20rpx 20rpx 50rpx 20rpx;
			position: relative;
			border-radius: 16rpx;

			.avatar {
				position: absolute;
				top: -80rpx;
				left: 50%;
				transform: translate(-50%);
				padding: 10rpx;
				background-color: #fff;
				border-radius: 100rpx;

				.image {
					width: 140rpx;
					height: 140rpx;
					background-color: #eee;
					border-radius: 75rpx;
				}
			}

			.name {
				padding-top: 80rpx;
				padding-bottom: 20rpx;
				text-align: center;
				font-size: 34rpx;
			}

			.tip {
				font-size: 26rpx;
				text-align: center;
				color: #9ca3af;
			}
		}
	}

	.card {
		padding: 50rpx 20rpx 20rpx 20rpx;
		margin-bottom: 20rpx;

		.list {
			background-color: #fff;
			border-radius: 16rpx;

			.item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx;

				.label {
					flex: 1;
					padding: 0 10rpx;
				}
			}
		}
	}
}
</style>