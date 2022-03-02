/**
 * 公共api
 */
import request from '@/scripts/http/request'
import Qs from 'qs'

const root = '/blockchain'

/**
 * 获取号码前缀
 */
export function getPhonePrefix() {
    return request({
        url: root + '/common/country-code',
        method: 'get',
        data: {},
    })
}

// 验证码类型
const codeTypes = {
    register: 'SIGN_UP_IN',
    validate: 'VALIDATE',
    reset: 'RESET_PASSWORD',
}

/**
 * 发送短信验证码
 * @param {string} type 验证码类型 =》register/validate/reset (注册/验证/重置密码)
 */
export function sendMsg(data, type) {
    data = { type: codeTypes[type], ...data }
    return request({
        url: root + '/common/code/sms' + '?' + Qs.stringify(data),
        method: 'post',
        data: {},
    })
}

/**
 * 短信验证码登录
 */
export function login(data) {
    return request({
        url: root + '/member/login/mobile' + '?' + Qs.stringify(data),
        method: 'post',
        data: {},
    })
}

/**
 * 刷新用户token
 */
export function refreshToken(data) {
    return request({
        url: root + '/common/token/refresh' + '?' + Qs.stringify(data),
        method: 'post',
        data: {},
    })
}
