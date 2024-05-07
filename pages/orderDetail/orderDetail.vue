<template>
	<view class="container">
		<view class="code" v-if="[2, 3].includes(orderDetail.orderStatus) && orderDetail?.isTakeout == 1">
			{{ code }}
			<view class="tip">
				取餐码
			</view>
		</view>
		<view class="order-tip">
			{{ orderStatusDict[orderDetail.orderStatus] }}
		</view>
		<view class="status-tip">
			{{ orderDetail.orderStatus === 1 ? '10分钟内未支付，订单将自动取消' : '感谢您的支持，喜欢您再来' }}
		</view>

		<view class="card">
			<view class="goods">
				<view class="goods-name">
					商品明细
				</view>
				<view class="goods-item" v-for="(item, index) in goods" :key="index">
					<view class="img">
						<image style="width: 100%; height: 100%; background-color: #eee;border-radius: 4rpx;" mode="aspectFill"
							:src="item.goodsImg"></image>
					</view>
					<view class="info">
						<view class="name">
							{{ item.goodsName }}
						</view>
						<view class="specs">
							{{ formartSpData(item.goodsSpec) }}
						</view>

					</view>
					<view class="right">
						<view class="money">
							￥{{ item.goodsPrice / 100 }}
						</view>
						<view class="count">
							x{{ item.count }}
						</view>
					</view>
				</view>
				<view class="goods-sum">
					<view class="count">
						共{{ totalCount }}件商品
					</view>
					<view class="money">
						总计￥{{ orderDetail.payPrice / 100 }}
					</view>
				</view>
			</view>
		</view>

		<view class="card">
			<view class="item">
				<view class="label">
					订单号
				</view>
				<view class="value">
					{{ orderDetail.orderNum }}
				</view>
				<view class="copy" @click="handleCopy(orderDetail.orderNum)">
					复制
				</view>
			</view>
			<view class="item">
				<view class="label">
					下单时间
				</view>
				<view class="value">
					{{ createTime }}
				</view>
			</view>
			<view class="item">
				<view class="label">
					备注
				</view>
				<view class="value">
					{{ orderDetail.remark }}
				</view>
			</view>
		</view>

		<view class="actions" v-if="orderStatus == 1 || orderDetail.orderStatus == 6">
			<button class="button" @click="handleCancel" v-if="orderDetail.orderStatus === 1">取消订单</button>
			<button class="button primary" @click="handlePay" v-if="orderDetail.orderStatus === 1">立即支付</button>
		</view>
		<MockPay ref="MockPayRef" @confirm="confirmPay"></MockPay>
	</view>
</template>

<script setup>
import { apiOrderDetail, apiCancelOrder } from '@/api/order.js'
import dayjs from 'dayjs';

const orderId = ref()
function formartSpData(spData) {
	const dataObj = JSON.parse(spData)
	const dataArr = dataObj.map(item => item.value)
	return dataArr.toString()
}


const code = computed(() => {
	// 4位数字  前面补0
	return orderDetail.value?.code?.toString().padStart(4, '0')
})

const totalCount = computed(() => {
	return goods.value?.reduce((acc, cur) => acc + cur.count, 0)
})

const createTime = computed(() => {
	return dayjs(orderDetail.value?.createTime).format('YYYY-MM-DD HH:mm:ss')
})

const orderDetail = ref({})
const goods = ref([])

async function getDetail() {
	try {
		const res = await apiOrderDetail(orderId.value)
		console.log('res :>> ', res);
		orderDetail.value = res
		console.log('orderDetail.value :>> ', orderDetail.value);
		goods.value = res.goods
	} catch (error) {
		console.log('error :>> ', error);
	}
}

function handleCopy(text) {
	uni.setClipboardData({
		data: text,
		success: function() {
			uni.showToast({
				title: '复制成功',
				icon: 'none'
			})
		}
	})
}

/**
 * 取消订单
 */
async function handleCancel() {
	uni.showModal({
		title: '提示',
		content: '确认取消订单吗？',
		success: async (res) => {
			if (res.confirm) {
				try {
					await apiCancelOrder(orderId.value)
					uni.showToast({
						title: '取消成功',
						icon: 'none'
					})
					uni.navigateBack()
				} catch (error) {
					console.log('error :>> ', error);
				}
			}
		}
	})
}
const MockPayRef = ref()
/**
 * 支付
 */
function handlePay() {
	nextTick(() => {
		MockPayRef.value.open(orderDetail.value.id, orderDetail.value.payPrice)
	})
}

function confirmPay() {
	getDetail()
}

onLoad((options) => {
	console.log('options :>> ', options);
	orderId.value = options.id
	getDetail()
})

const { dictVL: orderStatusDict } = useDict('orderStatus')
</script>

<style scoped lang="scss">
.container {
	padding: 30rpx 20rpx 260rpx 20rpx;

	.code {
		font-size: 60rpx;
		font-weight: 700;
		display: flex;
		align-items: center;

		.tip {
			font-size: 20rpx;
			padding: 6rpx 12rpx;
			margin-left: 10rpx;
			border-radius: 20rpx;
			background-color: #86B394;
			color: #fff;
			font-weight: 300;
		}
	}

	.order-tip {
		font-size: 38rpx;
		color: #000;
		font-weight: 500;

	}

	.status-tip {
		font-size: 26rpx;
		padding-top: 10rpx;
		padding-bottom: 40rpx;
	}

	.card {
		background-color: #fff;
		padding: 20rpx;
		border-radius: 16rpx;
		margin-bottom: 20rpx;

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
			padding: 16rpx 0;

			.value {
				flex: 1;
				display: flex;
				justify-content: flex-end;
				padding: 0 10rpx;
				font-size: 22rpx;


			}

			.copy {
				font-size: 20rpx;
				border: 1rpx solid #a1a1aa;
				border-radius: 16rpx;
				color: #a1a1aa;
				padding: 2rpx 10rpx;
			}
		}


	}

	.actions {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 20rpx 20rpx 80rpx 20rpx;
		height: 100rpx;
		display: flex;
		justify-content: flex-end;
		background: #fff;

		.button+.button {
			margin-left: 30rpx;
		}

		.button {
			border: 2rpx solid #a1a1aa;
			background-color: #ffffff;
			color: #71717a;
			border-radius: 50rpx;
			width: 180rpx;
			padding: 0;
			margin: 0;
			font-size: 26rpx;
			height: 80rpx;
			line-height: 80rpx;
		}

		.primary {
			background-color: #86B394;
			color: #fff;
			border: 0;
		}
	}
}
</style>