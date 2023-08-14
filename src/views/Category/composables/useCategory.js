// 封装分类数据业务代码
import { ref,onMounted} from 'vue'
import {getCategoryAPI} from '@/apis/category'
import { onBeforeRouteUpdate } from 'vue-router'
import {useRoute} from 'vue-router'

export function useCategory () {
    const categoryData = ref({})
    const route = useRoute()
    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id)
        console.log(res)
        categoryData.value = res.result
    }
    onMounted( ()=>{ getCategory() } )
    
    // 路由参数变化时,把分类数据接口重新发送
    onBeforeRouteUpdate( (to) => {
        console.log('路由变化了')
        getCategory(to.params.id)
    })

    return {
        categoryData
    }
}