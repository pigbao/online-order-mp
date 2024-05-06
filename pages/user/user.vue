<template>
	<view class="container">
		<view class="header" :style="`background-image: url(${url});`">

			<view class="user-info">
				<button class="avatar" open-type="chooseAvatar" @chooseavatar="changeAvatar">
					<image class="image" mode="aspectFit" :src="userStore.userInfo?.avatar"></image>
				</button>
				<view class="name" @click="openNickName">
					{{ userStore.userInfo?.nickName || '用户' }}
				</view>
				<view class="tip">
					感谢您的支持
				</view>
			</view>
		</view>

		<view class="card">
			<view class="list">
				<view class="item" @click="address">
					<uni-icons type="location-filled" size="26"></uni-icons>
					<view class="label">
						地址管理
					</view>
					<uni-icons type="right" size="16"></uni-icons>
				</view>
				<view class="item" @click="call">
					<uni-icons type="headphones" size="26"></uni-icons>
					<view class="label">
						联系客服
					</view>
					<uni-icons type="right" size="16"></uni-icons>
				</view>
			</view>
		</view>
		<NickName ref="nickNameRef" @change="changeNickName"></NickName>
	</view>
</template>

<script setup>
import { apiAvatar, apiNickName } from '@/api/user'
import { baseUrl } from '@/utils/env'
const url = ref(baseUrl + '/public/icon/user/bg.png')

const userStore = useUserStore()

async function changeAvatar(e) {
	try {
		await apiAvatar(e?.detail?.avatarUrl)
		userStore.userInfo.avatar = e?.detail?.avatarUrl
	} catch (error) {
		console.error(error);
	}
}

const nickNameRef = ref()
function openNickName() {
	nickNameRef.value.open()
}

async function changeNickName(e) {
	try {
		console.log('e :>> ', e);
		await apiNickName(e)
		userStore.userInfo.nickName = e
	} catch (error) {
		console.error(error);
	}

}

function address() {
	uni.navigateTo({
		url: "/pages/address/address"
	})
}

function call() {
	uni.makePhoneCall({
		phoneNumber: '13685079602'
	})
}
</script>

<style scoped lang="scss">
.container {
	min-height: 500rpx;



	.header {
		padding: 500rpx 20rpx 0 20rpx;
		background-repeat: no-repeat;
		background-size: cover;

		.user-info {
			background-color: #fff;
			padding: 20rpx 20rpx 50rpx 20rpx;
			position: relative;
			border-radius: 16rpx;

			.avatar {
				position: absolute;
				top: -80rpx;
				left: 50%;
				transform: translate(-50%);
				padding: 10rpx;
				background-color: #fff;
				border-radius: 100rpx;

				.image {
					width: 140rpx;
					height: 140rpx;
					background-color: #eee;
					border-radius: 75rpx;
				}
			}

			.name {
				padding-top: 80rpx;
				padding-bottom: 20rpx;
				text-align: center;
				font-size: 34rpx;
			}

			.tip {
				font-size: 26rpx;
				text-align: center;
				color: #9ca3af;
			}
		}
	}

	.card {
		padding: 50rpx 20rpx 20rpx 20rpx;
		margin-bottom: 20rpx;

		.list {
			background-color: #fff;
			border-radius: 16rpx;

			.item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx;

				.label {
					flex: 1;
					padding: 0 10rpx;
				}
			}
		}
	}
}
</style>