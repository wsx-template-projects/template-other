import request from '@/utils/service'

export function getDemo(data) {
    return request({
        // url: 'wechat/port/receiveUserEncryptInfo',
        url: 'wechat/port/redirect',
        method: 'post',
        data,
    })
}

export function getToken(data) {
    return request({
        url: 'wechat/port/receiveUserEncryptInfo',
        method: 'post',
        data,
    })
}
