<!-- 
   demo-tab-list
-->
<template>
    <div class="myMachine">
        <headerBar />
        <div class="page-main">
            <van-button @click="onNextPage('/mobile-single-list')">下一页</van-button>
        </div>
    </div>
</template>

<script>
import headerBar from '@/components/header-bar'

export default {
    name: '',
    data() {
        return {}
    },
    computed: {},
    components: { headerBar },
    created() {},
    beforeRouteEnter(to, from, next) {
        console.log('to', to, 'from', from)
        next()
    },
    mounted() {},
    methods: {
        onNextPage(path) {
            this.$router.push(path)
        },
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
