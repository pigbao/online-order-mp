<template>
	<view class="container">
		<view class="bar" v-if="cartStore.cartList.length > 0">
			<view class="goods" @click="handleOpen">
				<uni-badge class="uni-badge-left-margin" :text="cartStore.count" absolute="rightTop" :offset="[10, 10]">
					<uni-icons type="cart" size="50"></uni-icons>
				</uni-badge>
				<view class="money">
					￥{{ cartStore.totalPrice }}
				</view>
			</view>
			<view class="submit">
				<button class="button" @click="handleSubmit">去结算</button>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" border-radius="16rpx 16rpx 0 0">
			<view class="card">
				<view class="head">
					<view class="action" @click="handleClear">
						清空购物车
						<uni-icons type="trash" size="26"></uni-icons>
					</view>
				</view>
				<view class="goods">
					<view class="goods-item" v-for="(item, index) in cartStore.cartList" :key="index">
						<view class="img">
							<image style="width: 100%; height: 100%; background-color: #eee;border-radius: 4rpx;" mode="aspectFill"
								:src="item.img"></image>
						</view>
						<view class="info">
							<view class="name">
								{{ item.goodsName }}
							</view>
							<view class="specs">
								{{ formatSpData(item.spData) }}
							</view>
							<view class="money">
								￥{{ item.price / 100 }}
							</view>
						</view>
						<view class="count">
							<Count v-model:value="item.count" :maxCount="item.stock" :minCount="0"
								@change="handleCountChange(item.id, $event)">
							</Count>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>

const cartStore = useCartStore()

const popup = ref()

function formatSpData(spData) {
	const dataObj = JSON.parse(spData)
	const dataArr = dataObj.map(item => item.value)
	return dataArr.toString()
}

function handleOpen() {
	popup.value.open()
}

function handleSubmit() {
	uni.navigateTo({
		url: "/pages/OrderSettlement/OrderSettlement"
	})
}

function handleCountChange(id, value) {
	if (value === 0) {
		cartStore.delCart(id)
	} else {
		cartStore.updateCart({
			id,
			count: value
		})
	}
}

watch(() => cartStore.cartList, () => {
	if (cartStore.cartList.length === 0) {
		popup.value.close()
	}
})

function handleClear() {
	uni.showModal({
		content: '确认是否清空购物车？',
		success: async function(res) {
			if (res.confirm) {
				await cartStore.clearCart()
			}
		}
	});
}

function getList() {
	cartStore.getList()
}

onMounted(() => {
	getList()
})
</script>

<style scoped lang="scss">
.container {
	.bar {
		position: fixed;
		bottom: 0;
		z-index: 999;
		left: 0;
		right: 0;
		background-color: #fff;
		padding: 20rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.goods {
			display: flex;
			display: flex;
			align-items: center;
			flex: 1;

			.money {
				flex: 1;
				padding: 0 20rpx;
				font-size: 40rpx;
				font-weight: 700;
			}
		}




		.submit {

			.button {
				background-color: #86B394;
				color: #fff;
				border-radius: 50rpx;
				padding: 0 30rpx;
				margin: 0;
				width: 200rpx;
			}
		}
	}

	.card {
		background-color: #fff;
		padding-bottom: 100rpx;
		border-radius: 16rpx 16rpx 0 0;

		.head {
			display: flex;
			justify-content: flex-end;
			padding: 20rpx;

			.action {
				display: flex;
				align-items: center;
				font-size: 24rpx;
				color: #a1a1aa;
			}
		}

		.goods {
			padding: 20rpx;

			.goods-item {
				display: flex;
				padding: 20rpx;

				.img {
					width: 150rpx;
					height: 150rpx;

				}

				.info {
					flex: 1;
					padding: 0 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.name {
						font-weight: 600;
					}

					.specs {
						font-size: 24rpx;
						color: #a1a1aa;
						flex: 1;
					}

				}

				.count {
					display: flex;
					align-items: flex-end;
				}
			}
		}
	}
}
</style>