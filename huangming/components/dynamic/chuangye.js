Vue.component('chuang-ye', {
  template: `
    <div class="cy-box">
      <div class="title-com">
        <img class="mt5" src="./img/chuangye.svg" alt="">
        <p>创业活跃力</p>
      </div>
      <!--1-->
      <div class="cy-one-box">
        <div class="cy-one">
          <p class="wl-title-0">存续企业趋势</p>
          <p class="text">近5年 食品生产企业存续情况统计</p>
          <div class="cy-one-left" ref="xcRef"></div>
        </div>
        <div class="cy-one">
          <p class="wl-title-0">新设注销比</p>
          <p class="text">近5年 食品生产企业新设立和注销数量</p>
          <div class="cy-one-right" ref="xsRef"></div>
        </div>
      </div>
      <!--2-->
      <div class="cy-two">
        <div class="flex-bet">
          <p class="wl-title-0">许可分类新设趋势</p>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{downItem}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="item" v-for="item of downArr">{{item}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <p class="text">2020年新设食品生产企业许可类型分布情况</p>
        <div class="cy-two-charts" ref="xkRef"></div>
      </div>
      <!--3-->
      <div class="cy-three-box">
        <div class="cy-three-left">
          <div class="title-header">
            <p class="wl-title">投资结构</p>
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
          <p class="text">总投资人数：<span>456</span>人</p>
          <div class="cy-three-left-charts"  ref="tzRef"></div>
        </div>
        <div class="cy-three-right">
          <div class="title-header">
            <p class="wl-title">投资人分布</p>
            <div class="gl-two-btn">
              <p 
                v-for="(item,index) of rightBtn" 
                :key="item"
                @click="rightFn(index)"
                :class="rightIndex === index ? 'active' : ''"
              >
                {{item}}
              </p>
            </div>
          </div>
          <p class="text">总投资人数：<span>132</span>人</p>
          <el-table
            :data="tableData"
            height="300"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="区域"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="外国投资人"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="温岭投资人"
               width="100"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="浙江非温岭投资人"
              width="140"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="省外投资人"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      leftBtn: ['投资人','投资金额'],
      leftIndex: 0,
      rightBtn: ['区域分布','类型分布'],
      rightIndex: 0,
      downArr: ['2022年','2021年','2020年','2019年',],
      downItem: '',
      tableData: [
          {
        date: '2016-05-02',
        name: '王小虎',
        address: '上1'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上2'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上3'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上4'
      }],
      xcChart: null,
      xsChart: null,
      xkChart: null,
      tzChart: null,
    };
  },
  props: {

  },
  computed: {},
  components: {},
  watch: {},
  created() {
    this.downItem = this.downArr[0]
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.xcChart = echarts.init(this.$refs.xcRef);
      this.xsChart = echarts.init(this.$refs.xsRef);
      this.xkChart = echarts.init(this.$refs.xkRef);
      this.tzChart = echarts.init(this.$refs.tzRef);
      this.drawChart();
    },
    drawChart(){
      let xcOption = barAndLine
      this.xcChart.setOption(xcOption)
      let xsOption = lineAndLine
      this.xsChart.setOption(xsOption)
      let xkOption = barTensile
      this.xkChart.setOption(xkOption)
      let tzOption = pie
      this.tzChart.setOption(tzOption)
    },
    leftFn(index){
      this.leftIndex = index
      this.tzChart.clear()
      index === 0 ? this.tzChart.setOption(pie) : this.tzChart.setOption(bar)
    },
    rightFn(index){
      this.rightIndex = index
    },
    handleCommand(i){
      this.downItem = i
    }
  },
});
