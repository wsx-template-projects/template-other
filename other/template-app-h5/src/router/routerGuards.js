/*
 * 路由守卫
 */
import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import glg from './globalGuards'
import store from '@/store'
import { getToken, getRefreshToken } from '@/scripts/auth/auth'

/**
 * 1、验证token是否失效，失效了再验证refreshToken，没有失效直接 next()，注意若前往的为登录页，需要重定向到首页
 *
 * 2、验证refreshToken是否失效，失效去登录页，没有失效通过刷新token接口获取最新的token，
 *
 * 3、此操作只针对需要刷新token的场景
 *
 * * 注意在需要刷新token的场景，请搭配使用 service.js 请求拦截器，不要使用 request.js 拦截器
 */

const whiteList = ['/login']

// NProgress.configure({ showSpinner: false }) // 禁用进度环

router.beforeEach((to, from, next) => {
    // console.log('-router-before-', to, from)
    // first progress bar
    // NProgress.start()
    // 路由改变修改页面title(setDocumentTitle)
    glg.setDocumentTitle(to, from)

    next()
})
// router.beforeEach((to, from, next) => {
//     // console.log('-router-before-', to, from)
//     // first progress bar
//     // NProgress.start()
//     // 路由改变修改页面title(setDocumentTitle)
//     glg.setDocumentTitle(to, from)

//     const hasToken = getToken()
//     // console.log('-has-token-', hasToken)
//     if (!hasToken) {
//         noNeedRefreshToken(to, next) // TODO: token不需要刷新的场景下使用
//         // needRefreshToken(to, from, next) // TODO: token需要刷新的场景下使用
//         return
//     }
//     if (to.path === '/login') {
//         next({ path: '/' })
//         return
//     }
//     next()
// })

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})

/**
 * 没有登录或者登录过期了,
 * token需要刷新的场景下使用
 */
function needRefreshToken(to, from, next) {
    const refreshToken = getRefreshToken()
    // console.log('-has-refresh-token-', refreshToken)
    if (!refreshToken) {
        if (whiteList.indexOf(to.path) !== -1) {
            console.log('-white-')
            next()
        } else {
            console.log('-啥都没得了还不去登录，想啥呢-')
            next('/login')
        }
    } else {
        // token不存在，refreshToken存在，必须请求刷新token接口来获取最新的token
        store
            .dispatch('user/getAgainToken')
            .then(res => {
                console.log('-to-path-', to.path)
                next(to.path)
            })
            .catch(err => {
                console.log('-router-refresh-err-', err)
                next()
            })
    }
}

/**
 * 没有登录或者登录过期了,
 * token不用刷新的场景下使用
 */
function noNeedRefreshToken(to, next) {
    if (whiteList.indexOf(to.path) !== -1) {
        console.log('-white-')
        next()
    } else {
        console.log('-啥都没得了还不去登录，想啥呢-')
        next('/login')
    }
}
