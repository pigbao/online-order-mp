<template>
	<view class="container">
		<view class="list">
			<view class="item" v-for="item in list" :key="item.id">
				<view class="info" @click="handleSelect(item)">
					<view class="address">
						{{ item.address }}
					</view>
					<view class="contacts">
						{{ item.name }}{{ genderDict[item.gender] }} {{ item.phone }}
					</view>
				</view>
				<view class="action" @click="handleEdit(item)">
					<uni-icons type="compose" size="30"></uni-icons>
				</view>
			</view>
		</view>
		<view class="add">
			<button class="button" @click="handleAdd">新增地址</button>
		</view>
	</view>
</template>

<script setup>
import { apiQuery } from '@/api/address'

const isSelect = ref(false)

function handleAdd() {
	uni.navigateTo({
		url: "/pages/addressDetail/addressDetail"
	})
}

function handleEdit({ id }) {
	uni.navigateTo({
		url: `/pages/addressDetail/addressDetail?id=${id}`
	})
}

const list = ref([])

async function getList() {
	try {
		const res = await apiQuery()
		list.value = res
	} catch (error) {
		console.log('error :>> ', error);
	}
}

const { dictVL: genderDict } = useDict('gender')

const selectAddressStore = useSelectAddressStore()
function handleSelect(value) {
	if (isSelect.value) {
		selectAddressStore.setAddress(value)
		uni.navigateBack({
			delta: 1
		})
	}
}

onShow(() => {
	getList()
})

onLoad((options) => {
	isSelect.value = Boolean(options.isSelect)
})
</script>

<style scoped lang="scss">
.container {
	padding: 20rpx 20rpx 200rpx 20rpx;

	.list {
		.item {
			display: flex;
			align-items: center;
			background-color: #fff;
			padding: 30rpx;
			border-radius: 16rpx;
			margin-bottom: 20rpx;

			.info {
				flex: 1;

				.address {
					font-weight: 600;
					margin-bottom: 10rpx;
				}

				.contacts {
					font-size: 26rpx;
					color: #9ca3af;
					padding-top: 8rpx;
				}
			}
		}
	}

	.add {
		position: fixed;
		bottom: 100rpx;
		left: 100rpx;
		right: 100rpx;


		.button {
			background-color: #86B394;
			color: #fff;
			border-radius: 50rpx;
		}
	}
}
</style>