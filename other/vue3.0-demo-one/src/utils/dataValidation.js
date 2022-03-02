/**
 * 数据类型检测模块，提示语
 */
import { isRef } from 'vue'

/**
 * 检测传递的数据是否为 ref 类型的数据
 */
export function isRefTips(value) {
    // console.log('-value-', value)
    if (!isRef(value)) {
        // TODO: 缺少一个追踪报错源头的功能
        return Promise.reject(new Error('*注意：visible参数必须为ref响应式数据，可以通过 toRef(源对象,属性名)来处理'))
    }
}

/**
 * isReactive、isReadonly、isProxy、toRow、makRow
 */
