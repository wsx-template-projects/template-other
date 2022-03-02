const MAP_PLUGINS = [
    'AMap.ElasticMarker', // 灵活点标记，可以随着地图级别改变样式和大小的 Marker
    'AMap.ToolBar', // 工具条，控制地图的缩放、平移等
    'AMap.Scale', // 比例尺，显示当前地图中心的比例尺
    'AMap.HawkEye', // 鹰眼，显示缩略图
    'AMap.MapType', // 图层切换，用于几个常用图层切换显示
    'AMap.Geolocation', // 定位，提供了获取用户当前准确位置、所在城市的方法
    'AMap.AdvancedInfoWindow', // 高级信息窗体，整合了周边搜索、路线规划功能
    'AMap.OverView',
    'AMap.PolyEditor',
    'AMap.AutoComplete', // 输入提示，提供了根据关键字获得提示信息的功能
    'AMap.PlaceSearch', //地点搜索服务，提供了关键字搜索、周边搜索、范围内搜索等功能
    'AMap.DistrictSearch', //行政区查询服务，提供了根据名称关键字、citycode、adcode 来查询行政区信息的功能
    'AMap.LineSearch', //公交路线服务，提供公交路线相关信息查询服务
    'AMap.StationSearch', //公交站点查询服务，提供途经公交线路、站点位置等信息
    'AMap.Driving', //驾车路线规划服务，提供按照起、终点进行驾车路线的功能
    'AMap.TruckDriving', //货车路线规划
    'AMap.Transfer', //公交路线规划服务，提供按照起、终点进行公交路线的功能
    'AMap.Walking', //步行路线规划服务，提供按照起、终点进行步行路线的功能
    'AMap.Riding', //骑行路线规划服务，提供按照起、终点进行骑行路线的功能
    'AMap.DragRoute', //拖拽导航插件，可拖拽起终点、途经点重新进行路线规划
    'AMap.ArrivalRange', //公交到达圈，根据起点坐标，时长计算公交出行是否可达及可达范围
    'AMap.Geocoder', //地理编码与逆地理编码服务，提供地址与坐标间的相互转换
    'AMap.CitySearch', //城市获取服务，获取用户所在城市信息或根据给定IP参数查询城市信息
    'AMap.IndoorMap', //室内地图，用于在地图中显示室内地图
    'AMap.MouseTool', //鼠标工具插件
    'AMap.CircleEditor', //圆编辑插件
    'AMap.PolygonEditor', //多边形编辑插件
    'AMap.PolylineEditor', //折线编辑器
    'AMap.MarkerCluster', // 点聚合插件
    'AMap.RangingTool', //测距插件，可以用距离或面积测量
    'AMap.CloudDataSearch', //云图搜索服务，根据关键字搜索云图点信息
    'AMap.Weather', //天气预报插件，用于获取未来的天气信息
    'AMap.RoadInfoSearch', //道路信息查询，已停止数据更新，反馈信息仅供参考
    'AMap.HeatMap', //热力图插件
]
