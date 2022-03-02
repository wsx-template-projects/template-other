/**
 * 单独的某个项目api
 */
import request from '@/scripts/http/request'

const root = '/api'

/**
 * home列表
 */
export function getHomeList() {
    return request({
        url: root + '/home/list',
        method: 'get',
        data: {}
    })
}
