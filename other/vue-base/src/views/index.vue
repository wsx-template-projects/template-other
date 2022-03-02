<!-- 
   home
-->
<template>
    <div class="home">
        <div class="btns">
            <span class="wsx-button wsx-button--primary" @click="onTestPage('/sync-demo')">sync-demo</span>
            <span class="wsx-button wsx-button--primary" @click="onTestPage('/watch-demo')">watch-demo</span>
            <span class="wsx-button wsx-button--primary" @click="onTestPage('/mixins-demo1')">mixin-demo</span>
            <span class="wsx-button wsx-button--primary" @click="onTestPage('/bus-demo')">bus-demo</span>
            <span class="wsx-button wsx-button--primary" @click="onTestPage('/plugins-demo')">plugins-demo</span>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {}
    },
    computed: {},
    components: {},
    created() {},
    mounted() {},
    methods: {
        onTestPage(pathName) {
            this.$router.push(pathName)
        }
    }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.btns {
    padding: 10px;

    .wsx-button {
        margin: 0 10px 10px 0;
    }
}
</style>
