import { Base64 } from 'js-base64'
import { getTokenTime } from '@/scripts/auth/auth'

/**
 * 获取token过期时间
 */
function getTokenExpTime(token) {
    const encryptStr = token.split('.')[0]
    const encryptObj = JSON.parse(Base64.decode(encryptStr))
    // console.log('-encrypt-obj-', encryptObj)
    return encryptObj.exp
}

/**
 * token是否过期
 * token五分钟内即将过期时开启替换token，当前后台的token有效期为30分钟
 */
function isTokenExpired(time = 1620) {
    const exp = getTokenTime()
    const now = new Date().getTime()
    const diff = Math.ceil((exp - now) / 1000)
    // console.log('-diff-', diff)
    return diff < time
}

export default {
    getTokenExpTime,
    // token是否过期
    isTokenExpired,
}
