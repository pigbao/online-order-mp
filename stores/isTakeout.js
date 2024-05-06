import { defineStore } from 'pinia';

export const useIsTakeoutStore = defineStore('isTakeout', () => {
  const isTakeout =  ref('1')
  const {dictVL: isTakeoutDict} = useDict('isTakeout')
  const isTakeLabel = computed(()=>{
    return isTakeoutDict.value[isTakeout.value]
  })


  return { isTakeout,isTakeLabel};
});
