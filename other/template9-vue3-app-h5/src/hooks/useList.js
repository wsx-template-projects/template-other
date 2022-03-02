/**
 * list自定义hooks
 */
import { reactive, toRefs } from 'vue'

export function useList() {
    const data = reactive({
        pageNum: 1,
        pageSize: 6,
        isMoreLoading: false,
        isMoreFinished: false,
        isMoreError: false,
        list: []
    })

    const getMoreData = (isInit) => {
        console.log('-isInit-', isInit)
        data.isMoreLoading = true
        setTimeout(() => {
            data.isMoreLoading = false
        }, 1000)
    }

    return {
        ...toRefs(data),
        getMoreData
    }
}
