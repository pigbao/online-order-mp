<template>
	<view class="container">
		<uni-popup ref="popup" type="bottom" border-radius="16rpx 16rpx 16rpx 16rpx" :safe-area="false">
			<view class="card">
				<view class="head">
					<view class="action">
						<uni-icons type="close" size="26"></uni-icons>
					</view>
				</view>
				<view class="info">
					<!-- <image src="../../static/pay/pay.png" style="width: 150rpx; height: 150rpx;"></image> -->
					<view class="name">
						羊驼奶茶店
					</view>
					<view class="money">
						￥{{money}}
					</view>
				</view>
				<view class="btn">
					<button class="button" @click="handlePay">支付</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	const money = ref(0)
	const popup = ref(null)

	function open() {
		nextTick(() => {
			popup.value.open()
		})
	}

	function handlePay() {
		uni.redirectTo({
			url: "/pages/orderDetail/orderDetail"
		})
	}

	defineExpose({
		open
	})
</script>

<style scoped lang="scss">
	.container {
		.card {
			background: #fff;
			border-radius: 16rpx;
			display: flex;
			flex-direction: column;
			padding-bottom: 150rpx;


			.head {
				display: flex;
				justify-content: flex-end;
				padding: 20rpx;
			}

			.info {
				display: flex;
				flex-direction: column;
				align-items: center;

				.name {
					font-weight: 500;
				}

				.money {
					font-size: 90rpx;
					padding: 50rpx 0;
					font-weight: 700;
				}
			}

			.btn {
				padding: 20rpx 100rpx;

				.button {
					background-color: #86B394;
					color: #fff;
					border-radius: 50rpx;
					padding: 0 30rpx;
					margin: 0;
				}
			}
		}


	}
</style>