/**
 * 用户相关 - store
 */
import { refreshToken } from '@/api/common'
import authTools from '@/utils/authTools'
import { setToken, setTokenTime, getRefreshToken, removeToken, removeRefreshToken, removeTokenTime } from '@/utils/auth'

const state = {
  token: '',
  refreshToken: '',
  count: 1
}

const getters = {
  token(state) {
    return state.token
  }
}

const mutations = {
  setToken(state, token) {
    // console.log('-token-', token)
    state.token = token
  },
  setRefreshToken(state, refreshToken) {
    // console.log('-refreshToken-', refreshToken)
    state.refreshToken = refreshToken
  },
  setCount(state) {
    state.count++
  }
}

const actions = {
  resetToken({ commit, state, dispatch }) {
    return new Promise((resolve) => {
      removeToken()
      removeRefreshToken()
      removeTokenTime()
      resolve()
    })
  },
  getAgainToken({ commit, state }) {
    return new Promise((resolve, reject) => {
      const params = { refreshToken: getRefreshToken() }
      // console.log('-params-', params)
      refreshToken(params)
        .then((res) => {
          console.log('token刷新成功了...')
          const token = res.data
          const expTime = authTools.getTokenExpTime(token)
          setToken(token)
          setTokenTime(expTime)
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
