import storage from './storage'

// token 存取--------------------------------
const TokenKey = 'chain_token'

// 过期时间(小时)
const TokenExpire = 0.5

export function setToken(token) {
  storage.setItem(TokenKey, token, TokenExpire)
}

export function getToken() {
  return storage.getItem(TokenKey)
}

export function removeToken() {
  storage.removeItem(TokenKey)
}

// refreshToken 存取----------------------------
const RefreshTokenKey = 'chain_refresh_token'

/**
 * @param {number} refreshTokenExpire 过期时间(小时)，默认为 24 小时
 */
export function setRefreshToken(refreshToken, refreshTokenExpire = 24) {
  storage.setItem(RefreshTokenKey, refreshToken, refreshTokenExpire)
}

export function getRefreshToken() {
  return storage.getItem(RefreshTokenKey)
}

export function removeRefreshToken() {
  storage.removeItem(RefreshTokenKey)
}

// TokenTime 存取----------------------------
const TokenTimeKey = 'token_time'

export function setTokenTime(tokenTime) {
  storage.setItem(TokenTimeKey, tokenTime)
}

export function getTokenTime() {
  return storage.getItem(TokenTimeKey)
}

export function removeTokenTime() {
  storage.removeItem(TokenTimeKey)
}
