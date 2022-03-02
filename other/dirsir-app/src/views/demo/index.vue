<!-- 
   demo1
-->
<template>
  <div class="">
    <headerBar>
      <span @click="onRight">solt插槽</span>
    </headerBar>
    <div class="main">
      <!-- 计数器组件 -->
      <counter />
      <div class="btnBox">
        <van-button type="primary" size="large" @click="onOpenDialog('one')">非异步关闭dialog</van-button>
        <van-button type="primary" size="large" @click="onOpenDialog('two')">异步关闭dialog, 1s后关闭</van-button>
        <van-button type="primary" size="large" @click="onOpenDialog('three')"
          >异步请求关闭dialog，0.5s后关闭</van-button
        >
      </div>
      <div class="btnBox">
        <van-button type="primary" size="large" @click="onOpenPage('push')">router.push</van-button>
        <van-button type="primary" size="large" @click="onOpenPage('replace')">router.replace</van-button>
        <van-button type="primary" size="large" @click="onOpenPage('go')">router.go</van-button>
        <van-button type="primary" size="large" @click="onOpenPageOther('go')">router.go回退拦截</van-button>
      </div>
    </div>

    <handleDialog v-model:visible="isBool" :type="dialogType" />
  </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import counter from '@/components/counter'
import handleDialog from './components/handleDialog'
import { onMounted, ref } from 'vue'
import { useDialog } from '@/hooks/parentApi'
import { useButton } from '@/hooks/compositeApi'
import { Toast } from 'vant'
export default {
  components: { headerBar, counter, handleDialog },
  setup() {
    const { isBool, onOpen } = useDialog()
    const dialogType = ref('one')
    const onOpenDialog = (type) => {
      dialogType.value = type
      onOpen()
    }
    const onRight = () => {
      Toast('这是headerBar组件的solt插槽')
    }
    const { onBtnEvent } = useButton()
    const onOpenPage = (type) => {
      if (type === 'push') {
        onBtnEvent({ path: '/Activity' })
        return
      }
      if (type === 'replace') {
        onBtnEvent({ path: '/Activity' }, type)
        return
      }
      if (type === 'go') {
        onBtnEvent({}, type)
        return
      }
    }
    const onOpenPageOther = (type) => {
      console.log('-拦截-')
    }
    onMounted(() => {})
    return {
      isBool,
      dialogType,
      onOpenDialog,
      onRight,
      onOpenPage,
      onOpenPageOther
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.main {
  padding: 20px;
}

.btnBox {
  padding-top: 10px;

  .van-button {
    margin-bottom: 10px;
  }
}
</style>
