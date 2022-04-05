Vue.component('gai-lan', {
  template: `
    <div class="gl-box">
      <div class="title-com">
        <img class="mt5" src="./img/gailan.svg" alt="">
        <p>概览</p>
      </div>
      <!--食品生产企业活力指数得分-->
      <div class="gl-one">
        <p class="wl-title">食品生产企业活力指数得分</p>
        <div class="gl-one-box">
          <div class="gl-one-left">
            <p class="wl-title-yuan">活力指数综合得分（0～1000）</p>
            <img src="./img/zhishu.svg" alt="">
            <p class="big">{{gl.points}}</p>
            <p class="duibi">
              对比上次得分
              <span class="success mlr10">{{gl.contrast}}</span>
              <i v-if="gl.upOrDown == 1" class="el-icon-bottom success"></i>
              <i v-if="gl.upOrDown == 2" class="el-icon-top error"></i>
            </p>
          </div>
          <div class="gl-one-right">
            <p class="wl-title-yuan">各项指数得分情况</p>
            <div class="gl-right-two">
              <div class="gl-right-item" v-for="item of gl.indicators" :key="item.text">
                <img :src="item.img" alt="">
                <div class="div">
                  <p class="p1">{{item.text}}</p>
                  <p class="p2">
                    {{item.points}}
                    <i v-if="item.upOrDown == 1" class="el-icon-bottom success"></i>
                    <i v-if="item.upOrDown == 2" class="el-icon-top error"></i>
                  </p>
                </div>
              </div>
            </div>
            <div class="gl-table">
              <el-table
                :data="gl.tableArr"
                height="200"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="指标名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="value"
                  label="指标值"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="upOrDown"
                  label=""
                >
                <template slot-scope="scope">
                  <span v-if="scope.row.upOrDown == 1"><i class="el-icon-bottom success"></i></span>
                  <span v-if="scope.row.upOrDown == 2"><i class="el-icon-top error"></i></span>
                </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <!--区域活力指数排名-->
      <div class="gl-two">
        <div class="title-header">
          <p class="wl-title">区域活力指数排名</p>
          <div class="gl-two-btn">
            <p 
              v-for="(item,index) of gl.areaArr" 
              :key="item"
              @click="activeFn(index)"
              :class="i === index ? 'active' : ''"
            >
              {{item}}
            </p>
          </div>
        </div>
        <div class="gl-two-content">
          <el-scrollbar style="height:100%;">
            <div v-for="(item,index) of gl.scrollbarArr" :key="index" class="gl-content-item">
              <p>{{item.name}}<span>{{item.value}}</span></p>
              <el-progress
                :show-text="false"
                color="#3296FA"
                :stroke-width="8"
                :percentage="item.value"
              >
              </el-progress>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      i: 0,
    };
  },
  props: {
    gl: {
      type: Object,
      default: ()=>{
        return {}
      }
    }
  },
  computed: {},
  components: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    activeFn(index){
      this.i = index
      this.$emit('callback',this.i)
    }
  },
});
