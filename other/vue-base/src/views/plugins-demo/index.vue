<!-- 
   插件 demo
-->
<template>
    <div class="plugins-demo">
        <span class="wsx-button wsx-button--primary wsx-m-r-10" @click="onOpenToast">打开toast</span>
        <span class="wsx-button wsx-button--primary" @click="onOpenLoading">打开loading</span>
    </div>
</template>

<script>
export default {
    name: 'PluginsDemo',
    components: {},
    data() {
        return {}
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        onOpenToast() {
            this.$toast('测试一下', 1500)
        },
        onOpenLoading() {
            this.$loading.show('加载中...')

            setTimeout(() => {
                this.$loading.hide()
            }, 30000)
        }
    }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
