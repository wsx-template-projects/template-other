/*
 * @Author: wangshengxian
 * @Date: 2021-02-01 11:26:01
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-02-01 11:40:44
 * @Desc: 原生调用js -- 事件管理
 */
import platform from './platform'
import iosBridge from './bridge'

// js事件方法对象
const jsMethodObj = {
    // 扫码成功
    scanSuccess,
    // 支付成功
    paySuccess,
}

/**
 * 原生调用js,js提供扫码成功回调方法给原生调用
 * @param {function} callback 回调函数
 */
function scanSuccess(callback) {
    if (platform.isIos) {
        iosBridge.registerIosBridge('getScanResult', data => {
            callback(data)
        })
        return
    }
    if (platform.isAndroid) {
        // 将vue组件的方法绑定到window上，提供给android调用
        window['getScanResult'] = callback.bind(this)
        return
    }
}

/**
 * 原生调用js，js提供支付成功回调方法给原生调用
 * @param {function} callback 回调函数
 */
function paySuccess(callback) {
    if (platform.isIos) {
        iosBridge.registerIosBridge('paymentResult', data => {
            callback(data)
        })
        return
    }
    if (platform.isAndroid) {
        // 将vue组件的方法绑定到window上，提供给android调用
        window['paymentResult'] = callback.bind(this)
        return
    }
}

/**
 * 事件监听
 * @param {string} fnName 事件名
 * @param {function} callback 回调函数
 */
function addEvent(fnName, callback) {
    jsMethodObj[fnName] && jsMethodObj[fnName](callback)
}

/**
 * js自定义事件对象
 */
export default {
    addEvent,
}
