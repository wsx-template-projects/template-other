<template>
    <div class="sg-page page-single-analysis">
        <div class="app-container app-box-bg">
            <div class="container">
                <my-chart
                    class="line-chart-container"
                    :title="contrastiveData.title"
                    :btn-type="contrastiveData.btnType"
                    :btn-items="contrastiveData.btnItems"
                    :option="contrastiveOption"
                    @init="initLineChart"
                ></my-chart>
            </div>
        </div>
    </div>
</template>

<script>
import myChart from '../../components/echarts'
import { useChart } from '@/hooks/useEcharts'
import { setTestData } from '@/mock/modules/echarts'
export default {
    name: 'SingleAnalysis',
    components: { myChart },
    data() {
        return {
            contrastiveData: {
                title: '对比分析',
                btnType: 'balance',
                btnItems: [
                    { text: '负债总额增长率', type: 'balance' },
                    { text: '平均资产负债率', type: 'amount' }
                ],
                data: {
                    legendData: ['本行业', '全市平均水平'],
                    xAxisData: [],
                    seriesData: []
                }
            }
        }
    },
    computed: {
        contrastiveOption() {
            return useChart(['line', 'line'], this.contrastiveData.data)
        }
    },

    watch: {},
    created() {
        this.getContrastiveData()
    },
    mounted() {},
    methods: {
        initLineChart(data) {
            console.log('-init-chart-', data)
        },
        getContrastiveData() {
            const res = setTestData()
            setTimeout(() => {
                const { xData, series } = res.data
                const seriesData = Object.values(series)
                this.contrastiveData.data.xAxisData = xData
                this.contrastiveData.data.seriesData = seriesData
            }, 500)
        }
    }
}
</script>

<style lang="less" scoped></style>
