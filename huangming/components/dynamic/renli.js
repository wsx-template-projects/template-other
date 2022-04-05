Vue.component('ren-li', {
  template: `
    <div class="rl-box mt30">
      <div class="title-com">
        <img class="mt5" src="./img/renli.svg" alt="">
        <p>人力聚集力</p>
      </div>
      <!--1-->
      <div class="cy-three-box">
        <div class="cy-three-left">
          <p class="wl-title-0">就业人数趋势</p>
          <p class="text">近5年 食品生产企业就业人数变化趋势</p>
          <div class="jy-three-left-charts" ref="jyqsRef"></div>
        </div>
        <div class="cy-three-right">
          <div class="flex-bet">
            <p class="wl-title-0">就业区域分布图</p>
            <el-dropdown @command="handleOne">
              <span class="el-dropdown-link">
                {{downItemOne}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="item" v-for="item of downArrOne">{{item}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <p class="text">2020年 各区域食品生产行业就业人数统计</p>
          <el-table
            :data="tableData"
            height="300"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="排名"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="街道/乡镇"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="数值（人）"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--2-->
      <div class="cy-three-box mt20">
        <div class="cy-three-left">
        <div class="flex-bet">
            <p class="wl-title-0">就业类型分布</p>
            <el-dropdown @command="handleTwo">
              <span class="el-dropdown-link">
                {{downItemTwo}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="item" v-for="item of downArrTwo">{{item}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <p class="text">2020年 食品生产行业各类型就业人数对比</p>
          <div class="jy-three-left-charts" ref="jylxRef"></div>
        </div>
        <div class="cy-three-right">
          <p class="wl-title-0">法定代表人年龄分布</p>
          <p class="text">食品生产行业法人总数： <span>1230</span></p>
          <div class="jy-three-left-charts" ref="nlfbRef"></div>
        </div>
      </div>
      <!--3-->
      <div class="cy-three-box mt20">
        <div class="cy-three-left">
          <p class="wl-title-0">法定代表人区域分布</p>
          <p class="text">食品生产行业法人总数： <span>1230</span></p>
          <div class="jy-three-left-charts" ref="qyfbRef"></div>
        </div>
        <div class="cy-three-right">
          <p class="wl-title-0">规模变迁情况</p>
          <p class="text">近5年 食品生产企业营收规模统计</p>
          <div class="jy-three-left-charts" ref="gmRef"></div>
        </div>
      </div>
      <!--4-->
      <div class="cy-three-box mt20">
        <div class="cy-three-left">
          <div class="flex-bet">
            <p class="wl-title-0">福利情况趋势</p>
            <el-dropdown @command="handleThree">
              <span class="el-dropdown-link">
                {{downItemThree}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="item" v-for="item of downArrThree">{{item}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div style="margin: 10px 0;" class="flex-bet">
            <p>近5年  户均工资变化趋势</p>
            <p>单位：元、户</p>
          </div>
          <div class="jy-three-left-charts" ref="flqsRef"></div>
        </div>
        <div class="cy-three-right">
          <div class="flex-bet">
            <p class="wl-title-0">福利情况趋势</p>
            <div>
            <el-dropdown @command="handleFour" class="mr30">
              <span class="el-dropdown-link">
                {{downItemFour}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="item" v-for="item of downArrFour">{{item}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="handleFive">
              <span class="el-dropdown-link">
                {{downItemFive}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="item" v-for="item of downArrFive">{{item}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            </div>
          </div>
          <p class="text">2020年 各区域食品生产企业五险一金统计及社保缴纳户数统计</p>
          <el-table
            :data="tableDataTwo"
            height="300"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="排名"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="街道/乡镇"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="数值（元/户）"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--5-->
      <div class="cy-two">
        <div class="flex-bet">
          <p class="wl-title-0">福利归属类型分布</p>
          <div>
            <el-dropdown @command="handleSix" class="mr30">
              <span class="el-dropdown-link">
                {{downItemSix}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="item" v-for="item of downArrSix">{{item}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown @command="handleSeven">
              <span class="el-dropdown-link">
                {{downItemSeven}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="item" v-for="item of downArrSeven">{{item}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="flex-bet">
          <p class="text">近5年 食品生产企业各类型户均工资对比</p>
          <p class="text">单位：元、户</p>
        </div>
        <div class="cy-two-charts" ref="flfbRef"></div>
      </div>
    </div>
  `,
  data() {
    return {
      downArrOne: ['2022年','2021年','2020年'],
      downItemOne: '',
      downArrTwo: ['2022年','2021年','2020年'],
      downItemTwo: '',
      downArrThree: ['户均五险一金','社保缴纳户数','公积金缴纳户数',],
      downItemThree: '',
      downArrFour: ['户均五险一金','社保缴纳户数','公积金缴纳户数',],
      downItemFour: '',
      downArrFive: ['2022年','2021年','2020年',],
      downItemFive: '',
      downArrSix: ['户均五险一金','社保缴纳户数','公积金缴纳户数',],
      downItemSix: '',
      downArrSeven: ['2022年','2021年','2020年',],
      downItemSeven: '',
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
      tableDataTwo: [
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
      jyqsChart: null,
      jylxChart: null,
      nlfbChart: null,
      qyfbChart: null,
      gmChart: null,
      flqsChart: null,
      flfbChart: null,
    };
  },
  props: {

  },
  computed: {},
  components: {},
  watch: {},
  created() {
    this.downItemOne = this.downArrOne[0]
    this.downItemTwo = this.downArrTwo[0]
    this.downItemThree = this.downArrThree[0]
    this.downItemFour = this.downArrFour[0]
    this.downItemFive = this.downArrFive[0]
    this.downItemSix = this.downArrSix[0]
    this.downItemSeven = this.downArrSeven[0]
  },
  mounted() {
    this.init()
  },
  methods: {
    init(){
      this.jyqsChart = echarts.init(this.$refs.jyqsRef);
      this.jylxChart = echarts.init(this.$refs.jylxRef);
      this.nlfbChart = echarts.init(this.$refs.nlfbRef);
      this.qyfbChart = echarts.init(this.$refs.qyfbRef);
      this.gmChart = echarts.init(this.$refs.gmRef);
      this.flqsChart = echarts.init(this.$refs.flqsRef);
      this.flfbChart = echarts.init(this.$refs.flfbRef);
      this.drawChart();
    },
    drawChart(){
      let jyqsOption = lineFn()
      this.jyqsChart.setOption(jyqsOption)
      let jylxOption = barTensile
      this.jylxChart.setOption(jylxOption)
      let nlfbOption = pie
      this.nlfbChart.setOption(nlfbOption)
      let qyfbOption = pie
      this.qyfbChart.setOption(qyfbOption)
      let gmOption = periodBar
      this.gmChart.setOption(gmOption)
      let flqsOption = lineFn()
      this.flqsChart.setOption(flqsOption)
      let flfbOption = barTensile
      this.flfbChart.setOption(flfbOption)
    },
    leftFn(index){
      this.leftIndex = index
    },
    rightFn(index){
      this.rightIndex = index
    },
    twoFn(index){
      this.twoIndex = index
    },
    handleOne(i){
      this.downItemOne = i
    },
    handleTwo(i){
      this.downItemTwo = i
    },
    handleThree(i){
      this.downItemThree = i
    },
    handleFour(i){
      this.downItemFour = i
    },
    handleFive(i){
      this.downItemFive = i
    },
    handleSix(i){
      this.downItemSix = i
    },
    handleSeven(i){
      this.downItemSeven = i
    },
  },
});
