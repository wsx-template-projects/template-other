/**
 * 功能性组合自定义hooks
 */
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

/**
 * 按钮 —— button
 * @param 点击按钮跳转界面
 */
export function useButton() {
    const router = useRouter()
    const onBtnEvent = (params, type = 'push', fn = null) => {
        if (fn) {
            fn()
            return
        }
        console.log('-params-', params)
        switch (type) {
            case 'push':
                router.push(params)
                break
            case 'replace':
                router.replace(params)
                break
            case 'go':
                router.go(-1)
                break
            default:
                console.log('-其它-')
                break
        }
    }
    return {
        onBtnEvent
    }
}

/**
 * 表单 —— form
 */
export function useForm() {}

/**
 * 列表 —— list
 */
export function useList() {
    const data = reactive({
        pageNum: 1,
        pageSize: 6,
        isMoreLoading: false,
        isMoreFinished: false,
        isMoreError: false,
        list: []
    })

    const getInitData = () => {
        console.log('-init-data-')
    }

    const getMoreData = (isInit) => {
        console.log('-isInit-', isInit)
        data.isMoreLoading = true
        setTimeout(() => {
            data.isMoreLoading = false
        }, 1000)
    }

    return {
        ...toRefs(data),
        getInitData,
        getMoreData
    }
}
