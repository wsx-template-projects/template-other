<!-- 
   注册
-->
<template>
  <div class="formWrap">
    <van-popup
      v-model:show="dialogVisible"
      :close-on-click-overlay="false"
      round
      position="bottom"
      :style="{ height: '75%' }"
    >
      <div class="formBox">
        <div class="top fx-align-center">
          <span class="leftArrow" @click="onDialogClose"></span>
          <p class="title">登录</p>
        </div>

        <van-form ref="formRef" :show-error-message="false" show-error @submit="onSubmit" @failed="onFailed">
          <div class="formItem fx-align-center">
            <div class="prefixWrap fx-center" @click="onPopup">
              <span class="prefixTxt">+{{ formData.countryCode }}</span>
              <span class="bottomArrow"></span>
            </div>
            <van-field
              v-model="formData.mobile"
              type="tel"
              name="mobile"
              clearable
              placeholder="请输入手机号"
              :rules="rules.mobile"
            />
          </div>
          <div class="formItem fx-align-center">
            <van-field
              class="codeItem"
              v-model="formData.smsCode"
              name="smsCode"
              center
              clearable
              placeholder="请输入短信验证码"
              :rules="rules.smsCode"
            >
              <template #button>
                <van-button
                  class="codeBtn"
                  size="small"
                  type="primary"
                  native-type="button"
                  @click.stop="onSendCode"
                  v-if="isShowBtn"
                  >{{ codeBtnTxt }}</van-button
                >
                <p class="countTime fx-center" v-else>{{ countTime }}s</p>
              </template>
            </van-field>
          </div>

          <div style="padding-top: 16px">
            <van-button class="submitBtn" round block type="primary" native-type="submit">登录</van-button>
          </div>
        </van-form>
      </div>
    </van-popup>

    <prefixPopup v-model:visible="isPrefix" @change="handleChange" />
  </div>
</template>

<script>
import prefixPopup from './prefixPopup'
import { onMounted, toRef } from 'vue'
import { useVisible } from '@/hooks/childApi'
import { useForm, useAuthCode, useMobilePrefix } from './useForm'
export default {
  components: { prefixPopup },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const visible = toRef(props, 'visible')

    const { dialogVisible, onDialogClose } = useVisible(visible, ctx)

    const { rules, formData, onSubmit, onFailed } = useForm()

    const { timer, isShowBtn, countTime, codeBtnTxt, onSendCode } = useAuthCode(formData)

    const countryCode = toRef(formData, 'countryCode')

    const { isPrefix, onPopup, handleChange } = useMobilePrefix(countryCode)

    onMounted(() => {})
    return {
      timer,
      isShowBtn,
      countTime,
      codeBtnTxt,
      onSendCode,

      rules,
      formData,
      onSubmit,
      onFailed,

      dialogVisible,
      onDialogClose,

      isPrefix,
      onPopup,
      handleChange
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/common/';

:deep(.van-overlay) {
  background: rgba(0, 0, 0, 0);
}

.formBox {
  font-size: 16px;
  padding: 24px 20px 0;

  :deep(.van-field) {
    height: 48px;
    border: 1px solid #eaeaea;
    border-radius: 24px;
  }

  .top {
    margin-bottom: 40px;

    .leftArrow {
      display: block;
      width: 20px;
      height: 20px;
      background: url('@{imgUrl}icon-left-arrow.png') no-repeat center / cover;
    }

    .title {
      font-size: 20px;
      color: #222;
      line-height: 28px;
      margin-left: 4px;
    }
  }

  .formItem {
    margin-bottom: 24px;
  }

  .prefixWrap {
    position: relative;
    width: 110px;
    height: 48px;
    border: 1px solid #eaeaea;
    border-radius: 48px;
    margin-right: 10px;

    .prefixTxt {
      margin-right: 8px;
    }

    .bottomArrow {
      border: 4px solid;
      border-color: transparent transparent #dcdee0 #dcdee0;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      margin-top: -5px;
    }
  }

  .codeItem {
    :deep(&.van-cell) {
      padding-right: 0;
    }

    .codeBtn {
      width: 90px;
      height: 36px;
      background: #d2e4ff;
      color: #0069ff;
      border: 1px solid #d2e4ff;
      border-radius: 18px;
      margin-right: 6px;
    }

    .countTime {
      width: 90px;
      height: 36px;
      background: #d2e4ff;
      color: #0069ff;
      border-radius: 18px;
      margin-right: 6px;
    }
  }

  .submitBtn {
    font-size: 18px;
  }
}
</style>
