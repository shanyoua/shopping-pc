import {defineStore} from 'pinia'
import {computed, ref} from 'vue'

export const useCartStore = defineStore('cart', ()=>{
    const carList = ref([])
    // 添加购物车
    const addCart = (goods) => {
        // 看物品是否已经在购物车列表，在的话数量加1，不在的话将物品添加进去
        const item = carList.value.find((item)=>{goods.skuId === item.skuId})
        if(item) {
            item.count++
        } else {
            carList.value.push(goods)
        }
    }
    // 删除购物车
    const delCart = (skuId) => {
        const idx = carList.value.findIndex((item) => skuId === item.skuId)
        carList.value.splice(idx,1)
    }

    // 数量和价格计算
    const allCount = computed( () => carList.value.reduce((a,c)=>a + c.count, 0))
    const allPrice = computed( () => carList.value.reduce((a,c)=>a + c.count * c.price, 0))
    return {
        carList,
        addCart,
        delCart,
        allCount,
        allPrice
    }
},{
    persist: true
})