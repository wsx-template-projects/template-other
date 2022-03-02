/**
 * 计数器自定义 -- hooks
 */
import { ref } from 'vue'

export function useCounter(initCount) {
  const count = ref(initCount)
  const onAdd = () => {
    count.value++
  }
  const onSub = () => {
    count.value--
  }
  const onReset = () => {
    count.value = 0
  }
  return {
    count,
    onAdd,
    onSub,
    onReset
  }
}
