<!-- 
   计数器组件
-->
<template>
    <div class="counter-components">
        <h3>计数器组件示例</h3>
        <div class="content">
            <span class="label">恭喜你，你已经写了</span>
            <span class="txt">{{ count }}</span>
            <span class="label">斤代码！</span>
        </div>
        <div class="btnBox">
            <button class="btn add" @click="onAdd">加一</button>
            <button class="btn sub" @click="onSub">减一</button>
            <button class="btn reset" @click="onReset">重置</button>
        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue'
import { useCounter } from './useCounter'
export default {
    props: {
        // 初始计数器数值
        initCount: {
            type: Number,
            default: 0
        }
    },
    setup(props) {
        // console.log('-props-', props)
        const countOpts = useCounter(props.initCount)
        onMounted(() => {})
        return { ...countOpts }
    }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

.counter-components {
    padding: 20px;

    h3 {
        font-weight: 600;
    }
}

.content {
    padding: 20px 0;
    .txt {
        color: red;
        padding: 0 6px;
    }
}

.btnBox {
    // padding: 20px 0;

    .btn {
        width: 80px;
        height: 30px;
        border-radius: 4px;
        margin-right: 10px;
    }
}
</style>
