/**
 * 请求拦截器
 */
import axios from 'axios'

const service = axios.create()

// 定义额外配置
let configMore

/* request interceptor */
service.interceptors.request.use(
    config => {
        config.baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_SERVER_URL : ''
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

        return config
    },
    error => {
        console.log('_REQ_ERROR_', error)
        return Promise.reject(error)
    }
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
        // todo: toast提示
        return Promise.reject(res)
    },
    error => {
        console.log('_RES_ERROR_', error)
        // todo: toast提示
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
        isSelf
    }
    // 配置公共参数
    config.data = { ...config.data }
    return service(config)
}

export default request
