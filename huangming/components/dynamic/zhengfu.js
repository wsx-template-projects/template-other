Vue.component('zheng-fu', {
  template: `
    <div class="cy-box">
      <div class="title-com">
        <img class="mt5" src="./img/zhengfu.svg" alt="">
        <p>政府支持力</p>
      </div>
      <!--2-->
      <div class="cy-two">
        <div class="flex-bet">
          <p class="wl-title-0">政务支持力情况</p>
        </div>
        <p class="text">食品生产企业政务支持力情况分布</p>
        <div class="cy-two-charts" ref="tzRef"></div>
      </div>
    </div>
  `,
  data() {
    return {
      tzOption: {
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
      },
      tzChart: null,
    };
  },
  props: {

  },
  computed: {},
  components: {},
  watch: {},
  created() {
  },
  mounted() {
    this.init()
  },
  methods: {
    init(){
      this.tzChart = echarts.init(this.$refs.tzRef);
      this.drawChart();
    },
    drawChart(){
      this.tzChart.setOption(this.tzOption)
    }
  },
});
