<template>
	<view class="container">
		<view class="list">
			<view class="item" v-for="item in 2">
				<view class="info">
					<view class="address">
						奥体阳光花园
					</view>
					<view class="contacts">
						黄先生 181****0203
					</view>
				</view>
				<view class="action">
					<uni-icons type="compose" size="30"></uni-icons>

				</view>
			</view>
		</view>
		<view class="add">
			<button class="button" @click="handleAdd">新增地址</button>
		</view>
	</view>
</template>

<script setup>
	function handleAdd() {
		uni.navigateTo({
			url: "/pages/addressDetail/addressDetail"
		})
	}
</script>

<style scoped lang="scss">
	.container {
		padding: 20rpx 20rpx 200rpx 20rpx;

		.list {
			.item {
				display: flex;
				align-items: center;
				background-color: #fff;
				padding: 30rpx;
				border-radius: 16rpx;
				margin-bottom: 20rpx;

				.info {
					flex: 1;

					.address {
						font-weight: 600;
					}

					.contacts {
						font-size: 26rpx;
						color: #9ca3af;
						padding-top: 8rpx;
					}
				}
			}
		}

		.add {
			position: fixed;
			bottom: 100rpx;
			left: 100rpx;
			right: 100rpx;


			.button {
				background-color: #86B394;
				color: #fff;
				border-radius: 50rpx;
			}
		}
	}
</style>