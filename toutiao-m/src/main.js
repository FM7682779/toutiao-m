import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './style/index.less'
import dayjs from 'dayjs'

// import Vue from 'vue'
// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')
const app = createApp(App)

app.use(store).use(router).use(Vant).mount('#app')
app.config.globalProperties.$filters = {
  relativeTime(value) {
    return dayjs().from(dayjs(value))
  }
}