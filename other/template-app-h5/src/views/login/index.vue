<!-- 
   登录/注册
-->
<template>
    <div class="login">
        <img class="bg" :style="{ top: top }" src="@/assets/images/login/loginBg.png" alt="" />
        <div class="btnBox fx-column" :style="{ bottom: bottom }">
            <span class="loginBtn" @click="onOperate('register')">登录</span>
            <!-- <span class="regBtn" @click="onOperate('register')">登录</span> -->
        </div>

        <!-- <loginForm :visible.sync="isLogin" /> -->
        <registerForm :visible.sync="isRegister" @register="handleRegister" />
    </div>
</template>

<script>
// import loginForm from '@/views/login/components/loginForm'
import registerForm from '@/views/login/components/registerForm'
export default {
    name: '',
    data() {
        return {
            top: 0,
            bottom: 0,
            // isLogin: false,
            isRegister: false,
        }
    },
    computed: {},
    components: { registerForm },
    created() {
        // console.log('-height-', window.innerHeight)
        const cha = (window.innerHeight - 812) / 2
        this.top = cha + 'px'
        this.bottom = 227 + cha + 'px'
    },
    mounted() {
        this.$loading.show()
        setTimeout(() => {
            this.$loading.hide()
        }, 500)
    },
    methods: {
        handleRegister() {
            this.isLogin = true
        },
        onOperate(type) {
            switch (type) {
                // case 'login':
                //   this.isLogin = true
                //   break
                case 'register':
                    this.isRegister = true
                    break
                default:
                    break
            }
        },
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.login {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;

    .bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
    }

    .btnBox {
        position: absolute;
        z-index: 100;
        width: 100%;
        padding: 0 20px;

        span {
            width: 100%;
            font-size: 18px;
            line-height: 44px;
            text-align: center;
            border-radius: 22px;

            &.loginBtn {
                background: #0069ff;
                color: #f5f6f9;
                margin-bottom: 32px;
            }
            &.regBtn {
                background: #fff;
                color: #0069ff;
            }
        }
    }
}
</style>
