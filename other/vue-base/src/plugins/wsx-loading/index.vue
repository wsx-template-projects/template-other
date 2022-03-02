<!-- 
   loading 插件
-->
<template>
    <div class="wsx-loading">
        <div class="loading-global flexbox column justify-center align-center" v-show="isShow">
            <span class="loading-spinner iconfont icon-jiazai"></span>
            <span class="loading-text">{{ message }}</span>
        </div>
    </div>
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
.loading-global {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    font-size: 14px;
    border-radius: 6px;

    .loading-spinner {
        font-size: 22px;
        margin-bottom: 10px;
        animation: loadingRotate 2.6s linear infinite;
    }
}

@keyframes loadingRotate {
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(90deg);
    }
    50% {
        transform: rotate(180deg);
    }
    75% {
        transform: rotate(270deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
