<!-- 
   登录
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
                        v-model="formData.password"
                        type="password"
                        name="password"
                        clearable
                        placeholder="请输入密码"
                        :rules="rules.password"
                    />

                    <div style="padding-top: 16px">
                        <van-button class="submitBtn" round block type="info" native-type="submit">登录</van-button>
                    </div>
                </van-form>
            </div>
        </van-popup>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            formData: { mobile: '', password: '' },
            rules: {
                mobile: [{ required: true, message: '请填写手机号' }],
                password: [{ required: true, message: '请输入密码' }],
            },
        }
    },
    props: {
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
    methods: {
        onClose() {
            this.dialogVisible = false
            this.$refs.formRef.resetValidation()
        },
        onSubmit(value) {
            console.log('-submit-', value)
            const { mobile, password } = value
            if (!mobile) {
                this.$toast('请输入手机号')
                return
            }
            if (!password) {
                this.$toast('请输入密码')
                return
            }
            console.log('-开始请求接口了-')
            setTimeout(() => {
                this.dialogVisible = false
                this.$router.push({ name: 'Index' })
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

    .submitBtn {
        font-size: 18px;
    }
}

/deep/ .van-field {
    height: 48px;
    border: 1px solid #eaeaea;
    border-radius: 24px;
    margin-bottom: 24px;
}
</style>
