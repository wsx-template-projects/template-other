import Layout from '@/views/layout'

const chartRouter = {
    path: '/chart',
    name: 'Chart',
    component: Layout,
    alwaysShow: true,
    redirect: 'chart/chart-one',
    meta: {
        title: '图表管理',
        icon: 'content'
    },
    children: [
        {
            path: '/chart-one',
            name: 'ChartOne',
            component: () => import(/* webpackChunkName: 'chart-one' */ '@/views/chart/chart-one'),
            meta: {
                title: '图表一',
                icon: 'menu'
            }
        }
    ]
}

export default chartRouter
