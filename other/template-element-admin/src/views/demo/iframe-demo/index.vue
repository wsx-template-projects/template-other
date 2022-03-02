<template>
    <div class="page-login">
        <div class="wrap">
            <div class="sg-company-title">
                <img src="./assets/img/logo.png" alt="" />
            </div>
            <div class="login-container">
                <div class="login-form sg-flexbox">
                    <div class="login-form-left" v-if="false">
                        <div class="login-form-title">
                            {{ title }}
                        </div>
                        <div class="login-form-cover">
                            <img src="./assets/img/active-bg-fr.png" alt="" width="90%" />
                        </div>
                    </div>
                    <div class="login-form-right">
                        <!-- <el-button @click="test">11</el-button> -->
                        <sg-base-form
                            class="my-login-form"
                            :fields="LoginView.fields"
                            v-model="LoginView.model"
                            :span="24"
                            ref="form"
                            @submit="onSubmit"
                        >
                            <div class="header" slot="header">
                                <div class="center">密码登录</div>
                                <input type="text" name="name" autocomplete="off" class="my-hidden" />
                                <input type="password" name="pwd" autocomplete="off" class="my-hidden" />
                            </div>
                            <span slot="loginNamePrefix" class="my-icon-box">
                                <i class="iconfont iconzhanghao"> </i>
                            </span>
                            <span slot="passwordPrefix" class="my-icon-box">
                                <i class="iconfont iconmima"> </i>
                            </span>
                            <span slot="codePrefix" class="my-icon-box">
                                <i class="iconfont iconyanzhengma"> </i>
                            </span>

                            <div slot="codeSlot" class="my-code">
                                <img-verify-code :load="fetchCode" tip="" ref="codeRef"></img-verify-code>
                            </div>

                            <div slot="footer" class="my-login-form-footer">
                                <el-button
                                    :loading="loading"
                                    type="primary"
                                    class="my-login-form-submit"
                                    size="large"
                                    @click="onSubmit"
                                    >登录</el-button
                                >
                                <div class="sg-flexbox align-center justify-center err-tips" v-show="isShowErrHint">
                                    <i class="error-icon iconfont el-icon-error"></i>
                                    {{ errMessage }}
                                </div>
                            </div>
                        </sg-base-form>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-login__footer">
            <div class="fs-12 mb-4">
                版权所有：浙江省市场监督管理局 <span class="mr-8"></span>|<span class="mr-8"></span>
                技术支持：浙江汇信科技有限公司 <span class="mr-8"></span>|<span class="mr-8"></span>
                目前网站访问量：31662741 人次 <span class="mr-8"></span>|<span class="mr-8"></span
                >技术服务热线：400-888-4525 <span class="mr-8"></span>|
                <span class="mr-8"></span>1440*900分辨率/IE9.0或以上浏览器访问达到最佳效果
            </div>
            <div class="fs-12">
                <a href="http://www.zjzwfw.gov.cn/" target="_blank">浙江政务服务网</a>
                <span class="mr-8"></span>|<span class="mr-8"></span
                ><a href="http://www.gsxt.gov.cn/" target="_blank">国家企业信用信息公示系统</a
                ><span class="mr-8"></span>|<span class="mr-8"></span
                ><a href="https://credit.zj.gov.cn/" target="_blank">信用浙江网</a><span class="mr-8"></span>|<span
                    class="mr-8"
                ></span
                ><a href="http://www.zj.gov.cn/" target="_blank">浙江省人民政府网</a>
            </div>
        </div>
        <!-- <form id="form1" target="target1" method="post" action=""></form> -->
        <iframe id="" name="target" src="" style="display:none;"></iframe>
        <!-- <iframe id="xxx" name="target" src="" style="display:none;"></iframe> -->
        <!-- <iframe :src="src" frameborder="0" style="display:none;"></iframe> -->
    </div>
</template>

