<template>
	<view class="container">
		<view class="back" @click="handleBack()">
			<uni-icons type="back" size="26" color="#fff"></uni-icons>
		</view>
		<image style="width: 100%;height: 600rpx; background-color: #fff;" mode="aspectFill" :src="goods.img"></image>
		<view class="goods-info">
			<view class="name">
				{{ goods.goodsName }}
			</view>
			<view class="intro">
				{{ goods.intro }}
			</view>
		</view>

		<view class="specs">
			<view class="specs-item" v-for="(spec, index) in specs" :key="index">
				<view class="specs-name">
					{{ spec.title }}
				</view>
				<view class="specs-values">
					<view class="value" :class="selectSpecsValues.includes(value) ? 'active' : ''"
						v-for="(value, specIndex) in spec.data" :key="specIndex" @click="handleSelectSpec(index, value)">
						{{ value }}
					</view>
				</view>
			</view>
		</view>

		<view class="add-box">
			<view class="head">
				<view class="money">
					￥{{ ((selectSpecs?.price || 0) / 100) * count }}
				</view>
				<view class="count">
					<Count v-model:value="count" :maxCount="selectSpecs?.stock || 1"></Count>
				</view>
			</view>
			<view class="specs-text">
				{{ selectSpecsValues.join(',') }}
			</view>
			<view class="btn">
				<button class="button" @click="addCart">加入购物车</button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { apiGoodsDetail } from '@/api/goods.js'
function handleBack() {
	uni.navigateBack()
}
const goods = ref({})
const specs = ref([])

const selectSpecsValues = ref([])

async function getDetail(id) {
	try {
		const res = await apiGoodsDetail(id)
		goods.value = res
		loadSpecs(goods.value.specs)
		selectSpecsValues.value = specs.value.map(item => {
			return item.data[0]
		})

	} catch (error) {
		console.error(error);
	}
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
}
const selectSpecs = computed(() => {
	const spec = goods?.value?.specs?.find(item => {
		const spData = JSON.parse(item.spData)
		if (spData.every(item => selectSpecsValues.value.includes(item.value))) {
			return item.id
		}
	})
	return spec
})
const count = ref(1)

function handleSelectSpec(index, value) {
	selectSpecsValues.value[index] = value
}

const cartStore = useCartStore()

async function addCart() {
	try {
		if (selectSpecs.value.stock < count.value) {
			uni.showToast({ title: '库存不足', icon: 'none' })
			return
		}
		await cartStore.addCart({ specId: selectSpecs.value.id, count: count.value, goodsId: goods.value.id })
		uni.navigateBack(
			{ delta: 1 }
		)
	} catch (e) {
		console.error(e);
	}
}
onLoad((options) => {
	getDetail(options?.id)
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