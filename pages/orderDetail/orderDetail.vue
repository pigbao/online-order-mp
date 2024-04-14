<template>
	<view class="container">
		<view class="code">
			35167
			<view class="tip">
				取餐码
			</view>
		</view>
		<view class="status-tip">
			订单已完成，喜欢您再来
		</view>

		<view class="card">
			<view class="goods">
				<view class="goods-name">
					商品明细
				</view>
				<view class="goods-item" v-for="item in goods">
					<view class="img">
						<image style="width: 100%; height: 100%; background-color: #eee;border-radius: 4rpx;"
							mode="aspectFill" :src="item.img"></image>
					</view>
					<view class="info">
						<view class="name">
							{{item.goodsName}}
						</view>
						<view class="specs">
							{{formartSpData(item.spData)}}
						</view>

					</view>
					<view class="right">
						<view class="money">
							￥16
						</view>
						<view class="count">
							x1
						</view>
					</view>
				</view>
				<view class="goods-sum">
					<view class="count">
						共4件商品
					</view>
					<view class="money">
						总计￥64
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
					123
				</view>
				<view class="copy">
					复制
				</view>
			</view>
			<view class="item">
				<view class="label">
					备注
				</view>
				<view class="value">
					备注备注备注
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	function formartSpData(spData) {
		const dataObj = JSON.parse(spData)
		const dataArr = dataObj.map(item => item.value)
		return dataArr.toString()
	}
	const goods = ref([{
		img: 'http://192.168.0.104:7001/public/uploads/2024/04/13/171299934064127.png',
		"id": 22,
		"goodsId": 2,
		"goodsName": "珍珠奶茶",
		"originalPrice": 1000,
		"price": 500,
		"stock": 200,
		"spData": "[{\"title\":\"规格\",\"value\":\"大杯\"},{\"title\":\"甜度\",\"value\":\"半糖\"}]"
	}, {
		img: 'http://192.168.0.104:7001/public/uploads/2024/04/13/171299934064127.png',
		"id": 23,
		"goodsId": 2,
		"goodsName": "珍珠奶茶",
		"originalPrice": 1000,
		"price": 500,
		"stock": 200,
		"spData": "[{\"title\":\"规格\",\"value\":\"大杯\"},{\"title\":\"甜度\",\"value\":\"全糖\"}]"
	}, {
		img: 'http://192.168.0.104:7001/public/uploads/2024/04/13/171299934064127.png',
		"id": 24,
		"goodsId": 2,
		"goodsName": "珍珠奶茶",
		"originalPrice": 800,
		"price": 400,
		"stock": 200,
		"spData": "[{\"title\":\"规格\",\"value\":\"中杯\"},{\"title\":\"甜度\",\"value\":\"半糖\"}]"
	}, {
		img: 'http://192.168.0.104:7001/public/uploads/2024/04/13/171299934064127.png',
		"id": 25,
		"goodsId": 2,
		"goodsName": "珍珠奶茶",
		"originalPrice": 800,
		"price": 400,
		"stock": 200,
		"spData": "[{\"title\":\"规格\",\"value\":\"中杯\"},{\"title\":\"甜度\",\"value\":\"全糖\"}]"
	}])
</script>

<style scoped lang="scss">
	.container {
		padding: 30rpx 20rpx 80rpx 20rpx;

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
	}
</style>