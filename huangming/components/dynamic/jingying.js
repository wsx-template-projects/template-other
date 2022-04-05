Vue.component('jing-ying', {
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
            <p class="wl-title">活跃情况</p>
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
          <p class="text">20xx年食品生产企业年报情况</p>
          <div class="jy-three-left-charts" ref="hyRef"></div>
        </div>
        <div class="cy-three-right">
          <div class="title-header">
            <p class="wl-title">规模变迁情况</p>
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
          <p class="text">近5年 食品生产企业营收规模统计</p>
          <div class="jy-three-right-charts" ref="gmRef"></div>
        </div>
      </div>
      <!--2-->
      <div class="cy-two">
        <div class="title-header">
          <p class="wl-title">存续企业生存情况</p>
          <div class="gl-two-btn">
            <p 
              v-for="(item,index) of twoBtn" 
              :key="item"
              @click="twoFn(index)"
              :class="twoIndex === index ? 'active' : ''"
            >
              {{item}}
            </p>
          </div>
        </div>
        <p class="text">截止到2020年温岭市食品生产企业总体注销企业平均生存时长：20.0（年）</p>
        <div class="cy-two-charts" ref="xcRef"></div>
      </div>
      <!--3-->
      <div class="cy-three-box">
        <div class="cy-three-left">
          <div class="flex-bet">
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
          <div class="jy-three-left-charts" ref="jjRef"></div>
        </div>
        <div class="cy-three-right">
          <div class="flex-bet">
            <p class="wl-title-0">经济规模区域分布</p>
            <div>
              <el-dropdown @command="handleTwo" class="mr30">
                <span class="el-dropdown-link">
                  {{downItemTwo}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="item" v-for="item of downArrTwo">{{item}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown @command="handleThree">
                <span class="el-dropdown-link">
                  {{downItemThree}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="item" v-for="item of downArrThree">{{item}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <p class="text">2020年 食品生产企业户均资产总额区域分布</p>
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
              label="数值（万元）"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--4-->
      <div class="cy-two">
        <div class="flex-bet">
          <p class="wl-title-0">许可类型经济规模分布</p>
          <el-dropdown @command="handleFour">
            <span class="el-dropdown-link">
              {{downItemFour}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="item" v-for="item of downArrFour">{{item}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <p class="text">截止到2020年温岭市食品生产企业总体注销企业平均生存时长：20.0（年）</p>
        <div class="cy-two-charts" ref="xkRef"></div>
      </div>
    </div>
  `,
  data() {
    return {
      downArrOne: ['户均资产总额','户均营业收入','户均纳税额',],
      downItemOne: '',
      downArrTwo: ['户均资产总额','户均营业收入','户均纳税额',],
      downItemTwo: '',
      downArrThree: ['2022年','2021年','2020年',],
      downItemThree: '',
      downArrFour: ['2022年','2021年','2020年',],
      downItemFour: '',
      leftBtn: ['转化率','非全零申报率','盈利率'],
      leftIndex: 0,
      rightBtn: ['营收规模','资产规模'],
      rightIndex: 0,
      twoBtn: ['区域分布','类型分布'],
      twoIndex: 0,
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
      hyChart: null,
      gmChart: null,
      xcChart: null,
      jjChart: null,
      xkChart: null,
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
  },
  mounted() {
    this.init()
  },
  methods: {
    init(){
      this.hyChart = echarts.init(this.$refs.hyRef);
      this.gmChart = echarts.init(this.$refs.gmRef);
      this.xcChart = echarts.init(this.$refs.xcRef);
      this.jjChart = echarts.init(this.$refs.jjRef);
      this.xkChart = echarts.init(this.$refs.xkRef);
      this.drawChart();
    },
    drawChart(){
      let hyOptionOne = funnel
      this.hyChart.setOption(hyOptionOne)
      let gmOptionOne = periodBar
      this.gmChart.setOption(gmOptionOne)
      let xcOptionOne = barTensile
      this.xcChart.setOption(xcOptionOne)
      let jjOption = lineFn()
      this.jjChart.setOption(jjOption)
      let xkOption = barTensiles
      this.xkChart.setOption(xkOption)
    },
    leftFn(index){
      this.leftIndex = index
      this.hyChart.clear()
      if(index === 0){
        this.hyChart.setOption(funnel)
      }else if(index === 1){
        this.hyChart.setOption(lineFn())
      }else if(index === 2){
        this.hyChart.setOption(lineFn())
      }
    },
    rightFn(index){
      this.rightIndex = index
      this.gmChart.clear()
      if(index === 0){
        this.gmChart.setOption(periodBar)
      }else if(index === 1){
        this.gmChart.setOption(periodBar)
      }
    },
    twoFn(index){
      this.twoIndex = index
      this.xcChart.clear()
      if(index === 0){
        this.xcChart.setOption(barTensile)
      }else if(index === 1){
        this.xcChart.setOption(barTensile)
      }
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
  },
});
