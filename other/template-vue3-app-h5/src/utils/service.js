/*
 * 请求拦截
 */
import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

const service = axios.create()

// 定义额外配置
let configMore

/* request interceptor */
service.interceptors.request.use(
    (config) => {
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

        // if (store.state.user.token) {
        //     config.headers.key = store.state.user.token
        // }

        const token =
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYTE0MTExIiwiYXVkIjoid2ViIiwiY3JlYXRlZCI6MTYyODY4MTU0MzYyMywiYXBwSWQiOm51bGwsImlzcyI6ImljaW5mby5jbiIsImV4cCI6MTYyOTI4NjM0M30.FdEhWcu3sGDC9xSPc3vdt3_zDz0YDXVSJGqg20zWQLhlmS4oQysM6o13zqF3saxHgdPcOOSDGhJeRssYyeqKmA'
        config.headers['Authorization'] = 'Bearer ' + token
        console.log('-config-', config)
        return config
    },
    (error) => {
        console.log('_REQ_ERROR_', error)
        return Promise.reject(error)
    }
)

/* response interceptor */
service.interceptors.response.use(
    (response) => {
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
            console.log('-认证失败，请前往登录-')
        }
        Toast({
            message: res.msg,
            duration: 2000,
        })
        return Promise.reject(res)
    },
    (error) => {
        // TODO: 服务器繁忙，可能是key值不对，又或者超时，系统故障
        console.log('_RES_ERROR_', error)
        Toast({
            message: 'error：' + error.message,
            duration: 2000,
        })
        return Promise.reject(error)
    }
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
