Vue.component('zuan-ye', {
  template: `
    <div class="zy-box">
      <div class="title-com">
        <img class="mt5" src="./img/zuanye.svg" alt="">
        <p>专业创新力</p>
      </div>
      <!--1-->
      <div class="cy-three-box">
        <div class="cy-three-left">
          <div class="flex-bet">
            <p class="wl-title-0">新兴产业企业趋势</p>
            <el-dropdown @command="handleOne">
              <span class="el-dropdown-link">
                {{downItemOne}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="item" v-for="item of downArrOne">{{item}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <p class="text">近5年 新兴食品生产产业企业变化趋势</p>
          <div class="jy-three-left-charts" ref="xxRef"></div>
        </div>
        <div class="cy-three-right">
          <div class="flex-bet">
            <p class="wl-title-0">类型分布</p>
            <el-dropdown @command="handleTwo">
              <span class="el-dropdown-link">
                {{downItemTwo}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="item" v-for="item of downArrTwo">{{item}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <p class="text">新兴食品生产企业占比排行top5</p>
          <div class="gl-two-content" style="height: 300px;">
            <div class="gl-content-item">
              <p>街道/镇名称<span>70</span></p>
              <el-progress
                :show-text="false"
                color="#3296FA"
                :stroke-width="8"
                :percentage="70"
              >
              </el-progress>
            </div>
            <div class="gl-content-item">
              <p>街道/镇名称<span>70</span></p>
              <el-progress
                :show-text="false"
                color="#3296FA"
                :stroke-width="8"
                :percentage="70"
              >
              </el-progress>
            </div>
            <div class="gl-content-item">
              <p>街道/镇名称<span>70</span></p>
              <el-progress
                :show-text="false"
                color="#3296FA"
                :stroke-width="8"
                :percentage="70"
              >
              </el-progress>
            </div>
            <div class="gl-content-item">
              <p>街道/镇名称<span>70</span></p>
              <el-progress
                :show-text="false"
                color="#3296FA"
                :stroke-width="8"
                :percentage="70"
              >
              </el-progress>
            </div>
            <div class="gl-content-item">
            <p>街道/镇名称<span>70</span></p>
            <el-progress
              :show-text="false"
              color="#3296FA"
              :stroke-width="8"
              :percentage="70"
            >
            </el-progress>
          </div>
          </div>
        </div>
      </div>
      <!--2-->
      <div class="cy-one-box mt20">
        <div class="cy-one">
          <p class="wl-title-0">科研投入情况</p>
          <p class="text">近5年 食品生产企业户均科研投入金额与科研投入营收占比</p>
          <div class="cy-one-left" ref="kyRef"></div>
        </div>
        <div class="cy-one">
          <p class="wl-title-0">有科研投入企业占比</p>
          <p class="text">近5年 食品生产有科研投入的企业占全部企业的比例变化趋势</p>
          <div class="cy-one-right" ref="ykyRef"></div>
        </div>
      </div>
      <!--3-->
      <div class="cy-three-box mt20">
        <div class="cy-three-left">
          <div class="title-header">
            <p class="wl-title">创新成果趋势</p>
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
          <p class="text">近5年 拥有商标的食品生产企业数量变化趋势</p>
          <div class="jy-three-left-charts" ref="qsRef"></div>
        </div>
        <div class="cy-three-right">
          <div class="title-header">
            <p class="wl-title">创新成果分布</p>
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
          <p class="text">创新成果分布 <span>100</span></p>
          <div class="jy-three-right-charts" ref="fbRef"></div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      downArrOne: ['户均资产总额','户均营业收入','户均纳税额',],
      downItemOne: '',
      downArrTwo: ['高薪技术企业占比','有科研投入企业占比','拥有专利企业占比','拥有商标企业占比'],
      downItemTwo: '',
      leftBtn: ['商标','专利'],
      leftIndex: 0,
      rightBtn: ['商标','专利'],
      rightIndex: 0,
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
      xxChart: null,
      kyChart: null,
      ykyChart: null,
      qsChart: null,
      fbChart: null,
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
  },
  mounted() {
    this.init()
  },
  methods: {
    init(){
      this.xxChart = echarts.init(this.$refs.xxRef);
      this.kyChart = echarts.init(this.$refs.kyRef);
      this.ykyChart = echarts.init(this.$refs.ykyRef);
      this.qsChart = echarts.init(this.$refs.qsRef);
      this.fbChart = echarts.init(this.$refs.fbRef);
      this.drawChart();
    },
    drawChart(){
      let xxOption = lineFn()
      this.xxChart.setOption(xxOption)
      let kyOption = barAndLine
      this.kyChart.setOption(kyOption)
      let ykyOption = lineFn('#FFB700')
      this.ykyChart.setOption(ykyOption)
      let qsOption = lineFn()
      this.qsChart.setOption(qsOption)
      let fbOption = pie
      this.fbChart.setOption(fbOption)
    },
    leftFn(index){
      this.leftIndex = index
      this.qsChart.clear()
      // 只作数据切换
      if(index === 0){
        // 商标
        let qsOption = lineFn()
        qsOption.series[0].data = [150, 230, 224, 218, 135, 147, 260]
        this.qsChart.setOption(qsOption)
      }else if(index === 1){
        // 专利
        let qsOption = lineFn()
        qsOption.series[0].data = [1050, 2030, 2024, 2018, 1035, 1047, 2060]
        this.qsChart.setOption(qsOption)
      }
    },
    rightFn(index){
      this.rightIndex = index
      this.fbChart.clear()
      if(index === 0){
        // 商标
        let fbOption = pie
        fbOption.series[0].data = [
          { value: 1048, name: '外国投资人' },
          { value: 735, name: '温岭投资人' },
          { value: 580, name: '浙江非温岭投资人' },
          { value: 484, name: '省外投资人' }
        ]
        this.fbChart.setOption(fbOption)
      }else if(index === 1){
        // 专利
        let fbOption = pie
        fbOption.series[0].data = [
          { value: 1448, name: '外国投资人1' },
          { value: 775, name: '温岭投资人2' },
          { value: 180, name: '浙江非温岭投资人3' },
          { value: 784, name: '省外投资人4' }
        ]
        this.fbChart.setOption(fbOption)
      }
    },
    handleOne(i){
      this.downItemOne = i
    },
    handleTwo(i){
      this.downItemTwo = i
    },
  },
});
