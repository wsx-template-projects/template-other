<!-- 
   watch - demo
-->
<template>
    <div class="watch-demo">
        <div class="head-btn">
            <span class="btn head-btn--add" @click="onAdd">加1</span>
            <span class="btn head-btn--sub" @click="onSub">减1</span>
        </div>
        <div class="main">
            <p class="">count：{{ obj.count }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WatchDemo',
    components: {},
    data() {
        return {
            obj: {
                count: 0
            }
        }
    },
    watch: {
        obj: {
            handler(val) {
                console.log('count:', val.count)
            },
            deep: true
        },
        'obj.count'(val) {
            console.log('count:', val)
        },
        countVal(val) {
            console.log('count:', val)
        }
    },
    computed: {
        countVal() {
            return this.obj.count
        }
    },
    created() {},
    mounted() {},
    methods: {
        onAdd() {
            this.obj.count++
        },
        onSub() {
            this.obj.count--
        }
    }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

@info: #909399;

@primary: #409eff;

.head-btn {
    color: #fff;
    padding: 30px 20px;

    .btn {
        background: @info;
        border: 1px solid @info;
        border-radius: 6px;
        padding: 6px 20px;
    }

    .head-btn--add {
        background: @primary;
        border: 1px solid @primary;
        margin-right: 10px;
    }
}

.main {
    padding: 0 20px;
}
</style>
