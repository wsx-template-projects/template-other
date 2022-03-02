// 全局静态界面加载动画
export default {
  mounted() {
    this.$loading.show()
    setTimeout(() => {
      this.$loading.hide()
    }, 300)
  }
}
