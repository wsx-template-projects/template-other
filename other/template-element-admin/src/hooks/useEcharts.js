import _ from 'lodash'

/**
 * 柱状图基础配置项
 */
const baseOption = {
    grid: {
        top: 42,
        left: 27,
        right: 27,
        bottom: 27,
        containLabel: true
    },
    legend: {
        padding: [14, 14, 14, 14]
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    }
}

/**
 * @description 柱状图/折线图 hooks
 * @param {array} types 图表类型  ['line','bar']
 * @param {object} chartData 图表部分参数 {legends:[],xAxisData: [],yAxisData: [],seriesData: [],stack: []} stack可选，用来设置堆叠柱状图
 * @param {array} color 柱子/折线 颜色，默认：['#31D9A4', '#0796F4']
 * @return {object} 图表 option
 */
export function useBarOrLineChart(types, chartData, color = ['#31D9A4', '#0796F4']) {
    chartData.stack = chartData.stack || []
    let option = {
        color,
        title: { text: '' },
        legend: {
            data: chartData.legends
        },
        xAxis: {
            data: chartData.xAxisData
        },
        yAxis: chartData.yAxisData,
        series: chartData.seriesData.map((val, index) => ({
            name: chartData.legends[index],
            type: types[index],
            stack: chartData.stack[index],
            //   barWidth: 20,
            data: val
        }))
    }
    // console.log('-option-', option)
    return _.merge({}, baseOption, option)
}

export function useChart(types, chartOption) {
    const { legendData, xAxisData, seriesData, ...other } = chartOption
    let option = {
        title: { text: '' },
        color: ['#31D9A4', '#0796F4'],
        legend: {
            data: legendData
        },
        xAxis: {
            data: xAxisData
        },
        yAxis: [
            {
                type: 'value',
                // name: '数量',
                min: 0,
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: seriesData.map((val, index) => ({
            name: legendData[index],
            type: types[index],
            data: val
            // coordinateSystem: 'polar',
            // areaStyle: {}, // TODO: 实现折线图下面的背景色的显示
        }))
    }
    // console.log('-chart-option-', baseOption, option, other)
    return _.merge({}, baseOption, option, other)
}
