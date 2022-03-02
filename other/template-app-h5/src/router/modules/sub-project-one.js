const projectRouter = [
    {
        path: '/index',
        name: 'Index',
        component: () => import(/* webpackChunkName: 'index' */ '@/views/index'),
        meta: {
            title: '首页',
        },
    },
    {
        path: '/demo-list',
        name: 'DemoList',
        component: () => import(/* webpackChunkName: 'demo-list' */ '@/views/demo-list'),
        meta: {
            title: 'demo-list',
        },
    },
    {
        path: '/demo-tab-list',
        name: 'DemoTabList',
        component: () => import(/* webpackChunkName: 'demo-tab-list' */ '@/views/demo-tab-list'),
        meta: {
            title: 'demo-tab-list',
        },
    },
    {
        path: '/upload-file',
        name: 'UploadFile',
        component: () => import(/* webpackChunkName: 'upload-file' */ '@/views/example/upload-file'),
        meta: {
            title: 'upload-file',
        },
    },
]

export default projectRouter
