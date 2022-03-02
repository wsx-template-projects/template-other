import { Base64 } from 'js-base64'
import { getTokenTime } from '@/utils/auth'

/**
 * 获取refreshToken有效时长(单位:小时)
 */
function getRefreshTokenDuration(refreshToken) {
  const end = getTokenExpTime(refreshToken)
  const diff = end - new Date().getTime()
  // console.log('-diff-', diff)
  return Math.ceil(diff / 1000 / 3600)
}

/**
 * 获取token过期时间(单位:毫秒)
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
function isTokenExpired(time = 300) {
  const end = getTokenTime()
  const diff = Math.ceil((end - new Date().getTime()) / 1000)
  // console.log('-diff-', diff)
  return diff < time
}

export default {
  // 获取refreshToken有效时长(单位:小时)
  getRefreshTokenDuration,
  // 获取token过期时间(单位:毫秒)
  getTokenExpTime,
  // token是否过期
  isTokenExpired
}
