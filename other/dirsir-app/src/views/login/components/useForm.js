/**
 * 表单自定义hooks
 */
import { reactive, ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import { setToken, setRefreshToken } from '@/utils/auth'

/**
 * 表单相关逻辑
 */
export function useForm() {
  const router = useRouter()
  const rules = {
    mobile: [{ required: true, message: '请填写手机号' }],
    smsCode: [{ required: true, message: '请填写短信验证码' }]
  }

  const formData = reactive({
    countryCode: 86,
    mobile: '',
    smsCode: ''
  })

  const onSubmit = (value) => {
    console.log('-value-', value, '-form-data-', formData)
    if (!value.mobile) {
      Toast('请输入手机号')
      return
    }
    if (!value.smsCode) {
      Toast('请输入验证码')
      return
    }
    const params = { ...formData }
    console.log('-params-', params)
    setTimeout(() => {
      const res = {
        data: {
          token: '4352523',
          refreshToken: '657567567'
        }
      }
      const { token, refreshToken } = res.data
      setToken(token)
      setRefreshToken(refreshToken)
      router.go(-1)
    }, 2000)
  }

  const onFailed = (errorInfo) => {
    console.log('-error-', errorInfo)
  }

  return {
    rules,
    formData,
    onSubmit,
    onFailed
  }
}

/**
 * 手机号前缀相关逻辑
 */
export function useMobilePrefix(countryCode) {
  // console.log('-country-code-', countryCode, '-is-ref-', isRef(countryCode))
  const isPrefix = ref(false)

  const onPopup = () => {
    isPrefix.value = true
  }

  const handleChange = (code) => {
    console.log('-code-', code)
    countryCode.value = code
    isPrefix.value = false
  }

  return {
    isPrefix,
    onPopup,
    handleChange
  }
}

/**
 * 验证码相关逻辑
 */
export function useAuthCode(formData) {
  console.log('-form-data-', formData)
  const isShowBtn = ref(true)
  const timer = ref(null)
  const countTime = ref(60)
  const codeBtnTxt = ref('获取验证码')

  const onSendCode = () => {
    console.log('-send-code-', formData)
    if (!formData.mobile) {
      Toast('请输入手机号')
      return
    }
    const params = { mobile: formData.mobile, countryCode: formData.countryCode }
    console.log('-params-', params)
    isShowBtn.value = false
    timer.value = setInterval(() => {
      countTime.value--
      if (countTime.value < 0) {
        clearInterval(timer.value)
        isShowBtn.value = true
        codeBtnTxt.value = '重新获取'
        countTime.value = 60
      }
    }, 1000)
  }

  onUnmounted(() => {
    timer.value && clearInterval(timer.value)
  })

  return {
    timer,
    isShowBtn,
    countTime,
    codeBtnTxt,
    onSendCode
  }
}
