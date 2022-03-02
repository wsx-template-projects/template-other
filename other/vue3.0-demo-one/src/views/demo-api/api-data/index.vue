<!--
   api 之 ref/reactive
-->
<template>
    <div class="api-data">
        <headerBar />
        <div class="main">
            <section class="view-shows">
                <div class="data-ref">count值：{{ count }}</div>
                <div class="data-reactive">
                    <span class="title">对象获取方式：reactive</span>
                    <span>方式一： {{ obj.txt }}</span>
                    <span>方式二： {{ name }}</span>
                </div>
            </section>

            <section class="view-operate">
                <van-button class="m-r-10" type="primary" size="small" @click="changeCount">改变count数值</van-button>
                <van-button class="m-r-10" type="primary" size="small" @click="changeObj">改变方式一数值</van-button>
                <van-button class="m-r-10" type="primary" size="small" @click="changeToRefsObj"
                    >改变方式二数值</van-button
                >
            </section>
        </div>
    </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import { onMounted, ref, reactive, toRefs } from 'vue'
export default {
    components: { headerBar },
    setup() {
        const count = ref(0)
        const obj = reactive({ txt: 'hello word！' })
        const toRefsObj = reactive({ name: 'hello word！' })
        const changeCount = () => {
            count.value++
        }
        const changeObj = () => {
            obj.txt = '你好！'
        }
        const changeToRefsObj = () => {
            toRefsObj.name = '你好！'
        }
        onMounted(() => {})
        return {
            count,
            obj,
            ...toRefs(toRefsObj),
            changeCount,
            changeObj,
            changeToRefsObj,
        }
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.api-data {
    font-size: 16px;
    line-height: 36px;
    letter-spacing: 1px;

    .m-r-10 {
        margin-right: 10px;
    }

    .main {
        padding: 20px;

        .view-shows {
            .data-reactive {
                display: flex;
                flex-direction: column;

                .title {
                    font-size: 18px;
                    font-weight: 600;
                }
            }
        }

        .view-operate {
            padding: 10px 0;
        }
    }
}
</style>
