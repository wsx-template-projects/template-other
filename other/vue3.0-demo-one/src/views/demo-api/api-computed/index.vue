<!--
   api 之 计算属性 computed
-->
<template>
    <div class="api-computed">
        <headerBar />
        <div class="main">
            <section class="view-shows">
                <div class="data-ref">count1值：{{ count1 }}</div>
                <div class="data-ref">computed-count1值：{{ computedCount1 }}</div>
            </section>
            <section class="view-operate">
                <van-button class="m-r-10" type="primary" size="small" @click="onAdd1">count1加一</van-button>
                <van-button class="m-r-10" type="primary" size="small" @click="onSub1">count1减一</van-button>
                <van-button class="m-r-10" type="primary" size="small" @click="onReset1">重置count1</van-button>
            </section>
            <section class="view-shows">
                <div class="data-ref">count2值：{{ count2 }}</div>
                <div class="data-ref">computed-count2值：{{ computedCount2 }}</div>
            </section>
            <section class="view-operate">
                <van-button class="m-r-10" type="primary" size="small" @click="onAdd2">computed-count2加一</van-button>
                <van-button class="m-r-10" type="primary" size="small" @click="onSub2">computed-count2减一</van-button>
                <van-button class="m-r-10" type="primary" size="small" @click="onReset2"
                    >重置computed-count2</van-button
                >
            </section>
        </div>
    </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import { onMounted, ref, computed } from 'vue'
export default {
    components: { headerBar },
    setup() {
        const count1 = ref(0)
        console.log('-count1-', count1)
        const count2 = ref(100)
        const computedCount1 = computed(() => count1.value)
        console.log('-computed-count1-', computedCount1)
        const computedCount2 = computed({
            get() {
                return count2.value
            },
            set(val) {
                count2.value = val
            },
        })
        const onAdd1 = () => {
            count1.value++
        }
        const onSub1 = () => {
            count1.value--
        }
        const onReset1 = () => {
            count1.value = 0
        }
        const onAdd2 = () => {
            computedCount2.value++
        }
        const onSub2 = () => {
            computedCount2.value--
        }
        const onReset2 = () => {
            computedCount2.value = 100
        }
        onMounted(() => {})
        return {
            count1,
            count2,
            computedCount1,
            computedCount2,
            onAdd1,
            onSub1,
            onReset1,
            onAdd2,
            onSub2,
            onReset2,
        }
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.api-computed {
    font-size: 16px;
    line-height: 36px;
    letter-spacing: 1px;

    .m-r-10 {
        margin-right: 10px;
    }

    .main {
        padding: 20px;
    }
}
</style>
