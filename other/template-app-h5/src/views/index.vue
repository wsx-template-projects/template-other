<!-- 
   
-->
<template>
    <div class="index">
        <div class="page-btns">
            <van-button type="primary" size="large" @click="jumpPage('/mobile-single-list')"
                >mobile-single-list</van-button
            >
            <van-button type="primary" size="large" @click="jumpPage('/mobile-tab-list')">mobile-tab-list</van-button>
        </div>
        <div class="page-btns">
            <van-button type="primary" size="large" @click="jumpPage('/tengxun-map')">腾讯地图</van-button>
            <van-button type="primary" size="large" @click="jumpPage('/baidu-map')">百度地图</van-button>
            <van-button type="primary" size="large" @click="jumpPage('/gaode-map')">高德地图</van-button>
        </div>
        <div class="page-btns">
            <van-button type="primary" size="large" @click="jumpPage('/upload-file')">upload-file</van-button>

            <van-button type="primary" size="large" @click="changeAddress">changeAddress</van-button>
            <van-button type="primary" size="large" @click="onThrottle()">throttle</van-button>
            <van-button type="primary" size="large" @click="onDebounce()">debounce</van-button>
        </div>
        <div class="page-main">
            123456
        </div>
        <!-- <div class="page-map">
            <gaode-map />
        </div> -->
    </div>
</template>

<script>
// import GaodeMap from '@/components/gaode-map/index.vue'
import tools from '@/scripts/utils/tools'
export default {
    name: 'Index',
    components: {},
    // components: { GaodeMap },
    data() {
        return {}
    },
    computed: {
        throttleFunc() {
            return tools.throttle(this.handleLoading, 3000)
        },
        debounceFunc() {
            return tools.debounce(this.handleLoading, 3000)
        },
    },
    created() {},
    mounted() {},
    methods: {
        jumpPage(path) {
            console.log('path:', path)
            this.$router.push(path)
        },
        onThrottle() {
            console.log('click')
            this.throttleFunc()
        },
        onDebounce() {
            console.log('click')
            this.debounceFunc()
        },
        changeAddress() {
            console.log('changeAddress:')
        },
        handleLoading() {
            console.log(999)
        },
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

.page-btns {
    padding: 16px 16px;
}

.van-button {
    margin-bottom: 16px;
}
</style>
