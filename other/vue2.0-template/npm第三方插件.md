### npm 模块

```json
{
  "dependencies": {
    "vue-clipboard2": "^0.3.1",
    "qrcode": "^1.4.4",
    "vue-video-player": "^5.0.2",
    "flv.js": "^1.5.0",
    "videojs-contrib-hls": "^5.15.0",
    "videojs-flash": "^2.2.1"
  },
  "devDependencies": {
    "url-loader": "^4.1.1"
  }
}
```

#### 第三方插件(所需的模块需要自行安装，没有用上的不必考虑，)

- vue-clipboard2 (复制插件)

  ```bash

  # html
    <div
      v-clipboard:copy="infoData.currencyAddress"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
      class="copyBtn"
    >
      复制地址
    </div>

  # js
    methods: {
      onCopy() {
        this.$toast('复制成功')
      },
      onError() {
        this.$toast('复制失败')
      },
    }

  ```

* html2canvas (画图)

  ```bash

    # html
      <div class="screenShot" v-if="dialogImgVis">
        <img :src="imgUrl" alt="" />
      </div>

    #js
    methods: {
      screenShotHandle() {
        html2canvas(this.$refs.indexWrapper).then(canvas => {
          this.dialogImgVis = true
          console.log(canvas)
          let dataUrl = canvas.toDataURL('image.png')
          console.log(dataUrl)
          this.imgUrl = dataUrl
          setTimeout(() => {
            this.dialogImgVis = false
          }, 2000)
        })
      }
    }

  ```
