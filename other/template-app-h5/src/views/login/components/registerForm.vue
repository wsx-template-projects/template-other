<!-- 
   注册
-->
<template>
    <div class="formWrap">
        <van-popup
            v-model="dialogVisible"
            :close-on-click-overlay="false"
            round
            position="bottom"
            :style="{ height: '75%' }"
        >
            <div class="formBox">
                <div class="top fx-align-center">
                    <span class="leftArrow" @click="onClose"></span>
                    <p class="title">登录</p>
                </div>

                <van-form ref="formRef" :show-error-message="false" @submit="onSubmit">
                    <van-field
                        v-model="formData.mobile"
                        name="mobile"
                        clearable
                        placeholder="请输入手机号"
                        :rules="rules.mobile"
                    />
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
                            <p class="countTime" v-else>{{ countTime }}s</p>
                        </template>
                    </van-field>

                    <div style="padding-top: 16px">
                        <van-button class="submitBtn" round block type="info" native-type="submit">登录</van-button>
                    </div>
                </van-form>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { getPhonePrefix, sendMsg, login } from '@/api/common'
import authTools from '@/scripts/auth/authTools'
import { setToken, setRefreshToken, setTokenTime } from '@/scripts/auth/auth'
export default {
    name: '',
    data() {
        return {
            isShowBtn: true,
            timer: '',
            countTime: 60,
            codeBtnTxt: '获取验证码',
            formData: { countryCode: 86, mobile: '', smsCode: '' },
            rules: {
                mobile: [{ required: true, message: '请填写手机号' }],
                smsCode: [{ required: true, message: '请填写短信验证码' }],
            },
            prefixList: [],
        }
    },
    props: {
        type: {
            type: String,
            default: '',
        },
        visible: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        dialogVisible: {
            get() {
                return this.visible
            },
            set(val) {
                this.$emit('update:visible', val)
            },
        },
    },
    components: {},
    created() {},
    mounted() {},
    destroyed() {
        this.timer && clearInterval(this.timer)
    },
    methods: {
        onClose() {
            this.dialogVisible = false
            this.$refs.formRef.resetValidation()
        },
        onSendCode() {
            const { mobile } = this.formData
            if (!mobile) {
                this.$toast('请输入手机号')
                return
            }
            // console.log('开始获取验证码')
            const { countryCode } = this.formData
            const params = { mobile, countryCode }
            sendMsg(params, 'register').then(res => {
                // console.log('-res-', res)
                this.isShowBtn = false
                this.timer = setInterval(() => {
                    this.countTime--
                    if (this.countTime < 0) {
                        clearInterval(this.timer)
                        this.isShowBtn = true
                        this.codeBtnTxt = '重新获取'
                        this.countTime = 60
                    }
                }, 1000)
            })
        },
        onSubmit(value) {
            console.log('-submit-', value)
            const { mobile, smsCode } = value
            if (!mobile) {
                this.$toast('请输入手机号')
                return
            }
            if (!smsCode) {
                this.$toast('请输入验证码')
                return
            }
            this.testReq() // TODO: 后端没有提供接口时使用
            // this.prodReq() // TODO: 后端接口提供时使用
        },
        prodReq() {
            this.$pageLoading.show()
            const params = { ...this.formData }
            login(params)
                .then(res => {
                    // console.log('-res-', res)
                    this.$pageLoading.hide()
                    const { token, refreshToken } = res.data
                    const expTime = authTools.getTokenExpTime(token)
                    setTokenTime(expTime)
                    setToken(token)
                    setRefreshToken(refreshToken)
                    this.dialogVisible = false
                    this.$router.go(-1)
                })
                .catch(err => {
                    console.log('-err-', err)
                    this.$pageLoading.hide()
                })
        },
        testReq() {
            this.$pageLoading.show()
            setTimeout(() => {
                const res = {
                    data: {
                        token:
                            'eyJ0eXBlIjoiQVVUSE9SSVpBVElPTiIsImFjY291bnRJZCI6MTAwMDAwMDAsImV4cCI6MTYyMjUyNTQxNDQ3NiwicGF5bG9hZCI6bnVsbCwic2lnbmF0dXJlIjpudWxsfQ==.qf078DbyJQyCVZz3DGW81GPrZEIJG/vPwomSR2pE9Yk=',
                        refreshToken:
                            'eyJ0eXBlIjoiUkVGUkVTSCIsImFjY291bnRJZCI6MTAwMDAwMDAsImV4cCI6MTYyMjYwMjEwNDkyMywicGF5bG9hZCI6bnVsbCwic2lnbmF0dXJlIjpudWxsfQ==.Gt3Tr3Ukr1QkFFoYjJZuaKiD+48vrVtIObUd2d4dNjk=',
                    },
                }
                this.$pageLoading.hide()
                const { token, refreshToken } = res.data
                const expTime = authTools.getTokenExpTime(token)
                setTokenTime(expTime)
                setToken(token)
                setRefreshToken(refreshToken)
                this.dialogVisible = false
                this.$router.go(-1)
            }, 1000)
        },
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/common/';
/deep/ .van-overlay {
    background: rgba(0, 0, 0, 0);
}

.formBox {
    font-size: 16px;
    padding: 24px 20px 0;

    .top {
        margin-bottom: 40px;

        .leftArrow {
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

    .codeItem {
        /deep/ &.van-cell {
            padding-right: 0;
        }

        .codeBtn {
            width: 80px;
            height: 36px;
            background: #d2e4ff;
            color: #0069ff;
            border: 1px solid #d2e4ff;
            border-radius: 18px;
            margin-right: 6px;
        }

        .countTime {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 36px;
            background: #d2e4ff;
            color: #0069ff;
            border-radius: 18px;
        }
    }

    .submitBtn {
        font-size: 18px;
    }
}

/deep/ .van-cell::after {
    border-bottom: none;
}

/deep/ .van-field {
    height: 48px;
    border: 1px solid #eaeaea;
    border-radius: 24px;
    margin-bottom: 24px;
}
</style>
