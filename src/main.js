import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/styles/common.scss'
import {lazyPlugin} from '@/directives'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// 引入懒加载插件
app.use(lazyPlugin)
app.mount('#app')


