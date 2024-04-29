<template>
	<view class="container">
		<StatusBar style="background-color: #fff;"></StatusBar>
		<view class="actions">
			<view class="is-takeout">
				<view class="item" :class="isTakeoutStore.isTakeout == '1' ? 'active' : ''" @click="changeTakeOut('1')">
					自取
				</view>
				<view class="divider">

				</view>
				<view class="item" :class="isTakeoutStore.isTakeout == '2' ? 'active' : ''" @click="changeTakeOut('2')">
					外送
				</view>
			</view>
			<view class="search" @click="handleSearch">
				<uni-icons type="search" size="26"></uni-icons>
			</view>
		</view>
		<view class="shop-info">
			<view class="shop-name">
				{{ shopStore.shopInfo.shopName }}
			</view>
			<view class="location">
				距离您 {{ distance }}km
			</view>
		</view>
		<view class="list">
			<scroll-view style="height: 100%;" scroll-y="true" class="scroll-view category">
				<view id="demo1" class="category-item" :class="item.id == activeCategory ? 'active' : ''"
					@click="changeCategory(item.id)" v-for="item in list" :key="item.id">
					{{ item.categoryName }}
				</view>
			</scroll-view>
			<scroll-view style="height: 100%;" :scroll-y="true" class="scroll-view goods" scroll-with-animation
				:scroll-into-view="scrollView">
				<view :id="`c${category.id}`" v-for="category in list" :key="category.id">
					<view class="category-name">
						{{ category.categoryName }}
					</view>
					<view class="goods-list">
						<view class="goods-item" v-for="goods in category.goods" :key="goods.goodsId" @click="handleDetail(goods)">
							<view class="img">
								<image style="width: 100%; height: 100%; background-color: #eee;border-radius: 4rpx;" mode="aspectFill"
									:src="goods.img"></image>
							</view>
							<view class="goods-info">
								<view class="goods-name">
									{{ goods.goodsName }}
								</view>
								<view class="intro">
									{{ goods.intro }}
								</view>
								<view class="footer">
									<view class="money">
										￥{{ goods.minPrice / 100 }} 起
									</view>
									<view class="add">
										<uni-icons type="plus-filled" size="30" color="#86B394"></uni-icons>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="no-more">
					没有更多啦
				</view>
			</scroll-view>
		</view>
		<Cart></Cart>
	</view>
</template>

<script setup>
import {
	apiQueryCateGoods
} from '@/api/goods.js'
import { apiDistance } from '@/api/shop.js'

const shopStore = useShopStore()
const isTakeoutStore = useIsTakeoutStore()

function changeTakeOut(value) {
	console.log(value)
	isTakeoutStore.isTakeout = value
}

const activeCategory = ref()

const list = ref([])

async function getList() {
	try {
		const res = await apiQueryCateGoods(isTakeoutStore.isTakeout)
		list.value = res
		if (res.length > 0) {
			activeCategory.value = res[0].id
		}
	} catch (e) {
		console.error(e);
		//TODO handle the exception
	}
}
const distance = ref(0)
async function getDistance() {
	try {
		const location = await getLocation()
		const res = await apiDistance(location)
		// 转换为km 保留1位小数
		distance.value = (res / 1000).toFixed(1)
	} catch (error) {
		console.error(error);
	}
}

function getLocation() {
	return new Promise((resolve, reject) => {
		uni.getLocation({
			type: 'wgs84',
			success: function(res) {
				resolve(`${res.latitude},${res.longitude}`)
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}

onLoad(() => {
	getList()
	getDistance()
})

watch(() => isTakeoutStore.isTakeout, () => {
	getList()
})
const scrollView = ref('')
function changeCategory(categoryId) {
	console.log('categoryId :>> ', categoryId);
	activeCategory.value = categoryId
	scrollView.value = `c${categoryId}`
}


function handleDetail(goods) {
	uni.navigateTo({
		url: "/pages/goodsDetail/goodsDetail"
	})

}

function handleSearch() {
	uni.navigateTo({
		url: "/pages/search/search"
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
				display: flex;
				align-items: center;
				justify-content: center;
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

				// text-align: center;
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
							-webkit-line-clamp: 1;
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
								font-weight: 500;
							}
						}
					}
				}
			}

			.no-more {
				padding-top: 30rpx;
				height: 300rpx;
				display: flex;
				justify-content: center;
				font-size: 28rpx;
				color: #71717a;
			}
		}
	}
}
</style>