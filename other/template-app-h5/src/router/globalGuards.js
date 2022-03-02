/**
 * 全局守卫
 */
import store from '@/store'

/**
 * 设置顶部状态栏高度
 */
function setStatusBarHeight(to, from) {
    if (to.query.statusBarHeight) {
        let statusBH = to.query.statusBarHeight
        store.commit('global/setStatusBarHeight', statusBH)
    }
}

/**
 * 存储登录状态
 */
function setLoginStatus(to, from) {
    if (to.query.key) {
        // console.log('-query-', to.query)
        let token = to.query.key
        store.commit('user/setToken', token)
        localStorage.setItem('access_token', token)
    }
}

/**
 * 修改页面title
 */
function setDocumentTitle(to, from) {
    document.title = '' // TODO 根据具体的项目自行更改
    if (to.meta && to.meta.title) {
        document.title = to.meta.title
    }
}

/**
 * 跳转登录页
 */
function jumpNeedLogin(to, from) {
    if (to.query && to.query.need_login) {
        if (store.getters && !store.getters['/user/token']) {
            this.toast({
                message: '去登录页',
                duration: '3000',
            })
        }
    }
}

/**
 * 设置路由跳转的name
 */
function setRouteNames(to, from) {
    let names = [to.name, from.name]
    console.log(names)
    store.commit('global/setToFromRouteNames', names)
    return
}

export default {
    // 设置顶部状态栏高度
    setStatusBarHeight,
    // 存储登录状态
    setLoginStatus,
    // 修改页面title
    setDocumentTitle,
    // 跳转登录页
    jumpNeedLogin,
    // 路由跳转name
    setRouteNames,
}
