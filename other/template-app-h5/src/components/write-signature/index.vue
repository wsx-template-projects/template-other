<!--
   签名组件 -- 后续处理
-->
<template>
    <div class="write-signature">
        <div class="content">
            <vue-esign
                class="content-esign"
                ref="esignRef"
                :width="config.width"
                :height="config.height"
                :is-crop="config.isCrop"
                :line-width="config.lineWidth"
                :line-color="config.lineColor"
                :bg-color.sync="config.bgColor"
            />
        </div>
        <div class="footer sg-flexbox align-center">
            <van-button plain type="info" size="large" @click="clearSignature">清除签名</van-button>
            <van-button type="info" size="large" @click="confirmSignature">确认</van-button>
        </div>
    </div>
</template>

<script>
import vueEsign from 'vue-esign' // "vue-esign": "^1.0.5",
export default {
    name: 'WriteSignature',
    components: { vueEsign },
    data() {
        return {
            resultImg: '',
        }
    },
    props: {
        config: {
            type: Object,
            default() {
                return {
                    width: '0',
                    height: '0',
                    lineWidth: 6,
                    lineColor: '#000000',
                    bgColor: '',
                    resultImg: '',
                    isCrop: false,
                }
            },
        },
    },
    computed: {},
    created() {
        this.width = window.innerWidth
        this.height = window.innerHeight - (80 * window.innerWidth) / 375
    },
    mounted() {},
    methods: {
        clearSignature() {
            this.$refs.esignRef.reset()
        },
        confirmSignature() {
            this.$refs.esignRef
                .generate()
                .then(res => {
                    console.log('-write-res-', res)
                    this.resultImg = res
                    // this.$
                })
                .catch(err => {
                    this.$toast('请您先完成签名')
                })
        },
        handleHttpReq() {
            this.$emit('httpRequest', this.resultImg)
        },
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.write-signature {
    height: 100vh;

    .content {
        background: #fff;
    }
    .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 0 16px;
        height: 80px;

        .van-button:first-child {
            margin-right: 13px;
        }
    }
}
</style>
