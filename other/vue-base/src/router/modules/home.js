const homeRouter = [
    {
        path: '/index',
        name: 'Index',
        component: () => import(/* webpackChunkName: 'index' */ '@/views/index'),
        meta: {
            title: '首页'
        }
    }
]

export default homeRouter
