<!-- 
   headerBar组件
-->
<template>
  <div class="header" :style="{ height: headerHeight }">
    <div class="line" :style="{ height: lineHeight }"></div>
    <div class="header-global" :class="{ bottomShadow: isNeedShadow }" :style="{ paddingTop: lineHeight }">
      <div class="left fx-center" :style="{ top: lineHeight }" @click="goBack">
        <span class="icon" :class="arrowsType === 'black' ? 'blackArrows' : 'whiteArrows'"></span>
      </div>
      <div class="headTitle">{{ title }}</div>
      <div class="right fx-center" :style="{ top: lineHeight }">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useHeaderBar, useHeadTitle, useLeftEvent } from './useHeaderBar'
export default {
  props: {
    arrowsType: {
      type: String,
      default: 'black'
    },
    // 自定义标题
    headTitle: {
      type: String,
      default: ''
    },
    isFullScreen: {
      type: Boolean,
      default: false
    },
    // 是否需要顶部状态栏，默认为 true
    isNeedStatusBar: {
      type: Boolean,
      default: true
    },
    isNeedShadow: {
      type: Boolean,
      default: false
    },
    // 自定义返回按钮事件
    onBack: {
      type: Function
    }
  },
  setup(props) {
    console.log('-props-', props)
    const { title } = useHeadTitle(props.headTitle)
    const heightOpts = useHeaderBar(props)
    const { goBack } = useLeftEvent(props.onBack)
    onMounted(() => {})
    return {
      title,
      ...heightOpts,
      goBack
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@height: 41px; // header高度
@statusBarHeight: 20px; // 客户端状态栏预留高度
@imgUrl: '~@/assets/images/common/'; // 图片基础路径
// 基础设计图尺寸 375，蓝湖标准设计图尺寸 750
// @multiple: 0.5;

.header {
  width: 100%;
  border-bottom: 0.5px solid red;
  // border-bottom: 0.5px solid #eee;

  .header-global {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
    height: @height;
    background: #fff;
    font-size: 18px;
    font-family: PingFang-SC-Bold;
    color: #171717;
    text-align: center;
    line-height: @height;
    box-sizing: content-box;

    .left {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
      height: @height;
      padding: 0 20px;

      .icon {
        width: 12px;
        height: 20px;

        &.blackArrows {
          background: url('@{imgUrl}blackLeftArrow.png') no-repeat center;
          background-size: 100% 100%;
        }

        &.whiteArrows {
          background: url('@{imgUrl}whiteLeftArrow.png') no-repeat center;
          background-size: 100% 100%;
        }
      }
    }

    .right {
      position: absolute;
      top: 0;
      right: 20px;
      z-index: 10;
      height: @height;
      font-size: 14px;
    }
  }
}

.header-global {
  &.bottomShadow {
    box-shadow: 4px 4px 10px rgba(250, 248, 248, 0.5);
  }
}
</style>
