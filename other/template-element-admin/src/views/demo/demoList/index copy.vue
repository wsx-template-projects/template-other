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
        </div>
    </div>
</template>

<script>
import wsxTips from './wsx-tips'
import http from '@/utils/http'
import imgUpload from '@/components/imgUpload'
export default {
    name: '',
    data() {
        return {
            n: 0,
            currItem: null
        }
    },
    computed: {},
    components: { wsxTips, imgUpload },
    created() {},
    mounted() {
        this.$EventBus.$on('postMessage', message => {
            let stringResult = message.detail.data.split(',')
            if (stringResult[2] == 'ok') {
                this.$EventBus.$emit('connectWifiName', this.currItem)
                this.loading = true
            } else {
                this.loading = false
                this.error = true
                this.timer2 = setTimeout(() => {
                    this.$store.commit('setWifiInfo', this.currItem)
                    this.$parent.status = 2
                }, 2000)
            }
        })
        this.$EventBus.$on('sendIsconnect', isconnect => {
            console.log(isconnect, '777777777')
            if (isconnect == 'ok') {
                this.loading = false
                this.success = true
                this.timer3 = setTimeout(() => {
                    this.success = false
                }, 3000)
            } else if (this.n == 20 || isconnect == 'no') {
                this.loading = false
                this.error = true
                this.timer3 && clearTimeout(this.timer3)
                this.timer2 && clearTimeout(this.timer2)
                this.timer2 = setTimeout(() => {
                    this.$store.commit('setWifiInfo', this.currItem)
                    this.$parent.status = 2
                    this.$parent.destroyedNull()
                }, 2000)
            }
        })
    },
    methods: {
        clickItem(item) {
            sendWSPush(`wifi preconnect ${item.ESSID}`)

            this.timer1 = setInterval(() => {
                sendWSPush(`wifi isconnect ${item.ESSID}`)
                this.n++
            }, 1000)
        }
    }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
