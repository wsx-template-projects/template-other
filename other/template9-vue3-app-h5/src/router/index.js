import { createRouter, createWebHistory } from 'vue-router'

/* 模块自动化导入 */
const modulesFiles = require.context('./modules', false, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // console.log(modules, modulePath)
    const value = modulesFiles(modulePath)
    // console.log('-value-', value)
    return [...modules, ...value.default]
}, [])

// console.log('-modules-', modules)

const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'Index',
        component: () => import(/* webpackChunkName: 'index' */ '@/views/index'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/login'),
        meta: {
            title: '登录页'
        }
    },
    ...modules
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
