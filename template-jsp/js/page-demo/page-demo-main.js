let app = new Vue({
  el: "#app",
  data: {
    barChartData: {
      legend: ["存续主体", "新增主体"],
      xAxis: [],
      series: [],
      yAxis: [
        {
          type: "value",
          name: "数量",
          min: 0,
          //   max: 100,
          //   interval: 20,
          axisLabel: {
            formatter: "{value}",
          },
        },
        // {
        //     type: 'value',
        //     name: '百分比',
        //     min: 0,
        //     max: 100,
        //     interval: 20,
        //     axisLabel: {
        //         formatter: '{value}%',
        //     },
        // },
      ],
      chartConfig: {
        title: {
          //   text: "柱状图-1",
          text: "",
        },
        legend: {
          // right: '50%',
        },
        seriesConfig: {
          //   smooth: true,
          symbolSize: 10,
          barWidth: 12,
          //   coordinateSystem: "polar",
          //   areaStyle: {}, // TODO: 实现折线图下面的背景色的显示
        },
      },
    },
  },
  computed: {
    barOptions() {
      const chartTypes = ["bar", "line"];
      console.log(`window`, window);
      return $hooks.useChart(chartTypes, this.barChartData);
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.getBarData();
  },
  methods: {
    onInitEcharts() {
      this.getBarData();
    },
    getBarData(count = 2) {
      const res = {
        xAxis: [],
        series: [],
      };
      res.xAxis = [2015, 2016, 2017, 2018, 2019];
      for (let i = 0; i < count; i++) {
        const temp = [];
        for (let j = 0; j < res.xAxis.length; j++) {
          temp.push(Math.floor(Math.random() * 3000));
        }
        res.series.push(temp);
      }
      //   this.$loading.show("加载中...");
      this.$loading.show("加载中...", ".components-echarts");
      setTimeout(() => {
        const { xAxis, series } = res;
        this.barChartData.xAxis = xAxis;
        this.barChartData.series = series;
        this.$loading.hide();
      }, 2000);
    },
  },
});
