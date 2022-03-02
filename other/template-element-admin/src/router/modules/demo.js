/*
 * demo管理路由模块
 */
import Layout from '@/views/layout'
// demolist
const DemoList = () => import(/* webpackChunkName: 'demoList' */ '@/views/demo/demoList')

const demoRouter = {
    path: '/demo',
    name: 'Demo',
    component: Layout,
    redirect: '/demo/demoList',
    alwaysShow: true,
    meta: {
        title: 'demo管理',
        icon: 'content'
    },
    children: [
        {
            path: 'demoList',
            name: 'DemoList',
            component: DemoList,
            meta: {
                title: 'demoList',
                icon: 'menu'
            }
        }
    ]
}

export default demoRouter
