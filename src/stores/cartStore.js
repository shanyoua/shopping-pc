import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import { useUserStore } from './user'
import{ insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'
export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    // 1. 定义state - carList
    const carList = ref([])
    // 获取最新购物车列表action
    const updateNewList = async () => {
      const res = await findNewCartListAPI()
      carList.value = res.result
    }
    // 2. 定义action - addCart
    const addCart = async (goods) => {
      const { skuId, count } = goods
      if (isLogin.value) {
        // 登录之后的加入购车逻辑
        await insertCartAPI({ skuId, count })
        updateNewList()
      } else {
        const item = carList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
          // 找到了
          item.count++
        } else {
          // 没找到
          carList.value.push(goods)
        }
      }
    }
  
    // 删除购物车
    const delCart = async (skuId) => {
      if (isLogin.value) {
        // 调用接口实现接口购物车中的删除功能
        await delCartAPI([skuId])
        updateNewList()
      } else {
        // 思路：
        // 1. 找到要删除项的下标值 - splice
        // 2. 使用数组的过滤方法 - filter
        const idx = carList.value.findIndex((item) => skuId === item.skuId)
        carList.value.splice(idx, 1)
      }
    }
  
    // 清除购物车
    const clearCart = () => {
      carList.value = []
    }
    
    // 单选功能
    const singleCheck = (skuId, selected) => {
        const item = carList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }

    // 全选
    const isAll = computed(()=>carList.value.every((item) => item.selected))
    const allCheck = (selected) => {
        carList.value.forEach(item => item.selected = selected)
    }

    // 已选择数量
    const selectedCount = computed(()=> carList.value.filter(item => item.selected).reduce((a,c)=>a + c.count, 0))
    // 商品合计
    const selectedPrice = computed(()=> carList.value.filter(item => item.selected).reduce((a,c)=>a + c.count * c.price, 0))
    // 数量和价格计算
    const allCount = computed( () => carList.value.reduce((a,c)=>a + c.count, 0))
    const allPrice = computed( () => carList.value.reduce((a,c)=>a + c.count * c.price, 0))
    return {
        carList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        isAll,
        allCheck,
        selectedCount,
        selectedPrice,
        clearCart,
        updateNewList
    }
},{
    persist: true
})