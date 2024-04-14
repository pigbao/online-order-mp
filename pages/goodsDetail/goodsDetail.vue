<template>
	<view class="container">
		<view class="back" @click="handleBack()">
			<uni-icons type="back" size="26" color="#fff"></uni-icons>
		</view>
		<image style="width: 100%;height: 600rpx; background-color: #fff;" mode="aspectFill" :src="goods.img"></image>
		<view class="goods-info">
			<view class="name">
				{{goods.goodsName}}
			</view>
			<view class="intro">
				{{goods.intro}}
			</view>
		</view>

		<view class="specs">
			<view class="specs-item" v-for="(spec,index) in specs" :key="index">
				<view class="specs-name">
					{{spec.title}}
				</view>
				<view class="specs-values">
					<view class="value" :class="selectSpecs.includes(value)?'active':''" v-for="value in spec.data">
						{{value}}
					</view>
				</view>
			</view>
		</view>

		<view class="add-box">
			<view class="head">
				<view class="money">
					￥16
				</view>
				<view class="count">
					<Count v-model:value="goods.count"></Count>
				</view>
			</view>
			<view class="specs-text">
				123
			</view>
			<view class="btn">
				<button class="button">加入购物车</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	function handleBack() {
		uni.navigateBack()
	}
	const goods = ref({
		img: 'http://192.168.0.104:7001/public/uploads/2024/04/13/171299934064127.png',
		intro: '使用时令鲜葡萄搭配云南夏黑葡萄汁，果肉粒粒可见，入口鲜甜。搭配清新甘冽的七笞茉莉茶底，激发出更多的清爽口感。加入Q弹爽滑的冻冻，解锁多重味蕾享受。杯型容量:冷饮中杯500m1，大杯650ml.',
		"id": 2,
		"goodsName": "珍珠奶茶",
		"categoryId": 2,
		"isShelves": 1,
		"isDelete": 0,
		"createUserName": "root",
		"createUserId": 1,
		"createTime": "2024-04-12T15:33:08.000Z",
		"updateTime": null,
		"updateUserName": null,
		"updateUserId": null,
		"specs": [{
				"id": 22,
				"goodsId": 2,
				"goodsName": "珍珠奶茶",
				"originalPrice": 1000,
				"price": 500,
				"stock": 200,
				"spData": "[{\"title\":\"规格\",\"value\":\"大杯\"},{\"title\":\"甜度\",\"value\":\"半糖\"}]"
			},
			{
				"id": 23,
				"goodsId": 2,
				"goodsName": "珍珠奶茶",
				"originalPrice": 1000,
				"price": 500,
				"stock": 200,
				"spData": "[{\"title\":\"规格\",\"value\":\"大杯\"},{\"title\":\"甜度\",\"value\":\"全糖\"}]"
			},
			{
				"id": 24,
				"goodsId": 2,
				"goodsName": "珍珠奶茶",
				"originalPrice": 800,
				"price": 400,
				"stock": 200,
				"spData": "[{\"title\":\"规格\",\"value\":\"中杯\"},{\"title\":\"甜度\",\"value\":\"半糖\"}]"
			},
			{
				"id": 25,
				"goodsId": 2,
				"goodsName": "珍珠奶茶",
				"originalPrice": 800,
				"price": 400,
				"stock": 200,
				"spData": "[{\"title\":\"规格\",\"value\":\"中杯\"},{\"title\":\"甜度\",\"value\":\"全糖\"}]"
			}
		]
	})
	const specs = ref([])

	const selectSpecs = ref(['大杯', '半糖'])

	function getDetail() {
		loadSpecs(goods.value.specs)
	}

	function loadSpecs(initSpecs) {
		const spData = initSpecs.map(item => {
			return JSON.parse(item.spData)
		})
		let sp = spData.reduce((acc, cur) => {
			cur.forEach(item => {
				if (!acc.some(accItem => accItem.title === item.title)) {
					acc.push({
						title: item.title,
						data: [item.value]
					})
				} else {
					const index = acc.findIndex(accItem => accItem.title === item.title)
					acc[index].data.push(item.value)
					acc[index].data = [...new Set(acc[index].data)]
				}
			})
			return acc
		}, [])
		specs.value = sp
		console.log("specs.value: " + JSON.stringify(specs.value));
	}

	onLoad(() => {
		getDetail()
	})
</script>

<style scoped lang="scss">
	.container {
		padding-bottom: 400rpx;
		background-color: #fff;

		.back {
			position: fixed;
			top: 80rpx;
			left: 30rpx;
			background-color: rgba(0, 0, 0, 0.4);
			border-radius: 50rpx;
			padding: 6rpx;
		}

		.goods-info {
			padding: 50rpx 30rpx;

			.name {
				font-size: 46rpx;
				font-weight: 600;
				margin-bottom: 30rpx;
			}

			.intro {
				font-size: 24rpx;
				margin-bottom: 30rpx;
			}
		}

		.specs {
			padding: 0 30rpx;

			.specs-item {

				.specs-name {
					font-size: 26rpx;
					padding: 30rpx 0;
					font-weight: 600;
				}

				.specs-values {
					display: flex;
					flex-wrap: wrap;
					padding: 20rpx 0;

					.value+.value {
						margin-left: 30rpx;
					}

					.value {
						padding: 10rpx 50rpx;
						background-color: #f1f5f9;
						font-size: 26rpx;
						border-radius: 16rpx;
					}

					.active {
						background-color: #86B394;
						color: #fff;
					}
				}
			}
		}



		.add-box {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 300rpx;
			border-top: #f1f5f9 solid 1rpx;
			background-color: #fff;

			.head {
				display: flex;
				padding: 20rpx 30rpx 0rpx 30rpx;
				justify-content: space-between;
				align-items: center;


				.money {
					font-size: 36rpx;
					font-weight: 700;
				}
			}

			.specs-text {
				padding: 10rpx 30rpx;
				font-size: 26rpx;
			}

			.btn {
				padding: 10rpx 30rpx 20rpx 30rpx;

				.button {
					background-color: #86B394;
					color: #fff;
					border-radius: 50rpx;
				}
			}
		}
	}
</style>