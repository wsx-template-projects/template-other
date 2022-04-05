// 柱状图，折线图
let barAndLine = {
  color: ["#73A0FA", "#5AD8A6"],
  grid: {
    top: "10%",
    left: "0%",
    right: "0%",
    bottom: "0%",
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
  },
  legend: {
    data: ["存续数量", "增长率"],
  },
  xAxis: [
    {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      // 去除刻度
      axisTick: {
        show: false,
        alignWithLabel: true,
      },
      // 去除x坐标轴的颜色
      axisLine: {
        show: false,
      },
      axisPointer: {
        type: "shadow",
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "",
      min: 0,
      // max: 250,
      // interval: 50,
      axisLabel: {
        formatter: "{value}", // {value} ml
      },
    },
    {
      type: "value",
      name: "",
      min: 0,
      max: 100,
      interval: 20,
      axisLabel: {
        formatter: "{value} %",
      },
    },
  ],
  series: [
    {
      name: "存续数量",
      type: "bar",
      tooltip: {
        valueFormatter: function (value) {
          return value + "";
        },
      },
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
      ],
    },
    {
      name: "增长率",
      type: "line",
      yAxisIndex: 1,
      // tooltip: {
      //   valueFormatter: function (value) {
      //     return value + " %";
      //   },
      // },
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
    },
  ],
};
// 饼图
let pie = {
  color: ["#73A0FA", "#5AD8A6"],
  tooltip: {
    trigger: "item",
  },
  legend: {
    type: "scroll",
    orient: "vertical",
    top: 100,
    right: 80,
    // left: 'right',
    formatter: function (name) {
      return name;
    },
  },
  series: [
    {
      name: "",
      type: "pie",
      radius: ["40%", "70%"],
      center: ["25%", "50%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "40",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "温岭人" },
        { value: 735, name: "外地人" },
      ],
    },
  ],
};
// 漏斗图
let funnel = {
  color: ["#73A0FA", "#5AD8A6", "#88E003", "#FFC700", "#FF7200"],
  grid: {
    top: "0%",
    left: "0%",
    right: "0%",
    bottom: "0%",
    containLabel: true,
  },
  series: [
    {
      name: "Funnel",
      type: "funnel",
      left: "0%",
      right: "50%",
      top: 0,
      bottom: 0,
      width: "80%",
      min: 0,
      max: 100,
      minSize: "0%",
      maxSize: "100%", // '100%',
      sort: "descending",
      z: 1,
      gap: 2,
      label: {
        show: true,
        position: "right",
      },
      labelLine: {
        show: true,
        length: 40,
        lineStyle: {
          width: 1,
          type: "solid",
        },
      },
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 1,
      },
      emphasis: {
        label: {
          fontSize: 20,
        },
      },
      data: [
        { value: 100, name: "100%" },
        { value: 80, name: "80%" },
        { value: 60, name: "60%" },
        { value: 40, name: "40%" },
        { value: 20, name: "20%" },
      ],
    },
  ],
};
// 柱状图左右
let barTwo = {
  color: ["#5AD8A6", "#73A0FA"],
  /*tooltip: {
    /!*trigger: 'axis',
    formatter(params) {
      console.log(params)
      return params.data
      ///
    },*!/
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
  },*/
  legend: {
    data: ["商标", "专利"],
  },
  grid: {
    left: "0%",
    right: "3%",
    bottom: "0%",
    top: "10%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "value",
      axisLabel: {
        formatter: (params) => {
          if (params < 0) {
            return -params;
          } else {
            return params;
          }
        },
      },
    },
  ],
  yAxis: [
    {
      type: "category",
      axisTick: {
        show: false,
      },
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  ],
  series: [
    {
      name: "专利",
      type: "bar",
      stack: "Total",
      label: {
        show: true,
      },
      emphasis: {
        focus: "series",
      },
      data: [320, 302, 341, 374, 390, 450, 420],
    },
    {
      name: "商标",
      type: "bar",
      stack: "Total",
      label: {
        normal: {
          show: true,
          formatter: function (params) {
            return Math.abs(params.value);
          }, //返回绝对值
        },
      },
      emphasis: {
        focus: "series",
      },
      data: [-120, -132, -101, -134, -190, -230, -288],
    },
  ],
};
// 折线图
function lineFn(color = "#73A0FA") {
  let res = {
    color: [color],
    grid: {
      top: "3%",
      left: "0%",
      right: "0%",
      bottom: "0%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      // 去除刻度
      axisTick: {
        show: false,
        alignWithLabel: true,
      },
      // 去除x坐标轴的颜色
      axisLine: {
        show: false,
      },
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  };
  return res;
}
// 柱状图
function barFn(color = "#73A0FA") {
  let res = {
    color: [color],
    grid: {
      top: "5%",
      left: "0%",
      right: "0%",
      bottom: "0%",
      containLabel: true,
    },
    tooltip: {},
    xAxis: {
      type: "category",
      // 去除刻度
      axisTick: {
        show: false,
        alignWithLabel: true,
      },
      // 去除x坐标轴的颜色
      axisLine: {
        show: false,
      },
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  };
  return res;
}
