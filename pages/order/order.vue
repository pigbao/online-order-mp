<template>
	<view class="container">
		<view class="list">
			<view class="item" v-for="item in list" :key="item.id">
				<view class="head">
					<view class="type"> {{ isTakeoutDict[item.isTakeout] }} </view>
					<view class="time"> {{ formatTime(item.createTime) }} </view>
					<view class="status"> {{ orderStatusDict[item.orderStatus] }} </view>
				</view>
				<view class="order-info" @click="handleDetail(item)">
					<scroll-view class="goods" :scroll-x="true">
						<image class="img" mode="aspectFill" v-for="goods in item.goods" :src="goods.goodsImg"></image>
					</scroll-view>
					<view class="info">
						<view class="money"> ￥{{ item.payPrice / 100 }} </view>
						<view class="count"> 共{{ totalCount(item.goods) }}件 </view>
					</view>
				</view>
				<view class="footer" v-if="item.orderStatus == 1">
					<button class="button" v-if="item.orderStatus === 1" @click="handlePay(item)">去支付</button>
				</view>
			</view>
		</view>
		<MockPay ref="MockPayRef" @confirm="confirmPay"></MockPay>
	</view>
</template>

<script setup>
import { apiGetOrders } from '@/api/order.js';
import dayjs from 'dayjs';
function handleDetail({ id }) {
	console.log('id :>> ', id);
	uni.navigateTo({
		url: `/pages/orderDetail/orderDetail?id=${id}`,
	});
}

const list = ref([]);
async function getList() {
	try {
		const res = await apiGetOrders();
		console.log('res :>> ', res);
		list.value = res;
	} catch (e) {
		console.error(e);
	} finally {
		uni.stopPullDownRefresh();
	}
}

const MockPayRef = ref()
function handlePay({ id, payPrice }) {
	MockPayRef.value.open(id, payPrice)
}

function confirmPay(orderId) {
	uni.navigateTo({ url: `/pages/orderDetail/orderDetail?id=${orderId}` })
}

function formatTime(time) {
	return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

function totalCount(goods) {
	return goods.reduce((total, item) => total + item.count, 0)
}

const { dictVL: isTakeoutDict } = useDict('isTakeout')
const { dictVL: orderStatusDict } = useDict('orderStatus')

onShow(() => {
	getList();
})

onPullDownRefresh(() => {
	getList()
})


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
			margin-bottom: 20rpx;

			.head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 26rpx;
				margin-bottom: 10rpx;
				padding-top: 10rpx;

				.type {
					color: #fff;
					background-color: #86b394;
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
					background-color: #86b394;
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
