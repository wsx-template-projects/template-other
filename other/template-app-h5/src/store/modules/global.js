/**
 * 全局状态 - store
 */
const state = {
    statusBarHeight: '0', // 状态栏高度
    toFromRouteNames: [],
    scollTop: 0, // 滚动高度
    loadErrorCount: 0, // 加载失败次数
}

const mutations = {
    setStatusBarHeight(state, h) {
        state.statusBarHeight = h
    },
    setScollTop(state, scollTop) {
        state.scollTop = scollTop
    },
    setToFromRouteNames(state, routeNames) {
        state.toFromRouteNames = routeNames
    },
    setLoadErrorCount(state) {
        state.loadErrorCount++
    },
    clearLoadErrorCount(state) {
        state.loadErrorCount = 0
    },
}

const getters = {}

const actions = {}

export default {
    // 开启命名空间
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
