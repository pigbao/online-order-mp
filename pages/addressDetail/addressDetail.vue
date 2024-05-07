<template>
	<view class="container">
		<view class="form">

			<view class="item">
				<view class="label">
					联系人
				</view>
				<view class="value">
					<uni-easyinput placeholder="请输入联系人" v-model="form.name" :inputBorder="false"></uni-easyinput>
				</view>
			</view>
			<view class="item">
				<view class="label">
					性别
				</view>
				<view class="value">
					<radio-group @change="changeGender" class="radio-group">
						<view class="radio-option" v-for="(item) in genderDict" :key="item.value">
							<view>
								<radio :value="item.value" :checked="item.value == form.gender" style="transform:scale(0.8)"
									activeBackgroundColor="#86B394" color="#86B394" />
							</view>
							<view>{{ item.label }}</view>
						</view>
					</radio-group>
				</view>
			</view>
			<view class="item">
				<view class="label">
					手机号
				</view>
				<view class="value">
					<uni-easyinput placeholder="请输入手机号" v-model="form.phone" :inputBorder="false"></uni-easyinput>

				</view>
			</view>
			<view class="item">
				<view class="label">
					收货地址
				</view>
				<view class="value">
					<uni-easyinput placeholder="请输入收货地址" v-model="form.address" :inputBorder="false"></uni-easyinput>
				</view>
			</view>
		</view>
		<view class="btn">
			<button class="button" @click="handleAdd">保存</button>
		</view>

	</view>
</template>

<script setup>
import { apiAdd, apiUpdate, apiDetail } from '@/api/address.js'
const form = ref({
	name: '',
	gender: '1',
	phone: '',
	address: ''
})

function changeGender(e) {
	form.value.gender = e?.detail?.value
}

async function handleAdd() {
	try {
		console.log('form.value :>> ', form.value);
		if (checkEmpty(form.value.name)) {
			uni.showToast({
				title: '联系人不能为空',
				icon: 'none'
			})
			return
		}
		if (checkEmpty(form.value.gender)) {
			uni.showToast({
				title: '请选择性别',
				icon: 'none'
			})
			return
		}
		if (checkEmpty(form.value.phone)) {
			uni.showToast({
				title: '手机号不能为空',
				icon: 'none'
			})
			return
		}
		if (checkEmpty(form.value.address)) {
			uni.showToast({
				title: '收货地址不能为空',
				icon: 'none'
			})
			return
		}

		if (form.value.id) {
			await apiUpdate(form.value)
		} else {
			await apiAdd(form.value)
		}
		uni.navigateBack({
			delay: 1
		})

	} catch (error) {
		console.error(error);
	}
}

// 判断是否为空
function checkEmpty(value) {
	return value == "" || value == undefined || value == null
}

async function getDetail(id) {
	try {
		const res = await apiDetail(id)
		form.value = res
	} catch (error) {
		console.error(error);
	}
}

onLoad((options) => {
	if (options?.id) {
		getDetail(options.id)
	}
})

const { dictArray: genderDict } = useDict('gender')
</script>

<style scoped lang="scss">
.container {
	padding: 20rpx;

	.form {
		background-color: #fff;
		padding: 30rpx;

		.item {
			display: flex;
			align-items: center;
			padding: 20rpx 0;

			.label {
				width: 140rpx;
			}

			.value {
				flex: 1;
			}
		}
	}

	.radio-group {
		display: flex;
		padding-left: 10rpx;

		.radio-option+.radio-option {
			margin-left: 80rpx;

		}

		.radio-option {
			display: flex;
			align-items: center;
		}
	}

	.btn {

		padding: 50rpx 0;

		.button {
			background-color: #86B394;
			color: #fff;
			border-radius: 50rpx;
		}
	}
}
</style>