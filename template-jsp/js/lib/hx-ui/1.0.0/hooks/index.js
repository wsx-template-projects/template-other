(function () {
  // hooks全局对象
  $hooks = {};
  /**
   * 柱状图基础配置项
   */
  const baseChartOption = {
    grid: {
      top: "20%",
      left: 27,
      right: 27,
      bottom: 27,
      containLabel: true,
    },
    color: ["#31D9A4", "#0796F4"],
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
   * @description 图表 hooks
   * @param {array} chartTypes 图表类型
   * @param {ChartOption} chartOption 图表数据 {legend:[],xAxis: [],yAxis: [],series: []}
  
   * @return {object} 图表 option
   */
  function useChart(chartTypes, chartOption) {
    console.log("chartTypes :>> ", chartTypes);
    console.log("chartOption :>> ", chartOption);
    const { legend, xAxis, yAxis, series, chartConfig = {} } = chartOption;
    const { seriesConfig, ...otherConfig } = chartConfig;
    console.log("seriesConfig :>> ", seriesConfig);
    const option = {
      title: { text: "" },
      legend: {
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
      yAxis,
      series: series.map((val, index) => {
        const temp = {
          name: legend[index],
          type: chartTypes[index],
          data: val,
          ...seriesConfig,
        };
        return temp;
      }),
    };
    console.log("option :>> ", option);
    console.log(
      "result :>> ",
      Object.assign({}, baseChartOption, option, otherConfig)
    );
    return Object.assign({}, baseChartOption, option, otherConfig);
    // return _.merge({}, baseChartOption, option, otherConfig);
  }

  window.$baseChartOption = baseChartOption;
  window.$hooks.useChart = useChart;
  console.log("window :>> ", window);
})();
