import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

// 模块自动化导入
const modulesFiles = require.context('./modules', false, /\.js$/)

const modulesRouters = modulesFiles.keys().reduce((total, curr) => {
    // console.log(total, curr)
    const value = modulesFiles(curr)
    // console.log('-value-', value)
    return total.concat(value.default)
}, [])

console.log('modulesRouters:', modulesRouters)

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/index' },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: 'login' */ '@/views/login'),
        meta: { title: '登录' },
    },
    ...modulesRouters,
]

console.log('routes:', routes)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
