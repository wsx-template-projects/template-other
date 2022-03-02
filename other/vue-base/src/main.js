import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from '@/plugins/wsx-toast'
import Loading from '@/plugins/wsx-loading'

// 全局样式
import '@/styles/index.less'
import 'normalize.css/normalize.css'
// vconsole调试工具
import '@/utils/vconsole'
// rem适配
import '@/utils/flexible'

// 引入 iconfont
import './assets/iconfont/iconfont.css'
// 使用彩色图标，需要引入如下的文件
// import './assets/iconfont/iconfont'

Vue.use(Toast)
Vue.use(Loading)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
