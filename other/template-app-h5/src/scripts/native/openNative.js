/**
 * js与原生交互方法集合
 * */
import platform from './platform'
import iosBridge from './bridge'

/**
 * 关闭webview
 */
const closeWebview = () => {
    if (platform.isIos) {
        iosBridge.callNativeBridge('navigateBack', '1', null)
        return
    }
    if (platform.isAndroid) {
        window.bridge && window.bridge.close()
        return
    }
}

/**
 * 设置顶部状态栏的颜色显示
 * @param {String} params 1亮色背景、2暗色背景
 */
const setStatusBarColor = params => {
    params = params || 1
    if (platform.isAndroid) {
        // 设置安卓顶部标题栏,0使用h5标题栏，1使用安卓标题栏
        window.bridge && window.bridge.setStatusBarColor(params)
        return
    }
}

/**
 * 设置顶部标题栏
 * @param {String} params 0使用h5标题栏，1使用客户端标题栏, 默认为false
 */
const setHeaderBar = params => {
    params = params || '0'
    if (platform.isIos) {
        // 设置ios顶部标题栏,0使用h5标题栏，1使用ios标题栏
        iosBridge.callNativeBridge('showNavigationBar', params, null)
        iosBridge.callNativeBridge('showBackButton', params, null)
        return
    }
    if (platform.isAndroid) {
        // 设置安卓顶部标题栏,0使用h5标题栏，1使用安卓标题栏
        //   params = params || 0
        window.bridge && window.bridge.showNavigationBar(params)
        return
    }
}

/**
 * js调用客户端 扫码
 */
const scanCode = () => {
    if (platform.isIos) {
        iosBridge.callNativeBridge('scan', '', null)
        return
    }
    if (platform.isAndroid) {
        window.bridge && window.bridge.scanPaymentCode()
        return
    }
}

/**
 * 充值 ==》ios方法recharge
 */
const recharge = () => {
    if (platform.isIos) {
        iosBridge.callNativeBridge('recharge', '', null)
        return
    }
    if (platform.isAndroid) {
        const appName = 'cooix.com.ubank' // android包名
        const downloadUrl = 'https://m.ubex.one/' // 下载地址
        window.bridge && window.bridge.gotoOtherApp(appName, downloadUrl)
        return
    }
}

/**
 * 去支付
 * @param {number} id 购买id
 * @param {number} type 支付类型 type == 1微信支付；2支付宝支付
 */
const goPayment = ({ id, type }) => {
    // console.log('-去支付-', id, type)
    if (platform.isIos) {
        iosBridge.callNativeBridge('goPaymentFunc', { id, type }, null)
        return
    }
    if (platform.isAndroid) {
        // console.log('-bridge-', window.bridge)
        window.bridge && window.bridge.goPaymentFunc(id, type)
        return
    }
}

/**
 * 通用的支付
 * @param {type} 支付类型 type = 1微信支付；2支付宝支付
 */
const goGeneralPay = ({ type, data }) => {
    data = JSON.stringify(data)
    // console.log('-通用支付-', '-type-', type, '-data-', data)
    if (platform.isIos) {
        iosBridge.callNativeBridge('goGeneralPay', { type, data }, null)
        return
    }
    if (platform.isAndroid) {
        // console.log('-android-bridge-', window.bridge, window.bridge.goGeneralPay)
        window.bridge && window.bridge.goGeneralPay(type, data)
        return
    }
}

/**
 * 微信分享
 * @param {object} data {title: '',desc: '',image: '',url: '',type: 4}
 */
const goShare = data => {
    console.log('-去分享-', data)
    if (platform.isIos) {
        iosBridge.callNativeBridge('share', data, null)
        return
    }
    if (platform.isAndroid) {
        data = JSON.stringify(data)
        window.bridge && window.bridge.share(data)
    }
}

/**
 * 保存图片到相册(暂时没有用上,需要和客户端调试一下)
 */
const savePictures = imgUrl => {
    console.log('-保存图片到相册-')
    if (platform.isIos) {
        iosBridge.callNativeBridge('saveImagePictures', imgUrl, () => {
            console.log('-ios回调-', imgUrl)
        })
        return
    }
    if (platform.isAndroid) {
        window.bridge && window.bridge.saveImagePictures(imgUrl)
        return
    }
}

/**
 * h5跳转原生页面，根据type区分
 * @param {number} type == 1实名认证
 */
const openNativePage = type => {
    // openAuthentication ios方法名
    console.log('-native-', type)
    if (platform.isIos) {
        iosBridge.callNativeBridge('openAuthentication', type, null)
        return
    }
    if (platform.isAndroid) {
        window.bridge && window.bridge.openNativePage(type)
        return
    }
}

/**
 * 原生调用js
 * @param {String} jsFnName js提供给app调用的方法名
 * @param {Object} obj vue实例this
 * @param {Function} callback 回调
 */
const nativeCallJs = (jsFnName, obj, callback) => {
    console.log('原生调用了js')
    let vm = obj
    console.log('-jsFnName-', jsFnName, vm)
    if (platform.isIos) {
        iosBridge.registerIosBridge(jsFnName, data => {
            callback(data)
        })
        return
    }
    if (platform.isAndroid) {
        // 将vue组件的方法绑定到window上，提供给android调用
        window[`${jsFnName}`] = vm[`${jsFnName}`]
        return
    }
    console.log('-platform-', platform)
}

export default {
    // 关闭webview
    closeWebview,
    // 设置顶部状态栏颜色
    setStatusBarColor,
    // 设置原生标题栏的隐藏
    setHeaderBar,
    // 扫码
    scanCode,
    // 充值
    recharge,
    // 去支付
    goPayment,
    // 通用支付
    goGeneralPay,
    // 去分享
    goShare,
    // 保存图片到相册
    savePictures,
    // h5打开原生界面
    openNativePage,
    // 原生调用js
    nativeCallJs,
}
