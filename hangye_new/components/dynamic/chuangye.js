Vue.component("chuang-ye", {
  template: `
    <div class="cy-box">
      <div class="title-com">
        <img class="mt5" src="./img/chuangye.svg" alt="">
        <p>创业活跃力</p>
      </div>
      <!--1-->
      <div class="cy-one-box">
        <div class="cy-one">
          <p class="wl-title-0">主体变化趋势</p>
          <p class="text">2017-2021年｜ 食品生产企业存续&新增趋势</p>
          <div class="cy-one-left" ref="leftRef"></div>
        </div>
        <div class="cy-one">
          <p class="wl-title-0">外来投资人比重</p>
          <p class="text">投资人总数：<span style="color: #158DFF;">100</span></p>
          <div class="cy-one-right" ref="rightRef"></div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      leftChart: null,
      rightChart: null,
    };
  },
  props: {
    infoData: {
      type: Object,
      default() {
        return {
          left: {
            xAxisData: [],
            seriesData: [],
          },
          // 饼图
          right: {
            seriesData: [],
          },
        };
      },
    },
  },
  computed: {
    leftOption() {
      const { xAxisData, seriesData } = this.infoData.left;
      const option = { ...barAndLine };
      option.xAxis.data = xAxisData;
      if (seriesData.length > 0) {
        option.series = option.series.map((item, index) => {
          const temp = { ...item };
          temp.data = seriesData[index];
          const max = Math.max(...seriesData[index]);
          const interval = Math.ceil(max / 5);
          // console.log("max :>> ", max);
          // console.log("interval :>> ", interval);
          const mul = Math.pow(10, interval.toString().length - 1);
          const currInterval = Math.ceil(interval / mul) * mul;
          option.yAxis[index].interval = currInterval;
          option.yAxis[index].max = currInterval * 5;
          return temp;
        });
      }
      return option;
    },
    rightOption() {
      const { seriesData } = this.infoData.right;
      const option = { ...pie };
      option.series = option.series.map((item, index) => {
        const temp = { ...item };
        temp.data = seriesData;
        return temp;
      });
      // console.log("option :>> ", option);
      return option;
    },
  },
  components: {},
  watch: {
    infoData: {
      handler(v) {
        this.initChart(this.leftChart, this.$refs.leftRef, this.leftOption);
        this.initChart(this.rightChart, this.$refs.rightRef, this.rightOption);
      },
      deep: true,
    },
  },
  created() {},
  mounted() {
    this.leftChart = echarts.init(this.$refs.leftRef);
    this.rightChart = echarts.init(this.$refs.rightRef);
  },
  methods: {
    initChart(chartObj, chartEl, option) {
      if (!chartObj) {
        chartObj = echarts.init(chartEl);
      }
      chartObj.setOption(option);
    },
  },
});
