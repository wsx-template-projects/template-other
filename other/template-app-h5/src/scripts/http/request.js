/**
 * 请求拦截，只有在需要需要刷新 token 的场景下使用该拦截器，
 * 若使用场景不需要刷新token，请使用 service.js
 */
import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import router from '@/router'
import tools from '@/scripts/utils/tools'
import { getToken, getRefreshToken } from '../auth/auth'
import authTools from '../auth/authTools'

const service = axios.create()

// 定义额外配置
let configMore

/* 是否有请求正在刷新token */
window.isRefreshing = false

/* 被挂起的请求数组 */
let refreshSubscribers = []

/* push所有的请求到数组中，[function(token){}, function(token){},...] */
function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb)
}

/* 刷新请求(refreshSubscribers数组中的请求得到新的token之后会自执行，用新的token去请求数据) */
function onRefreshed(token) {
    refreshSubscribers.map(cb => cb(token))
}

/**
 * 没有token时的处理方法
 * @param {object} config
 * @param {function} cb 刷新token请求完成的回调，通过参数 success/error 来区分请求完成时的状态
 * @return 返回在刷新token过程中挂起的请求
 */
function handleNoToken(config, cb = () => {}) {
    // console.log('开始获取新的token...')
    // 是否正在刷新token
    if (window.isRefreshing) {
        // console.log('-isRefreshing-')
        return config
    }
    window.isRefreshing = true
    refreshSubscribers = [] // 清空待执行的请求数组
    store
        .dispatch('user/getAgainToken')
        .then(res => {
            // console.log('-retry-arr-', refreshSubscribers)
            cb('success')
            window.isRefreshing = false
            onRefreshed(res.data)
        })
        .catch(err => {
            console.log('-token刷新失败-')
            cb('error')
            window.isRefreshing = false
        })
    const retry = new Promise((resolve, reject) => {
        subscribeTokenRefresh(token => {
            // console.log('-刷新后的token-', token)
            config.headers.key = token
            /* 将请求挂起 */
            resolve(config)
        })
    })
    // console.log('-请求挂起-', retry)
    return retry
}

const toLoginPage = tools.debounce(function() {
    store.dispatch('user/resetToken').then(() => {
        console.log('-认证失败，前往登录-')
        setTimeout(() => {
            router.push({ path: '/log' })
        }, 1000)
    })
}, 1000)

/* request interceptor */
service.interceptors.request.use(
    config => {
        config.baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_SERVER_URL : ''
        // config.timeout = config.timeout || 50
        config.timeout = config.timeout || 50000
        // 数据传参使用表单形式
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
        // config.headers['language'] = 0
        config.method = config.method || 'post'
        if (config.method === 'post') {
            config.data = config.data || {}
        } else if (config.method === 'get') {
            config.params = config.data || config.params
        }

        const refreshToken = getRefreshToken() // TODO: 此处只能通过本地存储获取，不可用 vuex 获取
        // console.log('-refresh-token-', refreshToken)

        if (!refreshToken) {
            // 去登录页
            return config
        }

        const token = getToken() // TODO: 此处只能通过本地存储获取，不可用 vuex 获取
        // console.log('-token-', token)

        if (!token) {
            return handleNoToken(config)
        }

        config.headers.key = token
        // token没有即将过期，或者当前请求的接口为刷新token接口 (common/token/refresh 为刷新token接口地址)
        if (!authTools.isTokenExpired() || config.url.includes('common/token/refresh')) {
            // console.log('-111-', config)
            return config
        }

        return handleNoToken(config)
    },
    error => {
        console.log('_REQ_ERROR_', error)
        return Promise.reject(error)
    },
)

/* response interceptor */
service.interceptors.response.use(
    response => {
        const res = response.data
        // console.log('-res-', res)
        // isSelf为true，直接返回数据，自行处理请求异常
        if (configMore.isSelf) {
            return res
        }
        if (+res.code == 200) {
            return res
        }
        if (+res.code === 401) {
            toLoginPage()
        }
        Toast({
            message: res.msg,
            duration: 2000,
        })
        return Promise.reject(res)
    },
    error => {
        // TODO: 服务器繁忙，可能是key值不对，又或者超时，系统故障
        console.log('_RES_ERROR_', error)
        Toast({
            message: 'error：' + error.message,
            duration: 2000,
        })
        return Promise.reject(error)
    },
)

/**
 * 数据请求 配置项
 */
function request(config) {
    // 获取额外配置参数
    const { isSelf = false } = config
    configMore = {
        isSelf,
    }
    // console.log('-config-more-', configMore)
    // 配置公共参数
    config.data = { ...config.data }
    return service(config)
}

export default request
