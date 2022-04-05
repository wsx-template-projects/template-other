// import _ from "lodash";

/**
 * 柱状图基础配置项
 */
const baseOption = {
  grid: {
    top: "20%",
    left: 27,
    right: 27,
    bottom: 27,
    containLabel: true,
  },
  legend: {
    padding: [40, 15, 40, 40],
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
};

/**
 * @description 柱状图/折线图 hooks
 * @param {Array} types 图表类型  ['line','bar']
 * @param {Object} chartData 图表部分参数 {legends:[],xAxisData: [],yAxisData: [],seriesData: [],stack: []} stack可选，用来设置堆叠柱状图
 * @param {Array} color 柱子/折线 颜色，默认：['#31D9A4', '#0796F4']
 * @return {Object} 图表 option
 */
function useBarOrLineChart(types, chartData, color = ["#31D9A4", "#0796F4"]) {
  chartData.stack = chartData.stack || [];
  const option = {
    color,
    title: { text: "" },
    legend: {
      data: chartData.legends,
    },
    xAxis: {
      data: chartData.xAxisData,
    },
    yAxis: chartData.yAxisData,
    series: chartData.seriesData.map((val, index) => ({
      name: chartData.legends[index],
      type: types[index],
      stack: chartData.stack[index],
      //   barWidth: 20,
      data: val,
    })),
  };
  // console.log('-option-', option)
  return Object.assign({}, baseOption, option);
}

/**
 * @description 图表 hooks
 * @param {Array} types 图表类型  ['line','bar']
 * @param {Object} chartOption 图表部分参数 {legend:[],xAxis: [],yAxis: [],series: [],stack: []} stack可选，用来设置堆叠柱状图
 * @param {Object} extraStyle 额外参数 {trigger: 'axis'} ，用来设置tooltip样式
 * @return {Object} 图表 option
 */
function useChart(types, chartOption, extraStyle = {}) {
  // console.log('types :>> ', types)
  // console.log('chartOption :>> ', chartOption)
  const { legend, xAxis, series, ...other } = chartOption;
  // console.log('series :>> ', series)
  const option = {
    title: { text: "" },
    color: ["#31D9A4", "#0796F4"],
    legend: {
      right: "3%",
      data: legend,
    },
    xAxis: {
      data: xAxis,
      axisTick: {
        show: false, //是否显示网状线 默认为true
        alignWithLabel: true,
      },
      axisLine: {
        show: false, //这里的show用于设置是否显示x轴那一条线 默认为true
      },
      axisLabel: {
        interval: 0, //坐标轴刻度标签的显示间隔(在类目轴中有效) 0:显示所有  1：隔一个显示一个 :3：隔三个显示一个...
        // rotate: -20, //标签倾斜的角度，显示不全时可以通过旋转防止标签重叠（-90到90）
      },
    },
    yAxis: [
      {
        type: "value",
        // name: '数量',
        min: 0,
        axisLabel: {
          formatter: "{value}",
        },
        axisTick: {
          show: false, //是否显示网状线 默认为true
          alignWithLabel: true,
        },
        axisLine: {
          show: false, //这里的show用于设置是否显示x轴那一条线 默认为true
          lineStyle: {
            color: "#999",
          },
        },
      },
    ],
    series: series.map((val, index) => ({
      name: legend[index],
      type: types[index],
      data: val,
      smooth: true,
      symbolSize: 8,
      barWidth: 9,
      // coordinateSystem: 'polar',
      // areaStyle: {}, // TODO: 实现折线图下面的背景色的显示
    })),
  };
  // console.log('-chart-option-', baseOption, option, other)
  return Object.assign({}, { ...baseOption, ...extraStyle }, option, other);
}
