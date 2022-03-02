import Vue from 'vue'
import VueRouter from 'vue-router'

// 模块自动化导入
const modulesFiles = require.context('./modules', false, /\.js$/)

const modulesRouters = modulesFiles.keys().reduce((total, curr) => {
  // console.log(total, curr)
  const value = modulesFiles(curr)
  // console.log('-value-', value)
  return total.concat(value.default)
}, [])

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: 'index' */ '@/views/index'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/log',
    name: 'Log',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login'),
    meta: { title: '登录' }
  },
  ...modulesRouters
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
