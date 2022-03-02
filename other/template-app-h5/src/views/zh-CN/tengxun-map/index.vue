<!-- 
   腾讯地图
-->
<template>
    <div class="tengxun-map-page">
        <header-bar />
        <div class="page-main">
            <div id="container" style="width: 100%; height: 300px;"></div>
            <!-- <div class="tip">地图正在加载中......</div> -->
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/header-bar'
export default {
    name: 'TengxunMap',
    components: { HeaderBar },
    data() {
        return {
            longitude: 0, //经度
            latitude: 0, //纬度
            city: '',
        }
    },
    computed: {},
    created() {},
    mounted() {
        this.$nextTick(() => {
            this.getMyLocation()
        })
    },
    methods: {
        getCurrPosition() {
            let options = {
                enableHighAccuracy: true, //高精度
                timeout: 5000, //超时时间,以ms为单位
                maximumAge: 24 * 60 * 60 * 1000, //位置缓存时间,以ms为单位
            }
            navigator.geolocation.getCurrentPosition(
                success => {
                    console.log(success.coords) //包含位置的经纬度、速度、海拔、经纬度精度、海拔精度信息
                },
                fail => {
                    console.log(fail) //获取失败的原因
                },
                options,
            )
        },
        // 获取用户当前位置信息
        getMyLocation() {
            // navigator.geolocation.getCurrentPosition(position => {
            //     console.log('position:', position)
            // }, this.showError)
            try {
                console.log('888', window.qq.maps)
                let geo = new window.qq.maps.Geolocation('SBZBZ-EOW3U-XRSV5-2H36I-7K6EF-ZJBGE', 'citypm')
                console.log('geo:', geo)
                geo.getLocation(this.positionSuccess, this.positionError)
            } catch (err) {
                console.log('err:', err)
                this.$toast('定位失败重新开始定位')
                setTimeout(() => {
                    this.getMyLocation()
                }, 2000)
            }
        },
        showError(error) {
            console.log('地理定位失败：', error)
            let errTxt = ''
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errTxt = '定位失败,用户拒绝请求地理定位'
                    break
                case error.POSITION_UNAVAILABLE:
                    errTxt = '定位失败,位置信息是不可用'
                    break
                case error.TIMEOUT:
                    errTxt = '定位失败,请求获取用户位置超时'
                    break
                case error.UNKNOWN_ERROR:
                    errTxt = '定位失败,定位系统失效'
                    break
            }
            this.$toast(errTxt)
        },
        positionSuccess(position) {
            console.log('定位成功', position)
            let toastTxt = `经度: ${position.lng}  纬度: ${position.lat}`
            this.$toast({
                message: toastTxt,
                duration: 3000,
            })
            this.latitude = position.lat
            this.longitude = position.lng
            this.city = position.city
            this.setMap()
        },
        positionError(error) {
            console.log('定位失败', error)
            this.$toast('定位失败')
            this.$dialog
                .confirm({
                    title: '标题',
                    message: '定位失败，是否重新定位',
                })
                .then(() => {
                    this.$toast('重新开始定位')
                    this.getMyLocation()
                })
                .catch(() => {})
        },
        // 第二部分
        //位置信息在地图上展示
        setMap() {
            console.log('99', qq.maps)
            //步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
            //设置地图中心点
            let myLatlng = new window.qq.maps.LatLng(this.latitude, this.longitude)
            //定义工厂模式函数
            let myOptions = {
                zoom: 13, //设置地图缩放级别
                center: myLatlng, //设置中心点样式
                mapTypeId: window.qq.maps.MapTypeId.ROADMAP, //设置地图样式详情参见MapType
            }
            //获取dom元素添加地图信息
            let map = new window.qq.maps.Map(document.getElementById('container'), myOptions)
            //第三部分
            //给定位的位置添加图片标注
            // let marker = new window.qq.maps.Marker({
            //     position: myLatlng,
            //     map: map,
            // })
            //给定位的位置添加文本标注
            let marker = new window.qq.maps.Label({
                position: myLatlng,
                map: map,
                content: '这是哪?',
                // content: '这是我当前的位置，偏差有点大，哈哈',
            })
        },
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
