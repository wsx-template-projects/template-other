<!--
   登录页
-->
<template>
    <div class="login">
        <img class="bg" :style="{ top: top }" src="@/assets/images/login/loginBg.png" alt="" />
        <div class="btnBox fx-column" :style="{ bottom: bottom }">
            <span class="loginBtn" @click="onOperate('register')">登录</span>
        </div>

        <registerForm v-model:visible="isRegister" />
    </div>
</template>

<script>
import registerForm from '@/views/login/components/registerForm.vue'
import { onMounted, ref, reactive, toRefs } from 'vue'
import { getDemo, getToken } from '@/api/demo'
export default {
    components: { registerForm },
    setup() {
        const style = reactive({ top: '', bottom: '' })
        const isRegister = ref(false)
        const onOperate = (type) => {
            isRegister.value = true

            // getToken({ type: 1 }).then((res) => {
            //     console.log('-res-', res)
            // })

            // getDemo().then((res) => {
            //     console.log('-res-', res)
            // })
        }
        onMounted(() => {
            const diff = (window.innerHeight - 812) / 2
            style.top = diff + 'px'
            style.bottom = 227 + diff + 'px'
        })
        return {
            isRegister,
            ...toRefs(style),
            onOperate,
        }
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
