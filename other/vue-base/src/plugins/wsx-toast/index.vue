<!-- 
   toast 插件
-->
<template>
    <transition name="fade">
        <div class="wsx-toast" v-show="isShow">
            <span class="wsx-toast--txt">{{ message }}</span>
        </div>
    </transition>
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
        return {
            message: '',
            isShow: false
        }
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {}
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.wsx-toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.6);
    font-size: 12px;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 10px 26px;
}

.toast-enter {
    opacity: 0;
}

.toast-enter-active {
    opacity: 1;
}

.toast-leave {
    opacity: 1;
}

.toast-leave-active {
    opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
    transition: all 0.8s;
}
</style>
