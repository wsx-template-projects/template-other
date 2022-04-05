window.onload = function () {
  let app = new Vue({
    el: "#app",
    data: {
      // 创业
      chuangyeData: {
        left: {
          xAxisData: [],
          seriesData: [],
        },
        // 饼图
        right: {
          seriesData: [],
        },
      },
      // 经营
      jingyingData: {
        // 漏斗图
        left: {
          seriesData: [],
        },
        // 柱状图
        right: {
          xAxisData: [],
          seriesData: [],
        },
      },
      //
      zuanyeData: {
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
      },
      // 人力
      renliData: {
        // 折线图
        left: {
          xAxisData: [],
          seriesData: [],
        },
        // 柱状图
        right: {
          xAxisData: [],
          seriesData: [],
        },
      },

      list: [],
      i: 0,
    },
    computed: {},
    watch: {},
    created() {
      this.getChuangyeLeftData();
      this.getChuangyeRightData();

      this.getJingyingLeftData();
      this.getJingyingRightData();

      this.getZuanyeLeftData();
      this.getZuanyeRightData();

      this.getRenliLeftData();
      this.getRenliRightData();
    },
    methods: {
      // 经营回调
      handleInitJingying(data) {
        console.log("data :>> ", data);
        if (data[0] === "left") {
          console.log("初始化经营规模 :>> ");
          const params = { status: data[1] };
          this.getJingyingLeftData(params);
        } else {
          console.log("初始化经营规模趋势 :>> ");
          const params = { status: data[1] };
          console.log("params :>> ", params);
          this.getJingyingRightData(params);
        }
      },
      // 人力回调
      handleInitRenli(data) {
        console.log("data :>> ", data);
        const params = { status: data[1] };
        console.log("params :>> ", params);
        if (data[0] === "right") {
          this.getRenliRightData(params);
        }
      },
      getChuangyeLeftData(params = {}) {
        console.log("主体变化趋势-params :>> ", params);
        const res = {
          xAxis: [],
          series: [],
        };
        res.xAxis = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        this.syncData({ res, max: 3000, min: 100 }).then((res) => {
          console.log("主体变化趋势-res :>> ", res);
          const { xAxis, series } = res;
          this.chuangyeData.left.xAxisData = xAxis;
          this.chuangyeData.left.seriesData = series;
        });

        //  const res = {
        //    data: {
        //      data: {
        //        bar: [
        //          {
        //            total: null,
        //            statisticalQuantity: 3920,
        //            statisticalAmount: null,
        //            statisticalProportion: null,
        //            statisticalDimension: "2021",
        //          },
        //          {
        //            total: null,
        //            statisticalQuantity: 3920,
        //            statisticalAmount: null,
        //            statisticalProportion: null,
        //            statisticalDimension: "2020",
        //          },
        //        ],
        //        line: [
        //          {
        //            total: null,
        //            statisticalQuantity: 3020,
        //            statisticalAmount: null,
        //            statisticalProportion: null,
        //            statisticalDimension: "2021",
        //          },
        //          {
        //            total: null,
        //            statisticalQuantity: 1920,
        //            statisticalAmount: null,
        //            statisticalProportion: null,
        //            statisticalDimension: "2020",
        //          },
        //        ],
        //      },
        //    },
        //  };
        //  const { data } = res.data;

        //  // data为数组的话
        //  // let xAxis = [],series = [],currSeries = []
        //  // data.forEach(item => {
        //  //   if (index === 0) {
        //  //     xAxis.push(item.statisticalDimension)
        //  //   }
        //  //   currentSeries.push(item.statisticalQuantity)
        //  // })
        //  // series.push(currentSeries)
        //  // this.chuangyeData.left.xAxisData = xAxis;
        //  // this.chuangyeData.left.seriesData = series;

        //  // data为对象的话
        //  let xAxis = [],
        //    series = [];
        //  Object.keys(data).forEach((key, index) => {
        //    console.log("index", index);
        //    const temp = [];
        //    data[key].forEach((item) => {
        //      if (index === 0) {
        //        xAxis.push(item.statisticalDimension);
        //      }
        //      temp.push(item.statisticalQuantity);
        //    });
        //    series.push(temp);
        //  });
        //  this.chuangyeData.left.xAxisData = xAxis;
        //  this.chuangyeData.left.seriesData = series;
      },
      getChuangyeRightData(params = {}) {
        console.log("外来投资人比重-params :>> ", params);
        const res = {
          series: [
            { value: 2048, name: "温岭人" },
            { value: 735, name: "外地人" },
          ],
        };
        this.syncData({ res }).then((res) => {
          this.chuangyeData.right.seriesData = res.series;
        });
      },
      getJingyingLeftData(params = {}) {
        console.log("经营规模-params :>> ", params);
        if (params.status === "转化率" || !params.status) {
          const res = {
            series: [
              { value: 100, name: "100%" },
              { value: 80, name: "80%" },
              { value: 60, name: "60%" },
              { value: 40, name: "40%" },
              { value: 20, name: "10%" },
            ],
          };
          this.syncData({ res }).then((res) => {
            this.jingyingData.left.seriesData = res.series;
          });
        } else {
          const res = {
            xAxis: [],
            series: [],
          };
          res.xAxis = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
          this.syncData({ res, outerLen: 1, max: 3000, min: 3000 }).then(
            (res) => {
              const { xAxis, series } = res;
              this.jingyingData.left.xAxisData = xAxis;
              this.jingyingData.left.seriesData = series;
            }
          );
        }
      },
      getJingyingRightData(params = {}) {
        console.log("经营规模趋势-params :>> ", params);
        const res = {
          xAxis: [],
          series: [],
        };
        res.xAxis = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        this.syncData({ res, outerLen: 1, max: 3000, min: 3000 }).then(
          (res) => {
            const { xAxis, series } = res;
            this.jingyingData.right.xAxisData = xAxis;
            this.jingyingData.right.seriesData = series;
          }
        );
      },
      // 专业
      getZuanyeLeftData(params = {}) {
        console.log("科研投入-params :>> ", params);
        const res = {
          xAxis: [],
          series: [],
        };
        res.xAxis = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        this.syncData({ res, max: 3000, min: 100 }).then((res) => {
          const { xAxis, series } = res;
          this.zuanyeData.left.xAxisData = xAxis;
          this.zuanyeData.left.seriesData = series;
        });
      },
      getZuanyeRightData(params = {}) {
        console.log("创新成果-params :>> ", params);
        const res = {
          yAxis: [],
          series: [],
        };
        res.yAxis = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        this.syncData({ res, max: 3000, min: -2000 }).then((res) => {
          const { yAxis, series } = res;
          this.zuanyeData.right.yAxisData = yAxis;
          this.zuanyeData.right.seriesData = series;
        });
      },
      // 人力
      getRenliLeftData(params = {}) {
        console.log("就业人数-params :>> ", params);
        const res = {
          xAxis: [],
          series: [],
        };
        res.xAxis = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        this.syncData({ res, outerLen: 1, max: 600, min: 600 }).then((res) => {
          const { xAxis, series } = res;
          this.renliData.left.xAxisData = xAxis;
          this.renliData.left.seriesData = series;
        });
      },
      // 人力
      getRenliRightData(params = {}) {
        console.log("福利情况-params :>> ", params);
        const res = {
          xAxis: [],
          series: [],
        };
        res.xAxis = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        this.syncData({ res, outerLen: 1, max: 300, min: 300 }).then((res) => {
          const { xAxis, series } = res;
          this.renliData.right.xAxisData = xAxis;
          this.renliData.right.seriesData = series;
        });
      },
      syncData({ res, outerLen = 2, max = 3000, min = 100 }) {
        // console.log("res :>> ", res);
        // console.log("outerLen :>> ", outerLen);
        const { xAxis, yAxis } = res;
        const innerLen = xAxis?.length ?? yAxis?.length;
        // console.log("innerLen :>> ", innerLen);
        return new Promise((resolve, reject) => {
          if (innerLen) {
            for (let i = 0; i < outerLen; i++) {
              const temp = [];
              for (let j = 0; j < innerLen; j++) {
                if (i == 0) {
                  temp.push(Math.floor(Math.random() * max));
                } else {
                  temp.push(Math.floor(Math.random() * min));
                }
              }
              res.series.push(temp);
            }
          }
          setTimeout(() => {
            resolve(res);
          }, 1000);
        });
      },
    },
  });
};
