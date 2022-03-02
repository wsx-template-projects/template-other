<!-- 
   sync-demo
-->
<template>
    <div class="sync-demo">
        <span class="btn-add" @click="onAdd">open dialog</span>
        <demo-dialog :visible.sync="isDialog" />
    </div>
</template>

<script>
import demoDialog from './dialog/demo-dialog.vue'
export default {
    name: 'SyncDemo',
    components: { demoDialog },
    data() {
        return {
            isDialog: false
        }
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        onAdd() {
            this.isDialog = true
        }
    }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@info: #909399;

@primary: #409eff;

.sync-demo {
    padding: 30px;
}

.btn-add {
    background: @primary;
    color: #fff;
    border: 1px solid @primary;
    border-radius: 6px;
    padding: 6px 20px;
}
</style>
