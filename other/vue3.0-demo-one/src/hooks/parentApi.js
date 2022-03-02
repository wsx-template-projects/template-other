import { ref } from 'vue'

/* compositionApi => 组合函数 */

/**
 * 处理 dialog 的显示/隐藏， 使用对象为 父级 页面
 * @param 用来处理子组件dialog的业务逻辑
 */
export function useDialog() {
    const isBool = ref(false)

    const onOpen = () => {
        isBool.value = true
    }

    return {
        isBool,
        onOpen
    }
}
