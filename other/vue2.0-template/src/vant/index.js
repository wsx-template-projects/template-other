/*
 * @Author: wangshengxian
 * @Date: 2020-08-19 09:46:43
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-29 14:58:07
 * @Desc: vant按需引入
 */
import Vue from 'vue'
import {
  List,
  Cell,
  Toast,
  Button,
  Icon,
  Loading,
  Lazyload,
  Field,
  Uploader,
  PullRefresh,
  Tab,
  Tabs,
  Form,
  RadioGroup,
  Radio,
  Dialog,
  CountDown,
  DropdownMenu,
  DropdownItem,
  Popover,
  Popup,
  Stepper,
  DatetimePicker,
  Progress
} from 'vant'

Vue.use(List)
Vue.use(Cell)
Vue.use(Toast)
Vue.use(Button)
Vue.use(Loading)
Vue.use(Lazyload)
Vue.use(Field)
Vue.use(Uploader)
Vue.use(Icon)
Vue.use(PullRefresh)
Vue.use(Tab)
Vue.use(Tabs)

Vue.use(Form)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(DatetimePicker)

Vue.use(Dialog)
Vue.use(CountDown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Popover)
Vue.use(Popup)
Vue.use(Stepper)
Vue.use(Progress)
