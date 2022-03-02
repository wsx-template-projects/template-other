<!--
   全局 dialog 组件
-->
<template>
    <div class="global-dialog">
        <el-dialog v-bind="baseAttrs" v-on="baseEvents">
            <div class="dialog-content">
                <slot v-bind="infoData" />
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="onClose">{{ leftBtnTxt }}</el-button>
                <el-button type="primary" @click="onConfirm">{{
                    rightBtnTxt
                }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { DIALOG_ATTRS, DIALOG_EVENTS } from './dialog'
export default {
    name: '',
    components: {},
    data() {
        return {}
    },
    props: {
        leftBtnTxt: {
            type: String,
            default: '取消',
        },
        rightBtnTxt: {
            type: String,
            default: '确定',
        },
        infoData: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    computed: {
        baseAttrs() {
            return DIALOG_ATTRS
        },
        baseEvents() {
            return DIALOG_EVENTS
        },
    },
    created() {},
    mounted() {},
    methods: {
        onClose() {
            console.log('close')
            this.$emit('callback', false)
        },
        onClosed() {
            console.log('closed')
        },
        onOpen() {
            console.log('open')
        },
        onOpened() {
            console.log('opened')
        },
        onConfirm() {
            console.log('confirm')
            this.$emit('callback', true)
        },
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.dialog-content {
    line-height: 36px;

    .reason-txt {
        height: 200px;
        border-bottom: 1px solid rgba(187, 187, 187, 100);
    }
}
</style>
