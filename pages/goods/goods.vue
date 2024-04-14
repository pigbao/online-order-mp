<template>
	<view class="container">
		<StatusBar style="background-color: #fff;"></StatusBar>
		<view class="actions">
			<view class="is-takeout">
				<view class="item" :class="isTakeOut=='1'?'active':''" @click="changeTakeOut('1')">
					自取
				</view>
				<view class="divider">

				</view>
				<view class="item" :class="isTakeOut=='2'?'active':''" @click="changeTakeOut('2')">
					外送
				</view>
			</view>
			<view class="search">
				<uni-icons type="search" size="26"></uni-icons>
			</view>
		</view>
		<view class="shop-info">
			<view class="shop-name">
				羊驼奶茶店
			</view>
			<view class="location">
				距离您 1.3km
			</view>
		</view>
		<view class="list">
			<scroll-view style="height: 100%;" scroll-y="true" class="scroll-view category">
				<view id="demo1" class="category-item" :class="item==1?'active':''" v-for="item in 50">找新鲜果茶</view>
			</scroll-view>
			<scroll-view style="height: 100%;" scroll-y="true" class="scroll-view goods">
				<view id="demo1" v-for="category in list">
					<view class="category-name">
						{{category.categoryName}}
					</view>
					<view class="goods-list">
						<view class="goods-item" v-for="goods in category.goods" @click="handleDetail(goods)">
							<view class="img">
								<image style="width: 100%; height: 100%; background-color: #eee;border-radius: 4rpx;"
									mode="aspectFit" :src="goods.img"></image>
							</view>
							<view class="goods-info">
								<view class="goods-name">
									{{goods.goodsName}}
								</view>
								<view class="intro">
									{{goods.intro}}
								</view>
								<view class="footer">
									<view class="money">
										￥{{goods.minMoney}}
									</view>
									<view class="add">
										<uni-icons type="plus-filled" size="30" color="#86B394"></uni-icons>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<Cart></Cart>
	</view>
</template>

<script setup>
	const isTakeOut = ref('1')

	function changeTakeOut(value) {
		console.log(value)
		isTakeOut.value = value
	}

	const list = ref([{
		categoryId: 1,
		categoryName: '找新鲜果茶',
		goods: [{
			goodsId: 1,
			goodsName: '奶茶',
			intro: '巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉',
			minMoney: '19'
		}, {
			goodsId: 1,
			goodsName: '奶茶',
			intro: '巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉',
			minMoney: '19'
		}, {
			goodsId: 1,
			goodsName: '奶茶',
			intro: '巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉',
			minMoney: '19'
		}, {
			goodsId: 1,
			goodsName: '奶茶',
			intro: '巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉',
			minMoney: '19'
		}, ]
	}, {
		categoryId: 1,
		categoryName: '找新鲜果茶',
		goods: [{
			goodsId: 1,
			goodsName: '奶茶',
			intro: '巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉',
			minMoney: '19'
		}, {
			goodsId: 1,
			goodsName: '奶茶',
			intro: '巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉',
			minMoney: '19'
		}, {
			goodsId: 1,
			goodsName: '奶茶',
			intro: '巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉',
			minMoney: '19'
		}, {
			goodsId: 1,
			goodsName: '奶茶',
			intro: '巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉',
			minMoney: '19'
		}, ]
	}, {
		categoryId: 1,
		categoryName: '找新鲜果茶',
		goods: [{
			goodsId: 1,
			goodsName: '奶茶',
			intro: '巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉',
			minMoney: '19'
		}, {
			goodsId: 1,
			goodsName: '奶茶',
			intro: '巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉',
			minMoney: '19'
		}, {
			goodsId: 1,
			goodsName: '奶茶',
			intro: '巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉',
			minMoney: '19'
		}, {
			goodsId: 1,
			goodsName: '奶茶',
			intro: '巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉',
			minMoney: '19'
		}, ]
	}, ])

	function handleDetail(goods) {
		console.log("goods: " + JSON.stringify(goods));
		uni.navigateTo({
			url: "/pages/goodsDetail/goodsDetail"
		})

	}
</script>

<style scoped lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;

		.actions {
			display: flex;
			align-items: center;
			height: 110rpx;
			padding: 20rpx;
			background-color: #fff;

			.is-takeout {
				display: flex;
				align-items: center;

				.divider {
					height: 40rpx;
					background: rgba(0, 0, 0, 0.6);
					width: 4rpx;
					margin: 0 30rpx;
				}

				.item {
					font-size: 34rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.active {
					font-size: 40rpx;
					font-weight: 700;
					color: #27272a;
				}

			}

			.search {
				margin-left: 180rpx;
			}
		}

		.shop-info {
			height: 110rpx;
			padding: 0 20rpx;
			background-color: #fff;
			margin-bottom: 20rpx;

			.shop-name {
				font-size: 34rpx;
				font-weight: 600;
			}

			.location {
				font-size: 24rpx;
				margin-top: 10rpx;
				color: #71717a;
			}

		}

		.list {
			display: flex;
			flex: 1;
			overflow-y: auto;

			.scroll-view {
				overflow-y: auto;
			}

			.category {
				width: 260rpx;

				.category-item {
					padding: 30rpx 20rpx;
					font-size: 26rpx;
				}

				.active {
					background: #fff;
					color: #86B394;
				}
			}

			.goods {
				// flex: 1;
				background-color: #fff;
				// border-radius: 16rpx 0 0 0;
				padding: 0 20rpx;

				.category-name {
					font-size: 32rpx;
					padding: 20rpx 0;
					font-weight: 700;
				}

				.goods-list {
					.goods-item {
						display: flex;
						padding: 20rpx 0;

						.img {
							width: 160rpx;
							height: 160rpx;
							margin-right: 10rpx;
							border-radius: 4rpx;
						}

						.goods-info {
							flex: 1;

							min-width: 0;

							.goods-name {
								margin-bottom: 10rpx;
							}

							.intro {
								// width: 100%;
								overflow: hidden;
								text-overflow: ellipsis;
								// white-space: nowrap;
								-webkit-line-clamp: 2;
								/*! autoprefixer: off */
								-webkit-box-orient: vertical;
								display: -webkit-box;
								font-size: 22rpx;
								color: #71717a;
								margin-bottom: 10rpx;
							}

							.footer {
								display: flex;
								justify-content: space-between;
								align-items: center;

								.money {
									font-weight: 600;
								}

								.add {}
							}
						}
					}
				}

			}
		}
	}
</style>