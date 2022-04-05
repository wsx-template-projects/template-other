
// 柱状图，折线图
let barAndLine = {
  color: ['#73A0FA', '#5AD8A6'],
  grid: {
    top: '10%',
    left: '0%',
    right: '0%',
    bottom: '0%',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  legend: {
    data: ['存续数量', '增长率']
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
        type: 'shadow'
      }
    }
  ],
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '存续数量',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + '';
        }
      },
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: '增长率',
      type: 'line',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' %';
        }
      },
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ]
}
// 折线图，折线图
let lineAndLine = {
  color: ['#73A0FA', '#5AD8A6'],
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['新设', '消亡']
  },
  grid: {
    top: '10%',
    left: '0%',
    right: '3%',
    bottom: '0%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    // 去除刻度
    axisTick: {
      show: false,
      alignWithLabel: true,
    },
    // 去除x坐标轴的颜色
    axisLine: {
      show: false,
    },
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '新设',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '消亡',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    }
  ]
}
// 柱状图，拉伸
let barTensile = {
  color: ['#73A0FA', '#5AD8A6'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      label: {
        show: true
      }
    }
  },
  calculable: true,
  grid: {
    top: '2%',
    left: '0%',
    right: '0%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      // 去除刻度
      axisTick: {
        show: false,
        alignWithLabel: true,
      },
      // 去除x坐标轴的颜色
      axisLine: {
        show: false,
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '',
      axisLabel: {
        formatter: '{value}'
        /*formatter: function (a) {
          a = +a;
          return isFinite(a) ? echarts.format.addCommas(+a / 1000) : '';
        }*/
      }
    }
  ],
  dataZoom: [
    {
      show: true,
      start: 0,
      end: 100
    },
    {
      type: 'inside',
      start: 0,
      end: 100
    },

  ],
  series: [
    {
      name: 'Budget 2011',
      type: 'bar',
      data: [120, 132, 101, 134, 90, 230, 210]
    },

  ]
}
// 饼图
let pie = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    top: 100,
    right: 80,
    // left: 'right',
    formatter: function (name) {
      return name;
    }
  },
  series: [
    {
      name: '',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['25%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '外国投资人' },
        { value: 735, name: '温岭投资人' },
        { value: 580, name: '浙江非温岭投资人' },
        { value: 484, name: '省外投资人' }
      ]
    }
  ]
}
// 柱状图
let bar = {
  color: ['#73A0FA', '#5AD8A6'],
  grid: {
    top: '5%',
    left: '0%',
    right: '0%',
    bottom: '0%',
    containLabel: true
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    // 去除刻度
    axisTick: {
      show: false,
      alignWithLabel: true,
    },
    // 去除x坐标轴的颜色
    axisLine: {
      show: false,
    },
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
}
// 漏斗图
let funnel = {
  color: ['#73A0FA','#5AD8A6','#88E003','#FFC700','#FF7200'],
  grid: {
    top: '0%',
    left: '0%',
    right: '0%',
    bottom: '0%',
    containLabel: true,
  },
  series: [
    {
      name: 'Funnel',
      type: 'funnel',
      left: '0%',
      right: '50%',
      top: 0,
      bottom: 0,
      width: '80%',
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',// '100%',
      sort: 'descending',
      z: 1,
      gap: 2,
      label: {
        show: true,
        position: 'right'
      },
      labelLine: {
        show: true,
        length: 40,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      },
      emphasis: {
        label: {
          fontSize: 20
        }
      },
      data: [
        { value: 100, name: '100%'},
        { value: 80, name: '80%' },
        { value: 60, name: '60%' },
        { value: 40, name: '40%' },
        { value: 20, name: '20%' },
      ]
    }
  ]
}
// 分段的柱状图
let periodBar = {
  color: ['#73A0FA','#5AD8A6','#5D7092','#F6BD16'],
  legend: {},
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '0%',
    right: '0%',
    bottom: '0%',
    top: '5%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      // 去除刻度
      axisTick: {
        show: false,
        alignWithLabel: true,
      },
      // 去除x坐标轴的颜色
      axisLine: {
        // show: false,
        color: '#ccc'
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    }
  ],
  yAxis: [
    {
      type: 'value',
      show: false
    }
  ],
  series: [
    {
      name: '100万以下',
      type: 'bar',
      barWidth: 25,
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '100-200万',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '200-500万',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: '500万以上',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      data: [170, 222, 281, 134, 180, 130, 710]
    },
  ]
}
// 柱状图，拉伸,多列
let barTensiles = {
  color: ['#73A0FA', '#5AD8A6', '#5D7092'],
  legend: {
    data: ['Budget 2011', 'Budget 2012', 'Budget 2013']
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      label: {
        show: true
      }
    }
  },
  calculable: true,
  grid: {
    top: '8%',
    left: '0%',
    right: '0%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      // 去除刻度
      axisTick: {
        show: false,
        alignWithLabel: true,
      },
      // 去除x坐标轴的颜色
      axisLine: {
        show: false,
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '',
      axisLabel: {
        formatter: '{value}'
        /*formatter: function (a) {
          a = +a;
          return isFinite(a) ? echarts.format.addCommas(+a / 1000) : '';
        }*/
      }
    }
  ],
  dataZoom: [
    {
      show: true,
      start: 0,
      end: 100
    },
    {
      type: 'inside',
      start: 0,
      end: 100
    },

  ],
  series: [
    {
      name: 'Budget 2011',
      type: 'bar',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Budget 2012',
      type: 'bar',
      data: [150, 122, 171, 184, 30, 130, 510]
    },
    {
      name: 'Budget 2013',
      type: 'bar',
      data: [220, 232, 201, 244, 190, 130, 110]
    },
  ]
}

function lineFn(color = '#73A0FA') {
  let res = {
    color: [color],
    grid: {
      top: '3%',
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      // 去除刻度
      axisTick: {
        show: false,
        alignWithLabel: true,
      },
      // 去除x坐标轴的颜色
      axisLine: {
        show: false,
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  }
  return res
}
