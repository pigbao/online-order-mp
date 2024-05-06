import { defineStore } from 'pinia';
import {
  apiAddCart,
  apiGetCartList,
  apiUpdateCart,
  apiDelCart,
  apiClearCart,
} from '@/api/cart.js';

const isTakeoutStore = useIsTakeoutStore();

export const useCartStore = defineStore('cart', () => {
  const cartList = ref([]);
  async function addCart(data) {
    try {
      await apiAddCart({...data,isTakeout:isTakeoutStore.isTakeout});
      getList();
    } catch (error) {
      console.error(error);
    }
  }

  async function updateCart(data) {
    try {
      await apiUpdateCart(data);
      getList();
    } catch (error) {
      getList();
      console.error(error);
    }
  }

  async function delCart(id) {
    try {
      await apiDelCart(id);
      getList();
    } catch (error) {
      getList();
      console.error(error);
    }
  }

  async function clearCart() {
    try {
      await apiClearCart(isTakeoutStore.isTakeout);
      cartList.value = [];
    } catch (error) {
      console.error(error);
    }
  }

  async function getList() {
    try {
      cartList.value = await apiGetCartList(isTakeoutStore.isTakeout);
    } catch (error) {
      console.error(error);
    }
  }

  const count = computed(() => {
    return cartList.value.reduce((total, item) => {
      return total + item.count;
    }, 0);
  });

  const totalPrice = computed(() => {
    const res = cartList.value.reduce((total, item) => {
      return total + item.count * item.price;
    }, 0);
    return res / 100;
  });

  watch(() => isTakeoutStore.isTakeout, () => {
    getList();
  });

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