<script>
import ImgVerifyCode from '@/components/ImgVerifyCode'
import AppConfig from '@/config/app'
const { OLD_LOGIN_URL, OLD_PREFFIX, OLD_ORIGIN } = AppConfig
export default {
    name: 'Login',
    components: {
        ImgVerifyCode
    },
    props: {},
    data() {
        return {
            timer: null,
            src: '', // 老系统登录
            title: '后台管理',
            loading: false,
            regOrgCode: '', // 关联企业
            isShowErrHint: false,
            errMessage: '',
            LoginView: {
                model: {
                    companySelect: false, // 关联企业弹窗
                    errNum: 0 // 错误次数
                },
                fields: [
                    {
                        tag: 'input',
                        name: 'username',
                        label: '',
                        attrs: {
                            placeholder: '请输入账号',
                            class: 'sg-item-input',
                            inputSlots: [
                                {
                                    slotType: 'prefix',
                                    slotName: 'loginNamePrefix'
                                }
                            ]
                        }
                    },
                    {
                        tag: 'input',
                        name: 'password',
                        label: '',
                        attrs: {
                            type: 'password',
                            placeholder: '请输入密码',
                            class: 'sg-item-input',
                            isTriggerSubmit: true,
                            inputSlots: [
                                {
                                    slotType: 'prefix',
                                    slotName: 'passwordPrefix'
                                }
                            ]
                        }
                    },
                    {
                        tag: 'input',
                        name: 'checkCode',
                        label: '',
                        ifRender(model) {
                            return model.errNum > 3
                        },
                        attrs: {
                            placeholder: '验证码',
                            class: 'my-form-item-code sg-item-input',
                            inputSlots: [
                                {
                                    slotType: 'prefix',
                                    slotName: 'codePrefix'
                                }
                            ],
                            appendSlot: 'codeSlot'
                        }
                    },
                    {
                        tag: 'select',
                        name: 'regOrgCode',
                        label: '',
                        ifRender(model) {
                            return model.companySelect
                        },
                        attrs: {
                            placeholder: '请选择您所在的机构',
                            class: 'my-form-item-code sg-item-input',
                            inputSlots: [
                                {
                                    slotType: 'prefix',
                                    slotName: 'regOrg'
                                }
                            ],
                            onChange: data => {
                                // 等于1：可以选择企业
                                if (data.option.num != 1) {
                                    this.$message({
                                        message: '机构下有同名用户，请联系管理员处理！',
                                        type: 'warning'
                                    })
                                } else {
                                    this.onSubmit()
                                }
                            },
                            options: []
                        }
                    }
                ]
            }
        }
    },
    computed: {
        valid() {
            const { username, password } = this.LoginView.model
            if (username && password && this.LoginView.model.errNum > 3) {
                return true
            } else if (username && password) {
                return true
            } else {
                return false
            }
        }
    },
    watch: {},
    created() {
        window.addEventListener('message', this.onPostMessage, false)
        this.$once('hook:beforeDestroy', () => {
            window.removeEventListener('message', this.onPostMessage)
        })
    },
    mounted() {},
    methods: {
        onPostMessage(e) {
            console.log('接受iframe跨域信息', e.data, e)
            if (typeof e.data === 'string') {
                if (e.data === 'success') {
                    this.successCallback()
                } else {
                    this.failCallback()
                }
            }
        },
        // 测试老系统登录
        test() {
            this.tick(() => {
                console.log(1, this)
            })
        },
        // 老系统登录失败
        failCallback() {
            this.isShowErrHint = true
            this.errMessage = '登录异常'
            this.src = ''
            this.loading = false
        },
        // 老系统登录 <!-- http://223.4.72.147/reg/server/loginNew?username=adminreg&deptCode=33010205&password=123456 -->
        tick(deptCode, callback) {
            const { username = '', password = '' } = this.LoginView.model
            // this.src = `${OLD_PREFFIX}${OLD_LOGIN_URL}?username=${username}&deptCode=${deptCode}&password=${password}`
            // todo 2021/9/26 最新修改: get请求修改成post请求
            this.src = `${OLD_ORIGIN}${OLD_LOGIN_URL}`
            // console.log('-src-', this.src)
            const params = { username, password, deptCode }
            this.createLoginReq(this.src, params)

            this.successCallback = () => {
                clearTimeout(this.timer)
                callback()
            }
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.failCallback()
            }, 5000)
        },
        createLoginReq(url, params) {
            let form = document.createElement('form')
            form.style.display = 'none'
            form.action = url
            form.target = 'target'
            form.method = 'post'
            // form.enctype = 'application/x-www-form-urlencoded'
            document.body.appendChild(form)
            // console.log('-form-', form)
            for (let key in params) {
                let input = document.createElement('input')
                input.type = 'hidden'
                input.name = key
                input.value = params[key]
                form.appendChild(input)
            }
            form.submit()
            form.remove()
        },
        // 验证码
        async fetchCode() {
            const response = await this.$http
                .get('/v1/auth/users/images/captcha', {
                    responseType: 'blob'
                })
                .then(res => {
                    return window.URL.createObjectURL(res.data)
                })
                .catch(({ err }) => {
                    console.log(err)
                })
            return new Promise((resolve, reject) => {
                resolve(response)
            })
        },
        //@confirm('确定吗')
        async onSubmit() {
            const model = this.LoginView.model
            if (model.username && model.password) {
                try {
                    this.loading = true
                    const data = await this.$http
                        .post(
                            '/v1/auth/users/login',
                            {
                                ...model,
                                regOrgCode: this.LoginView.model.regOrgCode
                            },
                            { exNoErrorMassage: true }
                        )
                        .then(data => {
                            // 判断是否是多家企业
                            if (data.length > 1) {
                                this.loading = false
                                this.LoginView.model.companySelect = true
                                data.forEach((item, index) => {
                                    this.$refs['form'].getFieldProps('regOrgCode').attrs.options.push({
                                        label: item.deptName,
                                        value: item.deptCode,
                                        num: item.num
                                    })
                                })
                            } else {
                                const token = data.loginInfo.token
                                const menus = data.menus
                                const user = data.user
                                const deptCode = user.deptCode || this.LoginView.model.regOrgCode
                                if (deptCode) {
                                    this.tick(deptCode, () => {
                                        this.$message.success('登录成功')
                                        this.$store.commit('user/SET_INFO', {
                                            deptCode: deptCode,
                                            user: user,
                                            menus: menus
                                        })
                                        this.$store.commit('user/LOGIN', token)
                                        this.$router.push('/').catch(() => {})
                                        this.loading = false
                                    })
                                    // if (process.env.VUE_APP_ENV !== 'prod') {
                                    //     this.tick(deptCode, () => {
                                    //         this.$message.success('登录成功')
                                    //         this.$store.commit(
                                    //             'user/SET_INFO',
                                    //             {
                                    //                 deptCode: deptCode,
                                    //                 user: user,
                                    //                 menus: menus,
                                    //             },
                                    //         )
                                    //         this.$store.commit(
                                    //             'user/LOGIN',
                                    //             token,
                                    //         )
                                    //         this.$router
                                    //             .push('/')
                                    //             .catch(() => {})
                                    //         this.loading = false
                                    //     })
                                    // } else {
                                    //     // todo: 正式环境下，不接入老系统的登陆
                                    //     this.$message.success('登录成功')
                                    //     this.$store.commit('user/SET_INFO', {
                                    //         deptCode: deptCode,
                                    //         user: user,
                                    //         menus: menus,
                                    //     })
                                    //     this.$store.commit('user/LOGIN', token)
                                    //     this.$router.push('/').catch(() => {})
                                    //     this.loading = false
                                    // }
                                }
                            }
                        })
                        .catch(err => {
                            this.isShowErrHint = true
                            this.errMessage = err.message
                            this.$refs.codeRef && this.$refs.codeRef.onLoad()
                            this.loading = false
                            this.LoginView.model.errNum++
                        })
                } catch (err) {
                    this.loading = false
                    this.isShowErrHint = true
                    this.errMessage = err.message
                }
            } else {
                this.isShowErrHint = true
                this.errMessage = '请先输入账号和密码'
            }
        }
    }
}
</script>
<style lang="less">
.sg-item-input {
    .iconfont {
        color: #2064ef;
        font-size: 20px;
    }
    .el-input__inner {
        padding-left: 45px;
        height: 46px;
        line-height: 46px;
    }
}
.my-form-item-code {
    display: flex;
    position: relative;
    .my-code {
        margin-left: 10px;
        position: absolute;
        right: 3px;
        top: 2px;
        .code {
            height: 40px;
        }
    }
}
.login-company-dialog {
    .el-radio {
        display: flex;
        margin-bottom: 20px;
    }
}
</style>
<style lang="less" scoped>
.admin-login {
    background-color: #dce9f5;
}
.page-login {
    display: flex;
    min-height: 100%;
    flex-flow: column;
    background: url(./assets/img/bj.jpg) no-repeat center;
    .center {
        text-align: center;
    }
    .my-icon-box {
        display: inline-block;
        height: 100%;
        line-height: 46px;
        padding-right: 10px;
        padding-left: 7px;
    }
    .my-login-form-footer {
        padding-top: 35px;
    }
    .err-tips {
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        color: #333;
        background: #fff5ef;
        border: 1px solid #ffad89;
        margin-top: 16px;
        border-radius: 4px;
        .error-icon {
            color: #f4333c;
            border-radius: 50%;
            background: #fff;
            margin-right: 6px;
        }
    }
    .my-hidden {
        position: fixed;
        top: -99999px;
        left: -99999px;
    }
    .navbar {
        display: none;
        min-height: 50px;
    }
    .sg-company-title {
        position: absolute;
        top: 3.7%;
        left: 2.1%;
    }
    .wrap {
        flex: 1;
        padding: 12% 0;
        .login-container {
            height: 450px;
            margin: 0 auto;
            border-radius: 6px;
        }
        .login-form {
            width: 410px;
            background: #fff;
            border-radius: 6px;
            height: 480px;
            position: absolute;
            right: 10%;
            .el-form-item__content {
                height: 46px;
                line-height: 46px;
            }
            .login-form-left {
                width: 55%;
                height: 450px;
                color: #fff;
                background: url('./assets/img/active-bg.png') no-repeat center center;
                background-size: cover;

                .login-form-title {
                    padding-top: 50px;
                    font-size: 24px;
                    font-weight: bold;
                    text-align: center;
                }
                .login-form-cover {
                    padding-top: 40px;
                    text-align: center;
                }
            }
            .login-form-right {
                padding: 30px;
                padding-top: 50px;
                flex: 1;
            }
            .my-login-form {
                padding: 0;
                .header {
                    margin-bottom: 30px;
                    font-size: 24px;
                    font-weight: bold;
                }
                .my-login-form-submit {
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    border: none;
                    font-size: 18px;
                    &:hover {
                        background: #2064ef;
                    }
                }
            }
        }
    }
    .my-login__footer {
        width: 1200px;
        height: 50px;
        margin: 0 auto;
        color: #fff;
        margin-bottom: 3.7%;
        text-align: center;
        .fs-14 {
            font-size: 14px;
            margin-bottom: 12px;
            font-weight: 700;
        }
        .fs-12 {
            font-size: 12px;
        }
        .mb-4 {
            margin-bottom: 4px;
        }
        .mr-8 {
            display: inline-block;
            margin-right: 8px;
        }
    }
}
</style>
