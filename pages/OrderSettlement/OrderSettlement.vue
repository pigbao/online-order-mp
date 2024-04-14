<template>
	<view class="container">
		<view class="basic card">
			<view class="shop-info">
				<view class="info-list">
					<view class="shop-name">
						羊驼奶茶店
					</view>
					<view class="address">
						福建省福州市仓山区
					</view>
				</view>
				<view class="localtion">
					<view class="text">
						距离您1.2km
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
					备注
				</view>
				<view class="value">
					备注备注备注备注备注备注备注备注备注备注备注备注备注备注
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
					￥64
				</view>
			</view>
			<button class="button" @click="handlePay">立即支付</button>
		</view>
		<MockPay ref="MockPayRef"></MockPay>
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

	const MockPayRef = ref()

	function handlePay() {
		MockPayRef.value.open()
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

				.localtion {
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