<!-- 
   demo-dialog
-->
<template>
    <div class="demo-dialog" v-show="dialogVisible">
        <div class="global-dialog flexbox v">
            <div class="dialog-content flex-1">
                dialog-main
            </div>
            <div class="dialog-footer flexbox">
                <span class="btn btn-confirm btn-primary" @click="onConfirm">确定</span>
                <span class="btn btn-cancel btn-default" @click="onCancel">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DemoDialog',
    components: {},
    data() {
        return {}
    },
    props: {
        visible: {
            type: Boolean,
            defualt: false
        }
    },
    computed: {
        dialogVisible: {
            get() {
                return this.visible
            },
            set(val) {
                this.$emit('update:visible', val)
            }
        }
    },
    created() {},
    mounted() {},
    methods: {
        onConfirm() {
            this.dialogVisible = false
        },
        onCancel() {
            this.dialogVisible = false
        }
    }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.demo-dialog {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    z-index: 1;
    background: rgba(0, 0, 0, 0.6);

    .global-dialog {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 999;
        width: 260px;
        height: 300px;
        padding: 20px;
        background: #fff;
        border-radius: 6px;

        .dialog-footer {
            .btn {
                width: 50%;
                text-align: center;
                margin-right: 10px;

                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
}

.flexbox {
    display: flex;
}
.flexbox.v {
    flex-direction: column;
}
.flex-1 {
    flex: 1;
}
</style>
