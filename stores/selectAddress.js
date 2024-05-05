import { defineStore } from 'pinia';

export const useSelectAddressStore = defineStore('selectAddress', () => {
  const addressInfo =  ref({})

  function setAddress (address) {
    addressInfo.value = address
  }

  return { addressInfo,setAddress};
});
