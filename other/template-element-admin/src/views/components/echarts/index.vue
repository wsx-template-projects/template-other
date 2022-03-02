<!--

-->
<template>
    <div class="echarts">
        <div class="echarts__head sg-flexbox justify-between">
            <div class="echarts__head--title sg-flexbox align-center">
                <span class="dot"></span>
                <span class="txt">{{ title }}</span>
            </div>
            <div class="echarts__head--content sg-flexbox align-center">
                <el-button
                    :type="btnType === item.type ? 'primary' : ''"
                    size="mini"
                    round
                    v-for="(item, index) in btnItems"
                    :key="index"
                    @click="onInitChart(item.type)"
                    >{{ item.text }}</el-button
                >
            </div>
        </div>
        <div class="echarts__container">
            <div class="echarts__container--content" ref="barChartRef" :style="{ height: height }"></div>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: '',
    data() {
        return {
            myChart: null
        }
    },
    props: {
        isHasGradients: {
            type: Boolean,
            default: false
        },
        // TODO: 渐变色配置项：
        // 例如：图表展示的为一个折线图和一个柱状图, ['line','bar'] 折线图没有渐变，柱状图有渐变，
        // 如下对象的 key 值 为渐变目标的图表类型标识，在图表type数组中的下标，
        // 因此该案例的渐变配置对象中只有一个key值为 1 的属性，属性值即为渐变目标的配置信息，
        // 属性一： positions ———— 为一个有且只有四个元素(右、下、左、上)的数组，且元素值在0-1之间
        // 属性二：colors ———— 渐变颜色配置项，offset值在0-1之间，color为渐变颜色
        // 示例：gradientsOption: {
        //     1: {
        //         positions: [0, 0, 0, 1],
        //         colors: [
        //             { offset: 0, color: '#30D8A6' },
        //             { offset: 1, color: '#0797F3' },
        //         ],
        //     },
        // }
        gradientsOption: {
            type: Object,
            default() {
                return {}
            }
        },
        height: {
            type: String,
            default: '260px'
        },
        title: {
            type: String,
            default: ''
        },
        btnItems: {
            type: Array,
            default() {
                return []
            }
        },
        btnType: {
            type: String,
            default: ''
        },
        option: {
            type: Object,
            default() {
                return {}
            },
            required: true
        }
    },
    computed: {},
    components: {},
    watch: {
        option: {
            handler(newVal, oldVal) {
                // console.log('-watch-', newVal, oldVal)
                this.drawChart()
            },
            deep: true
        }
    },
    created() {},
    mounted() {
        this.init()
    },
    methods: {
        init() {
            let chartEl = this.$refs.barChartRef
            this.myChart = echarts.init(chartEl)
            this.drawChart()
        },
        onInitChart(type) {
            this.$emit('init', type)
        },
        drawChart() {
            if (this.isHasGradients) {
                console.log('-gradients-option-', this.gradientsOption)
                const gradientsKeys = Object.keys(this.gradientsOption)
                console.log('-keys-', gradientsKeys)
                let resetOption = { ...this.option }
                resetOption.series = resetOption.series.map((val, index) => {
                    if (gradientsKeys.includes(index + '')) {
                        let temp = { ...val, itemStyle: { color: '' } }
                        temp.itemStyle.color = new echarts.graphic.LinearGradient(
                            ...this.gradientsOption[index].positions,
                            this.gradientsOption[index].colors
                        )
                        return temp
                    } else {
                        return val
                    }
                })
                this.myChart.setOption(resetOption)
                return
            }
            this.myChart.setOption(this.option)
        },
        setGradientsOption() {}
    }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.echarts {
    // width: 1150px;
    // height: 300px;
    overflow: hidden;
    width: 100%;
    background: #fff;
    border: 1px solid #e0e4e7;
    border-radius: 2px;

    &__head {
        background: #f7fafb;
        line-height: 40px;
        border-bottom: 1px solid #e0e4e7;
        padding: 0 23px 0 15px;

        &--title {
            font-size: 14px;
            font-weight: bold;
            color: #4d4d4e;

            .dot {
                width: 6px;
                height: 6px;
                background: #0797f3;
                border-radius: 6px;
                margin-right: 12px;
            }
        }
    }
}
</style>
