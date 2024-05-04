<template>
	<view class="container">
		<view class="basic card">
			<view class="shop-info">
				<view class="info-list">
					<view class="shop-name">
						{{ shopStore.shopInfo.shopName }}
					</view>
					<view class="address">
						{{ shopStore.shopInfo.address }}
					</view>
				</view>
				<view class="location">
					<view class="text">
						距离您{{ distance }}km
					</view>
					<uni-icons type="location-filled" size="30"></uni-icons>
				</view>
			</view>


		</view>

		<view class="card">
			<view class="goods">
				<view class="goods-name">
					商品明细
				</view>
				<view class="goods-item" v-for="item in cartStore.cartList" :key="item.id">
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

					</view>
					<view class="right">
						<view class="money">
							￥{{ item.price / 100 }}
						</view>
						<view class="count">
							x{{ item.count }}
						</view>
					</view>
				</view>
				<view class="goods-sum">
					<view class="count">
						共{{ cartStore.count }}件商品
					</view>
					<view class="money">
						总计￥{{ cartStore.totalPrice }}
					</view>
				</view>
			</view>
		</view>

		<view class="card">
			<view class="item" @click="handleRemark">
				<view class="label">
					备注
				</view>
				<view class="value">
					{{ remark }}
				</view>
				<uni-icons type="right" size="16"></uni-icons>
			</view>
		</view>

		<view class="submit">
			<view class="total">
				<view class="label">
					实付
				</view>
				<view class="money">
					￥{{ cartStore.totalPrice }}
				</view>
			</view>
			<button class="button" @click="handleSubmit">立即支付</button>
		</view>
		<MockPay ref="MockPayRef"></MockPay>
		<Remark ref="RemarkRef" v-model:value="remark"></Remark>
	</view>
</template>

<script setup>
import { apiCreateOrder } from '@/api/order'
const shopStore = useShopStore()
const cartStore = useCartStore()
const isTakeoutStore = useIsTakeoutStore()
function formatSpData(spData) {
	const dataObj = JSON.parse(spData)
	const dataArr = dataObj.map(item => item.value)
	return dataArr.toString()
}

const MockPayRef = ref()

async function handleSubmit() {
	try {
		const { id, payPrice } = await apiCreateOrder({ cartList: cartStore.cartList, remark: remark.value, isTakeout: isTakeoutStore.isTakeout })
		cartStore.getList()
		MockPayRef.value.open(id, payPrice)
	} catch (error) {
		console.error(error);
	}
}
const distance = ref(0)
onLoad(async () => {
	distance.value = await shopStore.getDistance()
})

const remark = ref('')
const RemarkRef = ref()
function handleRemark() {
	nextTick(() => {
		RemarkRef.value.open()
	})
}
</script>

<style scoped lang="scss">
.container {
	padding: 20rpx 20rpx 150rpx 20rpx;

	.card {
		background-color: #fff;
		padding: 20rpx;
		border-radius: 16rpx;
		margin-bottom: 20rpx;



		.shop-info {
			display: flex;
			margin-bottom: 20rpx;

			.info-list {
				flex: 1;

				.shop-name {
					font-size: 40rpx;
					font-weight: 600;
					margin-bottom: 10rpx;
				}

				.address {
					font-size: 26rpx;
					color: #9ca3af;
				}
			}

			.location {
				display: flex;
				flex-direction: column;
				align-items: center;

				.text {
					font-size: 22rpx;
					color: #9ca3af;
					border: 1rpx solid #9ca3af;
					padding: 4rpx;
					border-radius: 8rpx;
				}
			}
		}

		.goods {
			.goods-name {
				padding: 0 20rpx 20rpx 20rpx;
			}

			.goods-item {
				display: flex;
				padding: 20rpx;

				.img {
					width: 100rpx;
					height: 100rpx;

				}

				.info {
					flex: 1;
					padding: 0 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.name {
						font-weight: 500;
						font-size: 28rpx;
					}

					.specs {
						font-size: 22rpx;
						color: #a1a1aa;
						flex: 1;
					}

				}

				.right {
					display: flex;
					flex-direction: column;
					align-items: flex-end;

					.money {
						font-weight: 600;
					}

					.count {
						font-size: 24rpx;
					}
				}
			}

			.goods-sum {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				padding: 20rpx;

				.count {
					font-size: 24rpx;
					margin-right: 10rpx;
					color: #a1a1aa;
				}

				.money {
					font-weight: 600;
				}
			}
		}

		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.value {
				flex: 1;
				display: flex;
				justify-content: flex-end;
				flex-wrap: nowrap;
				padding: 0 10rpx;

				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				-webkit-line-clamp: 1;
				/*! autoprefixer: off */
				-webkit-box-orient: vertical;
				display: -webkit-box;
				color: #71717a;
				text-align: end;
			}
		}
	}

	.submit {
		background-color: #fff;
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		padding: 20rpx 20rpx 80rpx 20rpx;

		.total {
			flex: 1;
			display: flex;
			align-items: center;

			.label {
				font-size: 26rpx;
			}

			.money {
				font-size: 50rpx;
				font-weight: 600;
			}

		}

		.button {
			background-color: #86B394;
			color: #fff;
			border-radius: 50rpx;
			padding: 0 30rpx;
			margin: 0;
			width: 300rpx;
		}
	}
}
</style>