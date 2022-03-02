/**
 * 自定义指令
 */
import Vue from 'vue'

/**
 * 后台管理按钮权限指令
 * v-has="按钮标识"
 */
Vue.directive('has', {
    bind: function(el, binding, vnode) {
        // 获取页面按钮权限
        // console.log('el:', el, binding, vnode)
        // console.log('route:', vnode.context.$route)
        let authBtns = vnode.context.$store.state.user.authBtns
        let meta = vnode.context.$route.meta
        // console.log('authBtns:', authBtns)
        // console.log('meta:', meta)

        if (authBtns[meta.title]) {
            const currBtns = authBtns[meta.title].map(item => item.uri)
            // console.log('binding:', binding.value)
            // console.log('currBtns:', currBtns)
            if (!currBtns.includes(binding.value)) {
                el.style.display = 'none'
            }
        }
    },
})

function has(value, permissions) {
    let isExist = true
    if (permissions === undefined || permissions === null || permissions.length === 0) {
        return true
    }
    if (!permissions.includes(value)) {
        isExist = false
    }

    return isExist
}
