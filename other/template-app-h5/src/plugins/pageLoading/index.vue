<!--
 界面加载loading
-->
<template>
    <div class="loading-global" v-show="isShow">
        <div class="loading-content">
            <van-loading size="24px" text-size="14px" type="spinner" color="#fff" vertical>{{ text }}</van-loading>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {}
    },
    props: {
        isShow: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            default: '',
        },
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {},
    components: {},
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.loading-global {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);

    .loading-content {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 6px;

        /deep/ .van-loading__text {
            color: rgb(224, 222, 222);
        }
    }
}
</style>
