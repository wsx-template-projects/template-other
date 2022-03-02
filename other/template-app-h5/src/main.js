/*
 * @Author: wangshengxian
 * @Date: 2020-04-20 15:29:40
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-02-01 18:38:22
 * @Desc:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Loading from '@/plugins/loading' // 初始化加载loading
import PageLoading from '@/plugins/pageLoading' // 页面加载loading
// import VueAMap from 'vue-amap'
import BaiduMap from 'vue-baidu-map'

// 全局样式
import '@/styles/index.less'
import 'normalize.css/normalize.css'
// 路由守卫
import '@/router/routerGuards.js'
// vconsole调试工具
import '@/assets/js/vconsole'
// rem适配
import '@/assets/js/flexible'
// vant按需引入
import '@/vant'

Vue.use(Loading)
Vue.use(PageLoading)

// Vue.use(VueAMap)

// 初始化vue-amap
// VueAMap.initAMapApiLoader({
//     // 高德key
//     key: 'e7456d9e2f3526fcd7c1f438645cfd0e',
//     // 插件集合 （插件按需引入）
//     plugin: [
//         'AMap.Autocomplete',
//         'AMap.PlaceSearch',
//         'AMap.Scale',
//         'AMap.OverView',
//         'AMap.ToolBar',
//         'AMap.MapType',
//         'AMap.PolyEditor',
//         'AMap.CircleEditor',
//         'AMap.Geolocation',
//         'AMap.Geocoder',
//     ],
//     v: '1.4.4',
// })

// 地图组件F5刷新会报错 控制台输入
// Uncaught (in promise) TypeError: v.w.uh is not a constructor
// Uncaught TypeError: l is not a function
//在main.js增加这段话 （能清除之前缓存的地图信息）
// const amapKeys = Object.keys(localStorage).filter(key => key.match(/^_AMap_/))

// amapKeys.forEach(key => {
//     // console.log(key)
//     localStorage.removeItem(key)
// })

Vue.use(BaiduMap, { ak: 'Z5qT3zAQsk7WSNMcGf70izO26wwPTl72' })

Vue.config.productionTip = false

window.addEventListener(
    'popstate',
    function(e) {
        // TODO: 后面再处理
        router.isBack = true
    },
    false,
)
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
