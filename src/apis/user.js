// 用户相关接口函数
import request from '@/utils/http'

export const loginAPI = ({account, password}) => {
    return request({
        url:'/login',
        method:'POST',
        data:{
            account,
            password
        }
    })
}