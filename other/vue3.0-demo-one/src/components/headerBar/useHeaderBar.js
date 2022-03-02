/**
 * header组件自定义 hooks
 */
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import openNative from '@/scripts/native/openNative'

/**
 * 动态设置 html 元素样式
 */
export function useHeaderBar(props, initHeight = 41, base = 37.5) {
    const store = useStore()
    const barHeight = computed(() => store.state.global.statusBarHeight)
    const baseRem = computed(() => {
        const result = props.isNeedStatusBar ? barHeight.value : 0
        console.log('-状态栏高度-', result)
        return result / base
    })
    const headerHeight = computed(() => {
        const result = props.isFullScreen ? baseRem.value : baseRem.value + initHeight / base
        return result + 'rem'
    })
    const lineHeight = computed(() => baseRem.value + 'rem')
    return {
        lineHeight,
        headerHeight,
    }
}

/**
 * 获取 head 标题
 */
export function useHeadTitle(headTitle) {
    let title = ''
    const route = useRoute()
    if (route.meta) {
        title = route.meta.title || ''
    }
    title = headTitle || title
    return {
        title,
    }
}

/**
 * 左边按钮返回事件处理
 */
export function useLeftEvent(onBack) {
    const route = useRoute()
    const router = useRouter()
    const goBack = () => {
        if (onBack) {
            onBack()
            return
        }
        const { device } = route.query
        device ? openNative.closeWebview() : router.go(-1)
    }
    return {
        goBack,
    }
}
