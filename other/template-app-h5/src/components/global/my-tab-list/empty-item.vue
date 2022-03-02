<!-- 
   没有数据 - empty
-->
<template>
    <div class="empty-item">
        <van-empty class="custom-image" v-bind="bindAttr" />
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
        return {
            baseAttr: {
                // image: require('@/assets/images/common/no-data.png'),
                description: '没有数据!',
            },
        }
    },
    props: {
        // 相关配置
        config: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    computed: {
        bindAttr() {
            return { ...this.baseAttr, ...this.config }
        },
    },
    created() {},
    mounted() {},
    methods: {},
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
