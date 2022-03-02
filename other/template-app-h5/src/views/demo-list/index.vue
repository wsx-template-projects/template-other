<!-- 
   demo-list
-->
<template>
    <div class="demo-list">
        <header-bar />
        <div class="page-main">
            demo-list
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/header-bar'
export default {
    name: 'DemoList',
    components: { HeaderBar },
    data() {
        return {}
    },
    computed: {},
    created() {},
    mounted() {
        // const dict = {
        //     1: {
        //         1: {
        //             1: [],
        //             2: comparisonArr,
        //             3: computedArr,
        //             4: [...computedArr,...comparisonArr],
        //         },
        //         2: {
        //             1: accurateArr,
        //             2:  [...accurateArr,...comparisonArr],
        //             3:  [...accurateArr,...computedArr],
        //             4: this.displayColumns,
        //         },
        //     },
        //     2: '',
        //     3: '',
        // }
    },
    methods: {},
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
