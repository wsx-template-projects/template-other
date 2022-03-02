const DemoApiRouter = [
    {
        path: '/api-data',
        name: 'ApiData',
        component: () => import(/* webpackChunkName: 'api-data' */ '@/views/demo-api/api-data'),
        meta: {
            title: 'api-data',
        },
    },
    {
        path: '/api-computed',
        name: 'ApiComputed',
        component: () => import(/* webpackChunkName: 'api-computed' */ '@/views/demo-api/api-computed'),
        meta: {
            title: 'api-computed',
        },
    },
    {
        path: '/api-watch',
        name: 'ApiWatch',
        component: () => import(/* webpackChunkName: 'api-watch' */ '@/views/demo-api/api-watch'),
        meta: {
            title: 'api-watch',
        },
    },
    {
        path: '/api-hooks',
        name: 'ApiHooks',
        component: () => import(/* webpackChunkName: 'api-hooks' */ '@/views/demo-api/api-hooks'),
        meta: {
            title: 'api-hooks',
        },
    },
]

export default DemoApiRouter
