<template>
	<view class="container">
		<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
		</map>
		<view class="card">
			<view class="card-header">

				<view class="card-title">
					{{ shopStore.shopInfo.shopName }}
				</view>
				<view class="distance">
					{{ distance }}km
				</view>
			</view>
			<view class="card-content">
				<view class="tag">
					营业中
				</view>
				<view class="info-item">
					营业时间：{{ shopStore.shopInfo.startOpeningHours }} - {{ shopStore.shopInfo.endOpeningHours }}
				</view>
				<view class="info-item">
					{{ shopStore.shopInfo.address }}
				</view>
			</view>
			<view class="card-footer">
				<view class="action" @click="handleCall">
					<uni-icons type="phone-filled" size="24"></uni-icons>
				</view>
				<view class="action" @click="handleOpenLocation">
					<uni-icons type="paperplane-filled" size="24"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>

const shopStore = useShopStore()

const latitude = ref(0)
const longitude = ref(0)

const shopLat = ref(0)
const shopLne = ref(0)

const covers = computed(() => {
	return [
		{
			id: 1,
			latitude: latitude.value,
			longitude: longitude.value,
			iconPath: '/static/map/location.png',
			width: 30,
			height: 30,
		},
		{
			id: 2,
			latitude: shopLat.value,
			longitude: shopLne.value,
			iconPath: '/static/map/shop.png',
			width: 30,
			height: 30,
			callout: {
				color: "#000000",
				bgColor: "#FFFFFF",
				content: shopStore.shopInfo.shopName,
				display: 'ALWAYS',
				padding: 10
			}
		}
	]
})

function getLocation() {
	console.log('1 :>> ', 1);
	uni.getLocation({
		type: 'wgs84',
		success: function(res) {
			console.log('res :>> ', res);
			latitude.value = res.latitude
			longitude.value = res.longitude
		},
		fail: function(err) {
			console.error(err);
		}
	})
}
const distance = ref(0)
async function loadDistance() {
	try {
		distance.value = await shopStore.getDistance()

	} catch (error) {
		console.error(error);
	}
}

onShow(() => {
	loadDistance()
	getLocation()
	shopLat.value = Number(shopStore.shopInfo.location.split(',')[0])
	shopLne.value = Number(shopStore.shopInfo.location.split(',')[1])
})

function handleCall() {
	uni.makePhoneCall({
		phoneNumber: shopStore.shopInfo.phone
	})
}

function handleOpenLocation() {
	uni.openLocation({
		latitude: shopLat.value,
		longitude: shopLne.value,
		scale: 18,
		name: shopStore.shopInfo.shopName,
		address: shopStore.shopInfo.address
	})
}
</script>

<style scoped lang="scss">
.container {

	.card {
		background-color: #fff;
		margin: 50rpx 20rpx;
		padding: 20rpx;
		border-radius: 20rpx;

		.card-header {
			display: flex;
			align-items: center;

			.card-title {
				flex: 1;
				font-size: 32rpx;
				font-weight: bold;
				padding: 20rpx 0;
			}

			.distance {
				font-size: 26rpx;
				color: #71717a;
			}
		}

		.card-content {
			.tag {
				border: 1rpx solid #86B394;
				display: inline-block;
				font-size: 24rpx;
				color: #86B394;
				padding: 4rpx 10rpx;
				border-radius: 8rpx;
				margin-bottom: 20rpx;
			}

			.info-item {
				color: #71717a;
				font-size: 24rpx;
				padding-bottom: 20rpx;
			}
		}

		.card-footer {
			display: flex;
			justify-content: flex-end;

			.action {
				padding: 8rpx;
				border-radius: 50%;
				border: 2rpx solid #525252;
				margin: 0 16rpx;
			}
		}
	}
}
</style>
