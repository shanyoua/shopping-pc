import axios from "axios"
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import router from '@/router'
// 基础配置，，baseurl、超时
const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})
/// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    // 1、获取token数据
    const userStore = useUserStore()
    // 2、按照后端要求拼接数据
    const token = userStore.userInfo.token
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config 
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    //统一错误提示
    ElMessage({
        type:'warning',
        message: e.response.data.message
    })
    // 401 token失效处理
    // 1、清除本地用户数据
    // 2、跳转登录页
    if(e.response.status === 401 ) {
        userStore.clearUserInfo()
        router.push('/login')
    }
    return Promise.reject(e)
})

export default httpInstance