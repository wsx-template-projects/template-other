window.onload = function () {
  let app = new Vue({
    el: "#app",
    data: {
      list: [],
      i: 0,
      btnArr: [
        {
          text: '概览'
        },
        {
          text: '创业活跃力'
        },
        {
          text: '经营活跃力'
        },
        {
          text: '专业创新力'
        },
        {
          text: '人力聚集力'
        },
        {
          text: '政府支持力'
        },
      ],
      // 概览
      gl: {
        points: 99.8,
        contrast: '50%',
        upOrDown: '1', // 1下降 2上升
        indicators: [
          {
            text: '创业活跃力',
            img: './img/chuangye.svg',
            points: '50',
            upOrDown: '1',
          },{
            text: '经营活跃力',
            img: './img/jingying2.svg',
            points: '60',
            upOrDown: '2',
          },{
            text: '专业创新力',
            img: './img/zhuanye2.svg',
            points: '70',
            upOrDown: '2',
          },{
            text: '人员聚集力',
            img: './img/renyuan2.svg',
            points: '80',
            upOrDown: '1',
          },{
            text: '政府支持力',
            img: './img/zhengfu2.svg',
            points: '90',
            upOrDown: '1',
          },
        ],
        tableArr: [
          {
            name: '名称1',
            value: 500,
            upOrDown: '1',
          },{
            name: '名称2',
            value: 600,
            upOrDown: '2',
          },
        ],
        areaArr: ['综合活跃力','创业活跃力','经营活跃力','专业活跃力','人力聚集力','政府支持力'],
        scrollbarArr: [
          {
            name: '街道/镇名称1',
            value: 70
          },{
            name: '街道/镇名称2',
            value: 80
          },{
            name: '街道/镇名称3',
            value: 90
          },{
            name: '街道/镇名称4',
            value: 55
          },{
            name: '街道/镇名称5',
            value: 87
          },
        ]
      },
      // 创业
      cy: {},
    },
    computed: {
    },
    watch: {
    },
    created() {
      this.init()
    },
    methods: {
      init(){
        setTimeout(()=>{
          // barAndLine
        },1000)
      },
      // js 实现锚点
      md(index){
        this.i = index
        let jump = document.querySelectorAll('.d_jump')
        let total = jump[index].offsetTop - 50
        document.body.scrollTop = total
        document.documentElement.scrollTop = total
        window.pageYOffset = total
      },
      // 概览 点击区域活力指数排名（调用接口改变数据）
      changeQyFn(value){
        console.log(value)
        this.gl.scrollbarArr = [
          {
            name: '街道/镇名称4',
            value: 10
          },{
            name: '街道/镇名称89',
            value: 30
          }
        ]
      },
    },
  });
}
