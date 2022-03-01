// echarts - 组件
const MyEchartsComponents = {
  template: `
    <div class="components-echarts">
      <slot name="echarts-top" />
      <div class="echarts-content" ref="echartsRef"></div>
    </div>
  `,
  data() {
    return {
      myChart: null,
    };
  },
  props: {
    hasGradients: {
      type: Boolean,
      default: false,
    },
    // TODO: 渐变色配置项：
    // 例如：图表展示的为一个折线图和一个柱状图, ['line','bar'] 折线图没有渐变，柱状图有渐变，
    // 如下对象的 key 值 为渐变目标的图表类型标识，在图表type数组中的下标，
    // 因此该案例的渐变配置对象中只有一个key值为 1 的属性，属性值即为渐变目标的配置信息，
    // 属性一： positions ———— 为一个有且只有四个元素(右、下、左、上)的数组，且元素值在0-1之间
    // 属性二：colors ———— 渐变颜色配置项，offset值在0-1之间，color为渐变颜色
    // 示例：gradientsOption: {
    //     1: {
    //         positions: [0, 0, 0, 1],
    //         colors: [
    //             { offset: 0, color: '#30D8A6' },
    //             { offset: 1, color: '#0797F3' },
    //         ],
    //     },
    // }
    gradientsOption: {
      type: Object,
      default() {
        return {};
      },
    },
    option: {
      type: Object,
      default() {
        return {};
      },
      required: true,
    },
  },
  computed: {},
  components: {},
  watch: {
    option: {
      handler(newVal, oldVal) {
        // console.log("option-watch :>> ", newVal, oldVal);
        this.drawChart();
      },
      deep: true,
    },
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    onInitChart() {
      this.$emit("init");
    },
    init() {
      const chartEl = this.$refs.echartsRef;
      this.myChart = echarts.init(chartEl);
      this.drawChart();
    },
    drawChart() {
      // console.log('hasGradients :>> ', this.hasGradients)
      if (!this.hasGradients) {
        // 没有渐变
        this.myChart.setOption(this.option);
        return;
      }
      // 有渐变
      // console.log('-gradients-option-', this.gradientsOption)
      const gradientsKeys = Object.keys(this.gradientsOption);
      // console.log('-gradients-keys-', gradientsKeys)
      const resetOption = { ...this.option };
      resetOption.series = resetOption.series.map((val, index) => {
        if (gradientsKeys.includes(index + "")) {
          const temp = { ...val, itemStyle: { color: "" } };
          temp.itemStyle.color = new echarts.graphic.LinearGradient(
            ...this.gradientsOption[index].positions,
            this.gradientsOption[index].colors
          );
          return temp;
        }
        return val;
      });
      this.myChart.setOption(resetOption);
    },
    setGradientsOption() {},
  },
};

Vue.component("my-echarts", MyEchartsComponents);
