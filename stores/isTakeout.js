import { defineStore } from 'pinia';

export const useIsTakeoutStore = defineStore('isTakeout', () => {
  const isTakeout =  ref('1')


  return { isTakeout};
});
