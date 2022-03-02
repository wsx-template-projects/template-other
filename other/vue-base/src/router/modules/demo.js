const demoRouter = [
    {
        path: '/watch-demo',
        name: 'WatchDemo',
        component: () => import(/* webpackChunkName: 'watch-demo' */ '@/views/watch-demo'),
        meta: {
            title: 'watch-demo'
        }
    },
    {
        path: '/sync-demo',
        name: 'SyncDemo',
        component: () => import(/* webpackChunkName: 'sync-demo' */ '@/views/sync-demo'),
        meta: {
            title: 'sync-demo'
        }
    },
    {
        path: '/mixins-demo1',
        name: 'MixinsDemo1',
        component: () => import(/* webpackChunkName: 'demo-1' */ '@/views/mixins-demo/demo1.vue'),
        meta: {
            title: 'mixins-demo1'
        }
    },
    {
        path: '/bus-demo',
        name: 'BusDemo',
        component: () => import(/* webpackChunkName: 'bus-demo' */ '@/views/bus-demo/parent'),
        meta: {
            title: 'bus-demo'
        }
    },
    {
        path: '/plugins-demo',
        name: 'PluginsDemo',
        component: () => import(/* webpackChunkName: 'plugins-demo' */ '@/views/plugins-demo'),
        meta: {
            title: 'plugins-demo'
        }
    }
]

export default demoRouter
