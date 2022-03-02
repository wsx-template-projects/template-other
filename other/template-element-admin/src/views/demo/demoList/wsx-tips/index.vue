<!--

-->
<template>
    <div class="wsx-tips">
        <p class="txt" @mouseover="handleMouseover" @mouseleave="handleMouseleave">{{ txt }}</p>
        <div class="tips--txt" v-show="isShow">666</div>
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
        return {
            isShow: false
        }
    },
    props: {
        txt: {
            type: String,
            default: ''
        }
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        handleMouseover() {
            this.isShow = true
        },
        handleMouseleave() {
            this.isShow = false
        }
    }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

.wsx-tips {
    position: relative;

    .txt {
        display: inline-block;
        border: 1px solid #ccc;
        padding: 10px 20px;
    }

    .tips--txt {
        position: absolute;
        top: 40px;
        width: 100px;
        height: 50px;
        border: 1px solid orange;
    }
}
</style>
