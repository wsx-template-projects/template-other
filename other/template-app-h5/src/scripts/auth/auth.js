import storage from '../plugins-func/storage'

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

// 过期时间(小时)
const RefreshTokenExpire = 3

export function setRefreshToken(refreshToken) {
    storage.setItem(RefreshTokenKey, refreshToken, RefreshTokenExpire)
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
