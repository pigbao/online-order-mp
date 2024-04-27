<template>
	<view class="container">
		<view class="bar">
			<view class="goods" @click="handleDetail">
				<uni-badge class="uni-badge-left-margin" :text="10" absolute="rightTop" :offset="[10,10]">
					<uni-icons type="cart" size="50"></uni-icons>
				</uni-badge>
				<view class="money">
					￥16
				</view>
			</view>
			<view class="submit">
				<button class="button" @click="handleSubmit">去结算</button>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" border-radius="16rpx 16rpx 0 0">
			<view class="card">
				<view class="head">
					<view class="action">
						清空购物车
						<uni-icons type="trash" size="26"></uni-icons>
					</view>
				</view>
				<view class="goods">
					<view class="goods-item" v-for="(item,index) in goods" :key="index">
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
							<view class="money">
								￥16
							</view>
						</view>
						<view class="count">
							<Count v-model:value="item.count"></Count>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	const count = ref('6')

	const popup = ref()

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

	function handleDetail() {
		console.log("popup: ", popup.value);

		popup.value.open()
	}

	function handleSubmit() {
		uni.navigateTo({
			url: "/pages/OrderSettlement/OrderSettlement"
		})
	}
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

						.money {}
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