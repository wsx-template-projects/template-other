const demoRouter = [
    {
        path: '/demo',
        name: 'Demo',
        component: () => import(/* webpackChunkName: 'demo' */ '@/views/demo'),
        meta: {
            title: 'demo'
        }
    }
]

export default demoRouter