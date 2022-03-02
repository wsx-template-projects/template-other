/**
 * 全局自定义hooks
 */

import { computed, watch } from 'vue'
import { isRefTips } from '@/utils/dataValidation'

/**
 * 处理 dialog、popup组件的显示隐藏相关逻辑，使用对象为子组件
 * @params import { useVisible } from "@/hooks/childApi"
 */
export function useVisible(visible, ctx) {
  isRefTips(visible)

  const dialogVisible = computed({
    get() {
      console.log('-get-', visible.value)
      return visible.value
    },
    set(val) {
      console.log('-set-', val)
      ctx.emit('update:visible', val)
    }
  })

  watch(dialogVisible, (newVal, oldVal) => {
    console.log('-new-', newVal, '-old-', oldVal)
  })

  const onDialogClose = () => {
    dialogVisible.value = false
  }

  /* dialog关闭前 */
  const beforeClose = (action, callback) => {
    return new Promise((resolve) => {
      console.log('-action-', action)
      if (action !== 'confirm') {
        resolve(true)
        return
      }
      if (callback) {
        callback(resolve)
        return
      }
      setTimeout(() => {
        resolve(true)
      }, 1000)
    })
  }

  return {
    dialogVisible,
    onDialogClose,
    beforeClose
  }
}
