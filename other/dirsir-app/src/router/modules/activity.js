const activityRouter = [
  {
    path: '/activity',
    name: 'Activity',
    component: () => import(/* webpackChunkName: 'activity' */ '@/views/activity'),
    meta: {
      title: '活动页'
    }
  }
]

export default activityRouter
