<!--
   demolist
-->
<template>
    <div class="page">
        demo-list
        <div class="main">
            <img-upload v-model="imgList" />
            <wsx-tips txt="tips显示" />
            <wsx-tips txt="tips--------显示" />

            <input type="file" ref="upload" accept=".xls,.xlsx" />
            <!-- <video id="videoPlayer" class="video-js" muted></video> -->

            <div class="videoWrap">
                <div class="videoContent">
                    <div class="videoBox">
                        <!-- <video
                            id="my-player"
                            class="video-js"
                            x5-video-player-type="h5-page"
                            x5-video-player-fullscreen="true"
                            x5-video-orientation="landscape"
                            :src="videoSrc"
                        ></video> -->
                        <!-- <video
                            id="myVideo"
                            width="500"
                            height="250"
                            class="video-js vjs-default-skin vjs-big-play-centered"
                            controls
                            preload="auto"
                            data-setup="{}"
                        >
                            <source id="source" :src="videoSrc" type="application/x-mpegURL" />
                        </video> -->

                        <!-- <video id="videoPlayer" class="video-js" muted></video> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import JsEncrypt from 'jsencrypt'
import wsxTips from './wsx-tips'
import imgUpload from '@/components/imgUpload'
import Videojs from 'video.js' // 引入Videojs
import { readWorkbookFromLocalFile } from '@/scripts/utils/excelJS'
export default {
    name: '',
    data() {
        return {
            imgList: [],
            timer1: null,
            timer2: null,
            videoSrc: 'http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8'
        }
    },
    computed: {
        // throttleFunc () {
        //     return tools.throttle('目标函数','时间间隔')
        //     // 调用方式 ==》 this.throttleFunc()
        // }
    },
    components: { wsxTips, imgUpload },
    created() {
        // const obj = {
        //     list: [1,2] // 手动设置 list: null
        // }
        // const {list = []} = obj
        // const obj = {
        //     name: '魏团兵',
        //     idnum: '410425199005155519',
        //     username: '13371769970',
        //     zwwUserId: '8afac2ed5b4ddc4601'
        // }
        // const en = this.getRSApass(obj)
        // console.log('en :>> ', en)
        // const de = this.decrptCode(
        //     'SuAsh/RGd2zpw+YLOf2qqMfsQk6MIEuKW2KGa9uFvJX8HkJMQ3ZsSGnBgY1Lvw2moSwaFMeZMucyFHSlUEAyqTGBEt1vNwZSgBUrVawYjlhdF3A7e0hvi6X/YYsza8dXL5WW7aMw89o9MHCgr7QqdBHYOz0duUBpxfNEhQJETNY='
        // )
        // console.log('de :>> ', de)
    },
    mounted() {
        let data = {
            id: 1,

            children: [
                { id: 11 },
                {
                    id: 12,

                    children: [
                        {
                            id: 111,

                            children: [
                                {
                                    id: 1111
                                }
                            ]
                        },
                        {
                            id: 112
                        }
                    ]
                }
            ]
        }
        let list = this.deepTree(data.children, 1)
        console.log('-list-', list)

        this.$refs.upload.addEventListener('change', e => {
            //绑定监听表格导入事件
            readWorkbookFromLocalFile(e)
            console.log('e :>> ', e)
            // const workbook = readXLSX(e.target.files[0]).then(res => {
            //     console.log('res :>> ', res)
            // })
            // console.log(workbook)
        })
    },
    methods: {
        getRSApass(password) {
            console.log('jsEncrypt :>> ', JsEncrypt)
            let jse = new JsEncrypt()
            console.log('jse :>> ', jse)
            //公钥
            let publicString =
                'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbZvyEkRmB3wYrxKRob0YxyjC4TcbpOxQ4sXt6soeyc6AB9RncSbP9y7WYv9bfdeEZVW7Ij8f3knjmlUbzBr4usy9WH6aFLvLt6KjWQ3H/pRHN8W/+8BoOQEr3v120miNY2Uz9aIoE9BMYHQatcihIVfT1NdGGqPZtyLTts8oijwIDAQAB'

            jse.setPublicKey(publicString)
            // 加密内容
            let encrypted = jse.encrypt(password)
            return encrypted
        },
        decrptCode(password) {
            let encrypt = new JsEncrypt()
            let publicString =
                'MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAJtm/ISRGYHfBivEpGhvRjHKMLhNxuk7FDixe3qyh7JzoAH1GdxJs/3LtZi/1t914RlVbsiPx/eSeOaVRvMGvi6zL1YfpoUu8u3oqNZDcf+lEc3xb/7wGg5ASve/XbSaI1jZTP1oigT0ExgdBq1yKEhV9PU10Yao9m3ItO2zyiKPAgMBAAECgYBKGRwU1d70tvQJUJUYGt68hO0gJC3RLdNhiPcYtSHQ7CMCa+0txZLmVAi90dNR77IqUzsktLIjkRrGz6zp2nA5sz6+lozZl98YEAFuFNKFuvxeWxCd+x+Wjy2gseeIn01LJ6g41eDrsj6wOA1Q1glbXITBNtRuZb4cY+PIqUJ3mQJBANrEmVm9VfiZSMdNPIlZ6ojxO0RAA771eDiVS/zNXN+P8+DJ80gsZUrBrNuMeyCCoH01MDwIG9Vs2uTqXeMBSHsCQQC12aMtlJLVHmhHAWL3wJWmhsj2jKKk2IPrP4ogXQWkyPfTXXUmOaWRENgAgiCpZql+jSS425otGWd8uRVKrzP9AkBLk9nqr8dwn/wNpnhAd0jYUIaKGJdytDj5S1K6HnR0Y7X8NaiPiY7g2bIPEyRCYf5x4xsr0h1TiUzCAtm2n+3bAkACtgDhwBJETRS+4j1odh2FAwNh8YzHKlclHahgfSKFZ12ScBU8AaX/OKIPt+DmxZoHQfFnNBbjTzqkuFmh6GS9AkANhZl6NnEsvvmv9LnhsuhkKIyR3ks6AYWVOuY2t8HdeurNBVrWc76bWPztBrbFnnMTUHs6TXDrugvfX82oVBhV'

            encrypt.setPrivateKey(publicString)
            console.log('encrypt :>> ', encrypt)
            let data = encrypt.decrypt(password)
            return data
        },
        changeFile(file) {
            console.log('file :>> ', file)
            readWorkbookFromLocalFile(file)
        },
        deepTree(list, leval = 1) {
            let result = []
            let currLeval = leval
            list.forEach(item => {
                let temp = { ...item }
                temp.leval = leval
                console.log('-item-', temp, temp.children)
                if (temp.children && temp.children.length > 0) {
                    temp.children = this.deepTree(temp.children, currLeval + 1)
                }
                result.push(temp)
            })
            return result
        },

        initVideo(videoUrl) {
            // 这些options属性也可直接设置在video标签上，见 muted
            let options = {
                autoplay: true, // 设置自动播放
                controls: true, // 显示播放的控件
                sources: [
                    // 注意，如果是以option方式设置的src,是不能实现 换台的 (即使监听了videoUrl也没实现)
                    {
                        src: videoUrl,
                        type: 'application/x-mpegURL' // 告诉videojs,这是一个hls流
                    }
                ]
            }
            // videojs的第一个参数表示的是，文档中video的id
            console.log('video-obj:', Videojs)
            let videoEl = document.getElementById('videoPlayer')
            console.log('videoEl :>> ', videoEl)
            const myPlyer = Videojs(videoEl, options, function onPlayerReady() {
                console.log('onPlayerReady 中的this指的是：', this) // 这里的this是指Player,是由Videojs创建出来的实例
                console.log(myPlyer === this) // 这里返回的是true
            })
        }
    }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
