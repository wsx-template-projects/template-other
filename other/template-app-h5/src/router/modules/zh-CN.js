/**
 * 组件文档说明
 */
const zhCNRouter = [
    {
        path: '/mobile-single-list',
        name: 'MobileSingleList',
        component: () => import(/* webpackChunkName: 'mobile-single-list' */ '@/views/zh-CN/mobile-single-list'),
        meta: {
            title: 'mobile-single-list',
        },
    },
    {
        path: '/mobile-tab-list',
        name: 'MobileTabList',
        component: () => import(/* webpackChunkName: 'mobile-tab-list' */ '@/views/zh-CN/mobile-tab-list'),
        meta: {
            title: 'mobile-tab-list',
        },
    },
    {
        path: '/tengxun-map',
        name: 'TengxunMap',
        component: () => import(/* webpackChunkName: 'tengxun-map' */ '@/views/zh-CN/tengxun-map'),
        meta: {
            title: 'tengxun-map',
        },
    },
    {
        path: '/baidu-map',
        name: 'BaiduMap',
        component: () => import(/* webpackChunkName: 'baidu-map' */ '@/views/zh-CN/baidu-map'),
        meta: {
            title: 'baidu-map',
        },
    },
    {
        path: '/gaode-map',
        name: 'GaodeMap',
        component: () => import(/* webpackChunkName: 'gaode-map' */ '@/views/zh-CN/gaode-map'),
        meta: {
            title: 'gaode-map',
        },
    },
]

export default zhCNRouter
