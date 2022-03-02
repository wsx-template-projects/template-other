<!--

-->
<template>
    <div class=""></div>
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
    mounted() {
        this.getLoacation()
    },
    methods: {
        // 获取
        getLoacation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showPosition, this.showError)
            }
            // console.log(
            //     '--',
            //     navigator.geolocation.getCurrentPosition(
            //         this.showPosition,
            //         this.showError,
            //     ),
            // )
        },
        showPosition(position) {
            console.log('-position-', position)
        },
        showError(error) {
            console.log('-error-', error)
        },
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
