<!-- 
   动态生成二维码
-->
<template>
    <div class="qrcode" v-show="imgUrl">
        <img :src="imgUrl" alt="" />
    </div>
</template>

<script>
import qrCode from 'qrcode'
export default {
    name: '',
    data() {
        return {
            imgUrl: '',
        }
    },
    props: {
        // 二维码地址
        url: {
            type: String,
            default: '',
        },
    },
    watch: {
        url(val) {
            console.log('-val-', val)
            if (val) {
                this.getData(val)
            }
        },
    },
    computed: {},
    components: {},
    created() {},
    mounted() {},
    methods: {
        getData(data) {
            qrCode
                .toDataURL(data)
                .then(res => {
                    console.log('-res-', res)
                    this.imgUrl = res
                })
                .catch(err => {
                    console.log('-err-', err)
                })
        },
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
