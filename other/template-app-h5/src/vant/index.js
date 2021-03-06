/* 后期优化：手动把不需要用到的组件注释掉 */

import Vue from 'vue'
import {
    ActionSheet,
    AddressEdit,
    AddressList,
    Area,
    Button,
    Calendar,
    Card,
    Cell,
    CellGroup,
    Checkbox,
    CheckboxGroup,
    Circle,
    Col,
    Collapse,
    CollapseItem,
    ContactCard,
    ContactEdit,
    ContactList,
    CountDown,
    Coupon,
    CouponCell,
    CouponList,
    DatetimePicker,
    Dialog,
    Divider,
    DropdownItem,
    DropdownMenu,
    Empty,
    Field,
    Form,
    GoodsAction,
    GoodsActionButton,
    GoodsActionIcon,
    Grid,
    GridItem,
    Icon,
    Image,
    ImagePreview,
    IndexAnchor,
    IndexBar,
    Info,
    Lazyload,
    List,
    Loading,
    Locale,
    NavBar,
    NoticeBar,
    Notify,
    NumberKeyboard,
    Overlay,
    Pagination,
    Panel,
    PasswordInput,
    Picker,
    Popup,
    Progress,
    PullRefresh,
    Radio,
    RadioGroup,
    Rate,
    Row,
    Search,
    Sidebar,
    SidebarItem,
    Skeleton,
    Sku,
    Slider,
    Step,
    Stepper,
    Steps,
    Sticky,
    SubmitBar,
    Swipe,
    SwipeItem,
    Switch,
    SwitchCell,
    Tab,
    Tabbar,
    TabbarItem,
    Tabs,
    Tag,
    Toast,
    TreeSelect,
    Uploader,
} from 'vant'
import './rewrite/index.less'

// setDefault()

Vue.use(ActionSheet)
Vue.use(AddressEdit)
Vue.use(AddressList)
Vue.use(Area)
Vue.use(Button)
Vue.use(Calendar)
Vue.use(Card)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Circle)
Vue.use(Col)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(ContactCard)
Vue.use(ContactEdit)
Vue.use(ContactList)
Vue.use(CountDown)
Vue.use(Coupon)
Vue.use(CouponCell)
Vue.use(CouponList)
Vue.use(DatetimePicker)
Vue.use(Dialog)
Vue.use(Divider)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Empty)
Vue.use(Field)
Vue.use(Form)
Vue.use(GoodsAction)
Vue.use(GoodsActionButton)
Vue.use(GoodsActionIcon)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Icon)
Vue.use(Image)
Vue.use(ImagePreview)
Vue.use(IndexAnchor)
Vue.use(IndexBar)
Vue.use(Info)
Vue.use(Lazyload)
Vue.use(List)
Vue.use(Loading)
Vue.use(Locale)
Vue.use(NavBar)
Vue.use(NoticeBar)
Vue.use(Notify)
Vue.use(NumberKeyboard)
Vue.use(Overlay)
Vue.use(Pagination)
Vue.use(Panel)
Vue.use(PasswordInput)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(Progress)
Vue.use(PullRefresh)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Rate)
Vue.use(Row)
Vue.use(Search)
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(Skeleton)
Vue.use(Sku)
Vue.use(Slider)
Vue.use(Step)
Vue.use(Stepper)
Vue.use(Steps)
Vue.use(Sticky)
Vue.use(SubmitBar)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Switch)
Vue.use(SwitchCell)
Vue.use(Tab)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Tabs)
Vue.use(Tag)
Vue.use(Toast)
Vue.use(TreeSelect)
Vue.use(Uploader)

/**
 * 默认值处理
 */
// function setDefault() {
//     /* Toast */
//     Toast.setDefaultOptions('loading', {
//         message: '加载中...',
//         forbidClick: true,
//         duration: 0,
//     })
//     Toast.setDefaultOptions = function() {
//         setTimeout(() => {
//             throw new Error('Toast.setDefaultOptions 功能被禁用（只能集中处理）')
//         })
//     }
//     Toast.resetDefaultOptions = function() {
//         setTimeout(() => {
//             throw new Error('Toast.resetDefaultOptions 功能被禁用')
//         })
//     }
// }
