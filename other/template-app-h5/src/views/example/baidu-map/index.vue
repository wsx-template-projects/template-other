<!-- 
   百度地图案例
-->
<template>
    <div class="">
        百度
        <baidu-map-view ref="baiduMapRef" v-model="mapData" />
    </div>
</template>

<script>
import BaiduMapView from '@/components/baidu-map'
export default {
    name: '',
    components: { BaiduMapView },
    data() {
        return {
            mapData: {},
        }
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        // 地图改变事件
        changeMapData() {
            let el = this.$refs.baiduMapRef
            console.log('el:', el)
            el.initMap().then(res => {
                console.log('res:', res)
                const { address, point } = res
                let { lng, lat } = point
                console.log('lng:', lng, 'lat:', lat)
                if (lng && lat) {
                    let addressStr = `${address.province}${address.city}`
                    let pointStr = ` 经度：${lng}  纬度：${lat}`
                    this.list[0].queryList = [
                        { label: '拍摄地区：', value: addressStr },
                        { label: '经纬度：', value: pointStr },
                    ]
                    console.log('address:', addressStr, lng, lat)
                }
            })
        },
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
