import { defineStore } from 'pinia';
import {
  apiAddCart,
  apiGetCartList,
  apiUpdateCart,
  apiDelCart,
  apiClearCart,
} from '@/api/cart.js';

const isTakeoutStore = useIsTakeoutStore();

// 购物车
export const useCartStore = defineStore('cart', () => {
  // 购物车列表
  const cartList = ref([]);
  // 加入购物车
  async function addCart(data) {
    try {
      await apiAddCart({ ...data, isTakeout: isTakeoutStore.isTakeout });
      getList();
    } catch (error) {
      console.error(error);
    }
  }
  // 更新购物车
  async function updateCart(data) {
    try {
      await apiUpdateCart(data);
      getList();
    } catch (error) {
      getList();
      console.error(error);
    }
  }

  // 删除购物车
  async function delCart(id) {
    try {
      await apiDelCart(id);
      getList();
    } catch (error) {
      getList();
      console.error(error);
    }
  }
  // 清空购物车
  async function clearCart() {
    try {
      await apiClearCart(isTakeoutStore.isTakeout);
      cartList.value = [];
    } catch (error) {
      console.error(error);
    }
  }
  // 获取购物车列表
  async function getList() {
    try {
      cartList.value = await apiGetCartList(isTakeoutStore.isTakeout);
    } catch (error) {
      console.error(error);
    }
  }
  // 购物车总数量
  const count = computed(() => {
    return cartList.value.reduce((total, item) => {
      return total + item.count;
    }, 0);
  });

  // 购物车总价
  const totalPrice = computed(() => {
    const res = cartList.value.reduce((total, item) => {
      return total + item.count * item.price;
    }, 0);
    return res / 100;
  });

  // 监听自取外卖 每次变化 获取一遍购物车列表
  watch(
    () => isTakeoutStore.isTakeout,
    () => {
      getList();
    }
  );

  return {
    cartList,
    addCart,
    updateCart,
    getList,
    delCart,
    clearCart,
    count,
    totalPrice,
  };
});
