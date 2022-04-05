Vue.component("ren-li", {
  template: `
    <div class="rl-box mt30">
      <div class="title-com">
        <img class="mt5" src="./img/renli.svg" alt="">
        <p>人才聚集力</p>
      </div>
      <!--1-->
      <div class="cy-three-box">
        <div class="cy-three-left">
          <p class="wl-title-0">就业人数(户均)</p>
          <p class="text">2017-2021年｜ 食品生产企业就业人员数量</p>
          <div class="jy-three-left-charts" ref="leftRef"></div>
        </div>
        <div class="cy-three-right">
          <div class="flex-bet">
            <p class="wl-title-0">福利情况(万元）</p>
          </div>
          <div style="margin: 10px 0;" class="flex-bet">
            <p>2017-2021年｜ 食品生产企业户均五险一金支出额情况</p>
            <el-dropdown @command="handleThree">
              <span class="el-dropdown-link">
                {{downItemThree}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="item" v-for="item of downArrThree">{{item}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="jy-three-left-charts" ref="rightRef"></div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      downArrThree: ["户均五险一金", "社保缴纳户数", "公积金缴纳户数"],
      downItemThree: "",
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
      const option = { ...lineFn("#5AD8A6") };
      option.xAxis.data = xAxisData;
      option.series = option.series.map((item, index) => {
        const temp = { ...item };
        temp.data = seriesData[index];
        return temp;
      });
      // console.log("option-renli-111 :>> ", option);
      return option;
    },
    rightOption() {
      const { xAxisData, seriesData } = this.infoData.right;
      const option = { ...barFn() };
      option.xAxis.data = xAxisData;
      option.series = option.series.map((item, index) => {
        const temp = { ...item };
        temp.data = seriesData[index];
        return temp;
      });
      // console.log("option-renli-222 :>> ", option);
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
  created() {
    this.downItemThree = this.downArrThree[0];
  },
  mounted() {
    this.leftChart = echarts.init(this.$refs.leftRef);
    this.rightChart = echarts.init(this.$refs.rightRef);
  },
  methods: {
    handleThree(data) {
      this.downItemThree = data;
      // console.log("i :>> ", data);
      this.$emit("init", ["right", data]);
    },
    initChart(chartObj, chartEl, option) {
      if (!chartObj) {
        chartObj = echarts.init(chartEl);
      }
      chartObj.setOption(option);
    },
  },
});
