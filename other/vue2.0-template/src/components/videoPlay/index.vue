<!--
 * @Author: wangshengxian
 * @Date: 2020-12-25 10:00:24
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-11 17:34:48
 * @Desc: 视频播放 - components
-->
<template>
  <div class="video-play-components">
    <video-player
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
    ></video-player>
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
// import 'videojs-flash'
// import videojs from 'video.js'
// import SWF_URL from 'videojs-swf/dist/video-js.swf'
// videojs.options.flash.swf = SWF_URL // 设置flash路径，Video.js会在不支持html5的浏览中使用flash播放视频文件

// videojs.options.flash.swf = require('videojs-swf/dist/video-js.swf')
export default {
  name: '',
  data() {
    return {
      playerOptions: {
        autoplay: true, // 如果为true,浏览器准备好时开始回放。
        // aspectRatio: '9:16', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        sources: [
          {
            type: 'video/mp4', // 类型
            // type: 'application/x-mpegURL', // 类型
            // type: 'rtmp/flv', // 类型
            src: '' // url地址
          }
        ],
        techOrder: ['html5'],
        // techOrder: ['flash', 'html5'],
        poster: '', // 封面地址
        // width: document.documentElement.clientHeight,
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        flash: { hls: { withCredentials: false } }, // 可以使用rtmp视频
        // flash: { hls: { withCredentials: false }, swf: SWF_URL }, // 可以使用rtmp视频
        html5: { hls: { withCredentials: false } }, // 可以使用m3u8视频
        // notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      }
    }
  },
  props: {
    posterUrl: {
      type: String,
      default: ''
    },
    videoUrl: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 播放实例
    playerObj() {
      return this.$refs.videoPlayer.player
    }
  },
  components: { videoPlayer },
  created() {
    this.$loading.show()
    setTimeout(() => {
      this.$loading.hide()
    }, 500)
  },
  mounted() {
    // 视频格式
    // type："video/webm"   // 可以播放，用ogg也可打开
    // type："video/ogg"    // 可以播放，用webm也可打开
    // type："video/3gp"    // 可以播放
    // type："video/mp4"    // 可以播放
    // type："video/avi"    // 打不开
    // type："video/flv"    // 打不开
    // type："video/mkv"    // 打不开
    // type："video/mov"    // 打不开
    // type："video/mpg"    // 打不开
    // type："video/swf"    // 打不开
    // type："video/ts"     // 打不开
    // type："video/wmv"    // 打不开
    // type："video/vob"    // 没转化
    // type："video/mxf"    // 转化出错
    // type: "video/rm"     // 转化出错
    // 基于vue-video-player的视频播放组件
    // TODO: 注意浏览器的兼容性问题，后面优化，
    this.$nextTick(() => {
      this.videoUrl && (this.playerOptions.sources[0].src = this.videoUrl)
      this.posterUrl && (this.playerOptions.poster = this.posterUrl)
      // console.log('-video-url-', this.videoUrl)
    })
  },
  methods: {
    // 开始播放回调
    onPlayerPlay() {
      console.log('-开始播放-')
    },
    // 开始暂停回调
    onPlayerPause() {
      console.log('-开始暂停-')
    },
    onPlayerEnded() {
      console.log('-播放结束-')
    }
  }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类

// /deep/ .video-player {
//   height: 100%;
//   & > div {
//     height: 100%;
//   }
// }

/deep/ .video-js {
  .vjs-big-play-button {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    // width: 72px;
    // height: 72px;
    // border-radius: 100%;
    // z-index: 100;
    // background-color: #ffffff;
    // border: solid 1px #979797;
  }
}
</style>
