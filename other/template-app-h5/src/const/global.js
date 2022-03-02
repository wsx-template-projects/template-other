/**
 * 项目线上访问根路径地址
 */
export const projectUrl = (() => {
    let urls = {
        test: 'http://tapi.whkuaiyu.com/livemember',
        prod: 'http://live.whkuaiyu.com:8888/livemember',
    }
    return process.env.VUE_APP_SERVER_ENV === 'prod' ? urls.prod : urls.test
})()

/**
 * 图片、视频资源线上访问基础路径
 */
export const baseResourceUrl = 'http://video.whkuaiyu.com/h5'

/**
 * 视频资源根路径
 */
export const videoRootFile = '/video'

/**
 * banner 图片资源根路径
 */
export const bannerRootFile = '/banner'

/**
 * 2021年活动页资源根路径
 */
export const activity2021RootFile = '/2021'

/**
 * 其它资源根路径
 */
export const otherRootFile = '/other'

/**
 * 打开 ios TestFlight 地址
 */
export const testFlightUrl = 'https://apps.apple.com/us/app/testflight/id899247664'

/**
 * ios TestFlight 点击下载地址 (注意只有在ios testFlight 账号更换的情况下才会更换该地址)
 */
export const iosTestFlightDownloadUrl = 'https://testflight.apple.com/join/btwWsIoD'

/**
 * app下载页地址
 */
export const appDownloadUrl = (() => {
    let urls = {
        test: 'http://twww.tangseng.io/download/index.html',
        prod: 'http://down.tangseng.io/download/index.html',
    }
    return process.env.VUE_APP_SERVER_ENV === 'prod' ? urls.prod : urls.test
})()

/**
 * 唤起客户端app协议url
 */
export const protocolHead = {
    android: 'app://com.xinxin.tangseng',
    ios: 'tangsengLive://',
}

/**
 * 手机号前缀
 */
export const prefixOptions = [
    { value: '+86', text: '+86' }, // 中国大陆
    { value: '+852', text: '+852' }, // 中国香港
    { value: '+886', text: '+886' }, // 中国台湾
    { value: '+853', text: '+853' }, // 中国澳门
    { value: '+60', text: '+60' }, // 马来西亚
    { value: '+1', text: '+1' }, // 美国
    { value: '+81', text: '+81' }, // 日本
    { value: '+82', text: '+82' }, // 韩国
    { value: '+66', text: '+66' }, // 泰国
    { value: '+84', text: '+84' }, // 越南
    { value: '+62', text: '+62' }, // 印度尼西亚
    { value: '+65', text: '+65' }, // 新加坡
    { value: '+61', text: '+61' }, // 澳大利亚
]

/**
 * 提现身份认证 ==> 3010 3011 3012 3013
 */
export const withdrawAuthObj = {
    3010: { btnTxt: '去认证', message: '今日累计提现小于等于1万TF或10万TST，请完成身份认证和高级认证' },
    3011: { btnTxt: '去认证', message: '今日累计提现小于等于1万TF或10万TST，请完成身份认证和高级认证' },
    3012: { btnTxt: '去认证', message: '今日累计提现大于1万TF或10万TST，请完成视频认证' },
    3013: { btnTxt: '确认', message: '今日累计提现已达到单日提取上限，请明天再来提现吧' },
}
