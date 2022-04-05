Vue.component("jing-ying", {
  template: `
    <div class="jy-box">
      <div class="title-com">
        <img class="mt5" src="./img/jingying.svg" alt="">
        <p>经营活跃力</p>
      </div>
      <!--1-->
      <div class="cy-three-box">
        <div class="cy-three-left">
          <div class="title-header">
            <p class="wl-title">经营规模(万元)</p>
            <div class="gl-two-btn">
              <p 
                v-for="(item,index) of leftBtn" 
                :key="item"
                @click="leftFn(index)"
                :class="leftIndex === index ? 'active' : ''"
              >
                {{item}}
              </p>
            </div>
          </div>
          <p class="text">2017-2021年 ｜ 食品生产企业{户均资产总额}情况</p>
          <div class="jy-three-left-charts" ref="leftRef"></div>
        </div>
        <div class="cy-three-right">
          <div style="height: 44px;" class="flex-bet">
            <p class="wl-title-0">经济规模趋势</p>
            <el-dropdown @command="handleOne">
              <span class="el-dropdown-link">
                {{downItemOne}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="item" v-for="item of downArrOne">{{item}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <p class="text">近5年 食品生产企业户均资产总额变化趋势</p>
          <div class="jy-three-left-charts" ref="rightRef"></div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      currSelType: "", // 当前初始化的图表是左边还是右边
      leftBtn: ["转化率", "非全零申报率", "盈利率"],
      leftIndex: 0,
      downArrOne: ["户均资产总额", "户均营业收入", "户均纳税额"],
      downItemOne: "",
      leftChart: null,
      rightChart: null,
    };
  },
  props: {
    infoData: {
      type: Object,
      default() {
        return {
          // 漏斗图
          left: {
            xAxisData: [],
            seriesData: [],
          },
          // 柱状图
          right: {
            xAxisData: [],
            seriesData: [],
          },
        };
      },
    },
  },
  computed: {
    leftOption() {
      const { seriesData } = this.infoData.left;
      const option = { ...funnel };
      option.series = option.series.map((item, index) => {
        const temp = { ...item };
        temp.data = seriesData;
        return temp;
      });

      return option;
    },
    leftOtherOption() {
      const { xAxisData, seriesData } = this.infoData.left;
      const option = { ...lineFn() };
      option.xAxis.data = xAxisData;
      option.series = option.series.map((item, index) => {
        const temp = { ...item };
        temp.data = seriesData[index];
        return temp;
      });
      return option;
    },
    rightOption() {
      const { seriesData } = this.infoData.right;
      const option = { ...barFn("#F6BD16") };
      option.series = option.series.map((item, index) => {
        const temp = { ...item };
        temp.data = seriesData[index];
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
        // console.log("watch-jingying :>> ", v);
        if (this.currSelType === "") {
          this.initChart(this.leftChart, this.$refs.leftRef, this.leftOption);
          this.initChart(
            this.rightChart,
            this.$refs.rightRef,
            this.rightOption
          );
        } else if (this.currSelType === "left") {
          let currOption = {};
          if (this.leftIndex === 0) {
            currOption = this.leftOption;
          } else {
            currOption = this.leftOtherOption;
          }
          this.initChart(this.leftChart, this.$refs.leftRef, currOption);
        } else {
          this.initChart(
            this.rightChart,
            this.$refs.rightRef,
            this.rightOption
          );
        }
      },
      deep: true,
    },
  },
  created() {
    this.downItemOne = this.downArrOne[0];
  },
  mounted() {
    this.leftChart = echarts.init(this.$refs.leftRef);
    this.rightChart = echarts.init(this.$refs.rightRef);
  },
  methods: {
    leftFn(index) {
      this.currSelType = "left";
      this.leftIndex = index;
      this.leftChart.clear();
      const data = this.leftBtn[index];
      this.$emit("init", ["left", data]);
    },
    handleOne(data) {
      this.currSelType = "right";
      this.downItemOne = data;
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
