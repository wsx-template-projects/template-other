Vue.component("zuan-ye", {
  template: `
    <div class="zy-box mt30">
      <div class="title-com">
        <img class="mt5" src="./img/keji.svg" alt="">
        <p>科技创新力</p>
      </div>
      <!--2-->
      <div class="cy-one-box mt20">
        <div class="cy-one">
          <p class="wl-title-0">科研投入</p>
          <div class="flex-bet">
            <p class="text">2017-2021年 ｜ 食品生产企业科研投入情况</p>
            <p class="text">单位：万元</p>
          </div>
          
          <div class="cy-one-left" ref="leftRef"></div>
        </div>
        <div class="cy-one">
          <p class="wl-title-0">创新成果（户均）</p>
          <p class="text">2017-2021年｜ 食品生产企业商标、专利数量对比</p>
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
          // 柱状图
          left: {
            xAxisData: [],
            seriesData: [],
          },
          // 柱状图左右
          right: {
            yAxisData: [],
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
      // console.log("option-zuanye-111 :>> ", option);
      return option;
    },
    rightOption() {
      const { yAxisData, seriesData } = this.infoData.right;
      const option = { ...barTwo };
      option.yAxis.data = yAxisData;
      option.series = option.series.map((item, index) => {
        const temp = { ...item };
        temp.data = seriesData[index];
        return temp;
      });
      // console.log("option-zuanye-222 :>> ", option);
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
