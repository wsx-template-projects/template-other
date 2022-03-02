<!--
   百度地图
-->
<template>
    <div class="baidu-map-components">
        <baidu-map id="myMap" @ready="handleReady" />
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
        return {
            // 北京市经纬度
            mapOptions: [116.331398, 39.897445],
        }
    },
    props: {
        value: {
            type: Object,
            default() {
                return {}
            },
        },
        zoom: {
            type: Number,
            default: 12,
        },
    },
    computed: {
        mapData: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            },
        },
    },
    created() {},
    mounted() {},
    methods: {
        initMap(callback) {
            return new Promise((resolve, reject) => {
                let map = new BMap.Map('myMap')
                // console.log('-map-', map)
                let mapPoint = new BMap.Point(this.mapOptions)
                map.centerAndZoom(mapPoint, this.zoom)
                let geolocation = new BMap.Geolocation()
                geolocation.getCurrentPosition(r => {
                    console.log('-init-r-', r)
                    resolve(r)
                })
            })
        },
        handleReady({ BMap, map }) {
            console.log('-bmap-', BMap, '-map-', map)
            let point = new BMap.Point(this.mapOptions)
            map.centerAndZoom(point, this.zoom)
            let geolocation = new BMap.Geolocation()
            geolocation.getCurrentPosition(r => {
                console.log('-r-', r)
                this.mapData = r
            })
        },
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
