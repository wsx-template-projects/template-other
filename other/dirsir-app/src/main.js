import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { List, Cell, Toast, Button, Loading, Dialog, Popup, Form, Field } from 'vant'

// 全局样式
import '@/styles/index.less'
import 'normalize.css/normalize.css'
// 路由守卫
import '@/utils/routerGuards.js'
// vconsole调试工具
import '@/utils/vconsole.js'
// rem适配
import '@/utils/flexible.js'

createApp(App)
  .use(List)
  .use(Cell)
  .use(Toast)
  .use(Button)
  .use(Loading)
  .use(Dialog)
  .use(Popup)
  .use(Form)
  .use(Field)
  .use(store)
  .use(router)
  .mount('#app')
