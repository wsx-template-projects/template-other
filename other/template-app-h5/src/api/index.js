/**
 * 单独的某个项目api
 */
import request from '@/scripts/http/request'
import Qs from 'qs'

const root = '/blockchain'

/**
 * 查询所有矿机
 */

export function getMillList() {
    return request({
        url: root + '/mining-machine',
        method: 'get',
        data: {},
    })
}

/**
 * 购买矿机
 */
export function operaBuyMill({ machineId, ...other }) {
    return request({
        url: root + `/member-machine/buy/${machineId}?${Qs.stringify(other)}`,
        method: 'post',
    })
}

/**
 * 查询会员货币资产信息
 */

export function getCoinAsset(data) {
    return request({
        url: root + `/asset/currency?${Qs.stringify(data, { arrayFormat: 'repeat' })}`,
        method: 'get',
    })
}

/**
 * 今日预计收益
 */

export function getTodayEarning() {
    return request({
        url: root + '/machine-profit/expected',
        method: 'get',
        data: {},
    })
}

/**
 * 累计收益
 */

export function getTotalEarning() {
    return request({
        url: root + '/machine-profit/total',
        method: 'get',
        data: {},
    })
}

/**
 * 我的矿机列表
 */
export function getMyMachineList() {
    return request({
        url: root + '/member-machine',
        method: 'get',
        data: {},
    })
}
