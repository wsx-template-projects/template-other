<!-- 
   高德地图
-->
<template>
    <div class="amap-page-container">
        <div :style="{ width: '100%', height: '300px' }">
            <!-- <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center"> </el-amap> -->
            <el-amap ref="skyeye_map" vid="skyeye_amapDemo" id="amapContainer"> </el-amap>
            <el-amap
                id="container"
                class="vueAmap"
                vid="amapEdit"
                :zoom="amap.zoom"
                :center="amap.center"
                :plugin="amap.plugin"
                :events="amap.events"
                :amap-manager="amap.amapManager"
            >
            </el-amap>
        </div>

        <!-- <div class="toolbar">
            <span v-if="loaded"> location: lng = {{ lng }} lat = {{ lat }} </span>
            <span v-else>正在定位</span>
        </div>
        <div v-on:click="req_post()">
            查询周边
        </div> -->
    </div>
</template>

<script>
import VueAMap from 'vue-amap'
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap'
let amapManager = new AMapManager() //获取高德原生 AMap.Map
export default {
    name: '',
    components: {},
    data() {
        let _self = this
        return {
            amap: {
                zoom: '16',
                // 北京市经纬度
                center: [116.331398, 39.897445],
                // 上海市经纬度
                // center: [121.59996, 31.197646],
                plugin: [
                    {
                        enableHighAccuracy: true, //是否使用高精度定位，默认:true
                        timeout: 100, //超过10秒后停止定位，默认：无穷大
                        maximumAge: 0, //定位结果缓存0毫秒，默认：0
                        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                        showButton: true, //显示定位按钮，默认：true
                        buttonPosition: 'RB', //定位按钮停靠位置，默认：'LB'，左下角
                        showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
                        showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
                        panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
                        extensions: 'all',
                        pName: 'Geolocation',
                    },
                ],
                events: {
                    init(o) {
                        console.log('o:', o)
                        lazyAMapApiLoaderInstance.load().then(() => {
                            console.log('999')
                            _self.initMap()
                        })
                        // const map = new aMap.map('container', {})
                        // console.log('map:', map)
                        // o 是高德地图定位插件实例
                        // o.getCurrentPosition((status, result) => {
                        //     console.log(result)
                        //     // if (result && result.position) {
                        //     //     self.lng = result.position.lng
                        //     //     self.lat = result.position.lat
                        //     //     self.center = [self.lng, self.lat]
                        //     //     self.loaded = true
                        //     //     self.$nextTick()
                        //     // }
                        // })
                    },
                    click(e) {
                        console.log('e:', e)
                    },
                },
                amapManager: amapManager,
            },
            map: null,
            // lng: 0,
            // lat: 0,
            // loaded: false,
            // plugin: [
            //     {
            //         enableHighAccuracy: true, //是否使用高精度定位，默认:true
            //         timeout: 100, //超过10秒后停止定位，默认：无穷大
            //         maximumAge: 0, //定位结果缓存0毫秒，默认：0
            //         convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            //         showButton: true, //显示定位按钮，默认：true
            //         buttonPosition: 'RB', //定位按钮停靠位置，默认：'LB'，左下角
            //         showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
            //         showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
            //         panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
            //         zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
            //         extensions: 'all',
            //         pName: 'Geolocation',
            //         events: {
            //             init(o) {
            //                 console.log('o:', o)
            //                 // o 是高德地图定位插件实例
            //                 o.getCurrentPosition((status, result) => {
            //                     console.log(result)
            //                     if (result && result.position) {
            //                         self.lng = result.position.lng
            //                         self.lat = result.position.lat
            //                         self.center = [self.lng, self.lat]
            //                         self.loaded = true
            //                         self.$nextTick()
            //                     }
            //                 })
            //             },
            //         },
            //     },
            // ],
            // mapEvents: {
            //     init(o) {
            //         lazyAMapApiLoaderInstance.load().then(() => {
            //             o.setMapStyle('amap://styles/grey') //自定义的高德地图的样式，我选的是马卡龙
            //             $this.hasDom = true
            //         })
            //     },
            // },
        }
    },
    computed: {},
    created() {},
    mounted() {
        // console.log('999:', lazyAMapApiLoaderInstance)
        // lazyAMapApiLoaderInstance.load().then(() => {
        //     this.map = new AMap.Map('amapContainer', {
        //         center: new AMap.LngLat(this.center),
        //     })
        //     console.log('map:', map)
        // })
    },
    methods: {
        initMap() {
            let map = amapManager.getMap()
            //保存地图实例
            this.map = map
            console.log('map:', map)
            console.log('AMap:', AMap)
            this.getLocation()
        },
        // 获取位置
        getLocation() {
            let geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, //是否使用高精度定位，默认:true
                timeout: 100, //超过10秒后停止定位，默认：无穷大
                maximumAge: 0, //定位结果缓存0毫秒，默认：0
                convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true, //显示定位按钮，默认：true
                buttonPosition: 'RB', //定位按钮停靠位置，默认：'LB'，左下角
                showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
                extensions: 'all',
                pName: 'Geolocation',
            })
            console.log('geolocation:', geolocation)
            this.map.addControl(geolocation)
            // 获取精确位置
            geolocation.getCurrentPosition(function(status, result) {
                console.log('精准定位')
                console.log(status)
                console.log(result)
            })
            // 获取城市信息
            geolocation.getCityInfo(function(status, result) {
                console.log('获取城市信息')
                console.log(status)
                console.log(result)
            })
        },
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.amap-demo {
    height: 300px;
}
</style>
