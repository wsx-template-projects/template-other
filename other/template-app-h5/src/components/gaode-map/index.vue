<!-- 
   高德地图
-->
<template>
    <div class="amap-page-container">
        <!-- <el-button @click="drawPolygon">开始绘制</el-button> -->
        <div class="amap-wrapper">
            <el-amap class="amap-box" vid="amap-vue" :center="center" :events="events" :amap-manager="amapManager">
                <!-- <el-amap-marker :position="center"></el-amap-marker> -->
            </el-amap>
        </div>
    </div>
</template>
<script>
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap'
import VueAMap from 'vue-amap'
let amapManager = new AMapManager()
export default {
    data() {
        let _self = this
        return {
            map: null,
            mouseTool: null,
            center: [116.39, 39.9],
            events: {
                init(o) {
                    console.log('o:', o)
                    lazyAMapApiLoaderInstance.load().then(() => {
                        // your code ...
                        // this.map = new AMap.Map("amapContainer", {
                        //   center: new AMap.LngLat(121.59996, 31.197646),
                        // });
                        _self.initMap()
                    })
                },
            },
            amapManager: amapManager,
        }
    },
    methods: {
        //初始化地图
        initMap() {
            //获取地图的实例
            let map = amapManager.getMap()
            //保存地图实例
            this.map = map
            //   创建一个 Marker 实例：
            //   var marker = new AMap.Marker({
            //     position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            //     title: "北京",
            //   });

            //   //   将创建的点标记添加到已有的地图实例：
            //   this.map.add(marker);
            // console.log('AMap', AMap)
            // console.log('AMap', AMap.MouseTool)
        },
        draw() {
            // mouseTool.rectangle({
            //     fillColor: '#00b0ff',
            //     strokeColor: '#80d8ff',
            //     //同Polygon的Option设置
            // })
        },
        // 绘制多边形
        drawPolygon() {
            console.log('开始')
            // var mouseTool = new AMap.MouseTool(this.map)
            // //监听draw事件可获取画好的覆盖物
            // var overlays = []
            // mouseTool.on('draw', function(e) {
            //     console.log(e)
            //     overlays.push(e.obj)
            // })
            // mouseTool.rectangle({
            //     fillColor: '#00b0ff',
            //     strokeColor: '#80d8ff',
            //     //同Polygon的Option设置
            // })
            // this.mouseTool = mouseTool
        },
    },
}
</script>
<style scoped>
.amap-wrapper {
    /* width: 500px; */
    width: 100%;
    height: 500px;
}
</style>
