<template>
  <view class="container">
    <uni-popup ref="popup" type="center" border-radius="16rpx 16rpx 16rpx 16rpx" :safe-area="false">
      <view class="card">
        <view class="head">
          <view class="action" @click="close()">
            <uni-icons type="close" size="26"></uni-icons>
          </view>
        </view>
        <view class="info">
          <input type="nickname" :value="val" @change="onInput" placeholder="请输入"></input>
        </view>
        <view class="btn">
          <button class="button" @click="handleSubmit">确认</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
const props = defineProps({
  value: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['update:value', 'change'])

const val = ref('')

function onInput(e) {
  console.log('e.detail.value :>> ', e.detail.value);
  val.value = e.detail.value
}

const popup = ref(null)

function open() {
  nextTick(() => {
    val.value = props.value
    popup.value.open()
  })
}

function close() {
  popup.value.close()
}

function handleSubmit() {
  console.log('val.value :>> ', val.value);
  emits('update:value', val.value)
  emits('change', val.value)
  close()
}

defineExpose({
  open
})
</script>

<style scoped lang="scss">
.container {
  .card {
    background: #fff;
    border-radius: 16rpx;
    display: flex;
    flex-direction: column;
    padding-bottom: 20rpx;
    width: 600rpx;

    .head {
      display: flex;
      justify-content: flex-end;
      padding: 20rpx;
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20rpx;
    }

    .btn {
      padding: 20rpx;

      .button {
        background-color: #86B394;
        color: #fff;
        border-radius: 50rpx;
        padding: 0 30rpx;
        margin: 0;
      }
    }
  }


}
</style>