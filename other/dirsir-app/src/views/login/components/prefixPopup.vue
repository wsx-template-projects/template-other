<!-- 
   手机号前缀组件
-->
<template>
  <div class="prefixWrap">
    <van-popup
      class="prefixPopup"
      v-model:show="dialogVisible"
      :close-on-click-overlay="false"
      round
      position="bottom"
      :style="{ height: '66%' }"
    >
      <div class="popupTop">
        <span class="closeIcon" @click="onDialogClose"></span>
        <p class="title">选择国家和地区</p>
      </div>
      <ul class="listBox">
        <li class="item fx-space-between-center b-border" v-for="item in list" :key="item.code" @click="onItem(item)">
          <span>{{ item.name }}</span>
          <span>{{ item.text }}</span>
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import { onMounted, ref, toRef } from 'vue'
import { useVisible } from '@/hooks/childApi'
import { getPhonePrefix } from '@/api/common'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const visible = toRef(props, 'visible')

    const { dialogVisible, onDialogClose } = useVisible(visible, ctx)

    const list = ref([])

    const getPrefixData = () => {
      getPhonePrefix().then((res) => {
        list.value = res.data.map((val) => ({ text: `+${val.code}`, ...val }))
        // console.log('-prefix-list-', list.value)
      })
    }

    const onItem = (item) => {
      ctx.emit('change', item.code)
    }

    onMounted(() => {
      getPrefixData()
    })

    return {
      list,
      dialogVisible,
      onDialogClose,
      onItem
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/common/';
.prefixWrap {
  :deep(.van-overlay) {
    background: rgba(0, 0, 0, 0.5);
  }
}
.prefixPopup {
  font-size: 16px;

  .popupTop {
    position: relative;
    line-height: 50px;

    .closeIcon {
      position: absolute;
      top: 16px;
      left: 16px;
      width: 18px;
      height: 18px;
      background: url('@{imgUrl}icon-cancel.png') no-repeat center;
      background-size: 100% 100%;
    }

    .title {
      text-align: center;
    }
  }

  .listBox {
    padding: 0 16px 20px;
    .item {
      line-height: 44px;
    }

    .item:last-child {
      &.b-border:before {
        height: 0;
      }
    }
  }
}
</style>
