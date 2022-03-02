<!-- 
   index
-->
<template>
  <div class="index">
    <van-button @click="openDialog">打开dialog</van-button>
    <van-dialog
      v-model="show"
      title="标题"
      show-cancel-button
      @confirm="onConfirm"
      @cancel="onCancel"
      :before-close="handleBeforeClose"
    >
      <img class="dialog-img" src="https://img01.yzcdn.cn/vant/apple-3.jpg" />
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      show: false,
      radio: ''
    }
  },
  computed: {},
  components: {},
  created() {},
  mounted() {},
  methods: {
    openDialog() {
      this.show = true
    },
    handleBeforeClose(action, done) {
      console.log('-action-', action)
      console.log('-done-', done)
      if (action === 'confirm') {
        if (!this.radio) {
          this.$toast('radio不能为kong')
          done(false)
        } else {
          done()
        }
      } else {
        done()
      }
    },
    onConfirm() {
      console.log('-confirm-')
    },
    onCancel() {
      console.log('-cancel-')
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.dialog-img {
  width: 300px;
  height: 300px;
}
</style>
