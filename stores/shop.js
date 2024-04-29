import { defineStore } from 'pinia';
import {apiGetShop} from '@/api/shop'

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

  return { shopInfo,loadShop};
});
