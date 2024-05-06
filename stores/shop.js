import { defineStore } from 'pinia';
import {apiGetShop ,apiDistance} from '@/api/shop'


export const useShopStore = defineStore('shop', () => {
  const shopInfo =  ref({})

  async function loadShop(){
    try {
      const res = await apiGetShop()
      shopInfo.value = res
    } catch (error) {
      console.error(error);
    }
  }

  async function getDistance() {
    try {
      const location = await getLocation()
      const res = await apiDistance(location)
      // 转换为km 保留1位小数
      return (res / 1000).toFixed(1)
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

  return { shopInfo,loadShop,getDistance};
});
