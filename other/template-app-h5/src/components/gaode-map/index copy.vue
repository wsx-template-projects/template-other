<!-- 
   高德地图
-->
<template>
    <div class="amap-page-container">
        <div :style="{ width: '100%', height: '300px' }">
            <div id="map-container" class="amap" ref="mapRef"></div>
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
import AMap from 'vue-amap'
// import AMapLoader from '@amap/amap-jsapi-loader'
export default {
    name: '',
    components: {},
    data() {
        return {
            map: null,
        }
    },
    computed: {},
    beforeCreate() {
        // AMapLoader.load({
        //     key: 'e7456d9e2f3526fcd7c1f438645cfd0e', // 申请好的Web端开发者Key，首次调用 load 时必填
        //     version: '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        //     plugins: ['AMap.Geolocation'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        //     AMapUI: {
        //         // 是否加载 AMapUI，缺省不加载
        //         version: '1.1', // AMapUI 缺省 1.1
        //         plugins: [], // 需要加载的 AMapUI ui插件
        //     },
        //     Loca: {
        //         // 是否加载 Loca， 缺省不加载
        //         version: '1.3.2', // Loca 版本，缺省 1.3.2
        //     },
        // })
        //     .then(AMap => {
        //         this.$nextTick(() => this.initMap(AMap))
        //     })
        //     .catch(e => {
        //         console.error(e)
        //     })
    },

    created() {},
    mounted() {},
    methods: {
        initMap(AMap) {
            console.log('AMap:', AMap)
            console.log('window.map:', window.AMap)
            if (window.AMap) {
                // 初始化vue-amap
                // 或者使用 $refs 获取节点
                // this.map = new AMap.Map(this.$refs.container);
                this.map = new AMap.Map('container', {
                    zoom: 12,
                    center: [116.331398, 39.897445],
                    resizeEnable: true,
                })
                console.log('map:', this.map)
                this.map.on('complete', () => {
                    console.log('地图加载完成')
                })
                this.getLocation(AMap)
            } else {
                this.$toast('暂无法获取定位信息')
            }
        },
        // 获取位置
        getLocation(AMap) {
            AMap.plugin('AMap.Geolocation', () => {
                let geolocation = new AMap.Geolocation({
                    // enableHighAccuracy: true, // 是否获取高精度定位，可能影响效率，默认false
                    // timeout: 10000, // 定位超时时间，ms
                    // needAddress: true, // 是否需要将定位结果进行逆地理编码操作
                    // extensions: 'all', // 是否需要详细的你地理编码信息，默认'base'
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
                    console.log('999')
                    console.log(status)
                    console.log(result)
                })
                // 获取城市信息
                geolocation.getCityInfo(function(status, result) {
                    console.log('city')
                    console.log(status)
                    console.log(result)
                })
            })
        },
        /**
         * 异步同时加载多个插件
         * 还不完善
         */
        syncPluginsLoading(AMap) {
            AMap.plugin(['AMap.ToolBar', 'AMap.Driving'], function() {
                //异步同时加载多个插件
                // var toolbar = new AMap.ToolBar()
                // map.addControl(toolbar)
                var driving = new AMap.Driving() //驾车路线规划
                driving.search(/*参数*/)
            })
        },
        req_post() {},
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.amap-demo {
    height: 300px;
}
</style>
