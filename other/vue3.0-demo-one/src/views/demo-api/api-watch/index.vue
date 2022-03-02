<!--
    api 之 watch
-->
<template>
    <div class="api-watch">
        <headerBar />
        <div class="main">
            <section class="view-shows">
                <div class="data-ref">count值：{{ count }}</div>
                <div class="data-ref">total值：{{ total }}</div>
                <div class="data-ref">source.age值：{{ source.age }}</div>
            </section>

            <section class="view-operate">
                <van-button class="m-r-10" type="primary" size="small" @click="changeCount">count++</van-button>
                <van-button class="m-r-10" type="primary" size="small" @click="changeSource">改变source.age</van-button>
            </section>
        </div>
    </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import { onMounted, ref, reactive, watch, computed } from 'vue'
export default {
    components: { headerBar },
    setup() {
        const num = ref(0)
        const count = ref(0)
        const total = computed(() => {
            return count.value + num.value
        })
        const source = reactive({ age: 18, name: '小李' })
        const changeCount = () => {
            count.value++
        }
        const changeSource = () => {
            source.age = Math.ceil(Math.random() * 100)
        }
        // 监听单个属性
        watch(
            () => total.value,
            (newVal, oldVal) => {
                console.log(`watch sginle attribute: count + num = ${newVal}`)
            }
        )
        // 监听单个属性，设置 immediate
        watch(
            () => count.value,
            (newVal, oldVal) => {
                console.log(`count + num = ${newVal}, immediate=true`)
            },
            {
                immediate: true,
            }
        )
        // 监听单个属性，设置deep
        watch(
            () => source.age,
            (newVal, oldVal) => {
                console.log(`source.age = ${newVal}, deep=true`)
            },
            {
                deep: true,
            }
        )
        // 监听多个属性
        watch([num, () => total.value], ([numVal, totalVal], [oldNumVal, oldTotalVal]) => {
            console.log('Listen for multiple attributes:', `num is ${numVal}, count + num = ${totalVal}`)
        })

        onMounted(() => {
            // watch 和 watchEffect
            // 1、watchEffect方法会返回一个方法，用于停止监听；
            // 2、watch跟watchEffect不同的地方在于，watchEffect注册后会立即调用，而watch默认不会，除非显示指定immediate=true，并且watchEffect可以停止监听
        })
        return {
            num,
            count,
            total,
            source,
            changeCount,
            changeSource,
        }
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.api-watch {
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
