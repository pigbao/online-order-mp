<template>
	<view class="container">
		<view class="form">

			<view class="item">
				<view class="label">
					联系人
				</view>
				<view class="value">
					黄
				</view>
			</view>
			<view class="item">
				<view class="label">
					性别
				</view>
				<view class="value">
					先生
				</view>
			</view>
			<view class="item">
				<view class="label">
					手机号
				</view>
				<view class="value">
					13685079602
				</view>
			</view>
			<view class="item">
				<view class="label">
					收货地址
				</view>
				<view class="value">
					奥体阳光花园
				</view>
			</view>
		</view>
		<view class="btn">
			<button class="button" @click="handleAdd">保存</button>
		</view>

	</view>
</template>

<script setup>
</script>

<style scoped lang="scss">
	.container {
		padding: 20rpx;

		.form {
			background-color: #fff;
			padding: 30rpx;

			.item {
				display: flex;
				align-items: center;
				padding: 20rpx 0;

				.label {
					width: 200rpx;
				}

				.value {
					flex: 1;
				}
			}
		}

		.btn {

			padding: 50rpx 0;

			.button {
				background-color: #86B394;
				color: #fff;
				border-radius: 50rpx;
			}
		}
	}
</style>