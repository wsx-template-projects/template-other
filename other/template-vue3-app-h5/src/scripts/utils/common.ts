import { formatNumber } from 'sharegood-cloud-utils'

/**
 * 将一位地址数组转为树结构
 * @param data
 * @returns
 */
export const arrayToTree = function(data: any = []) {
    const map: any = {}
    const result: any = []

    data.forEach((item: any) => {
        const key = item.id
        map[key] = {
            label: item.name,
            value: item.id,
            pId: item.pId,
        }
    })

    data.forEach((item: any) => {
        const pId = item.pId
        if (pId && map[pId]) {
            map[pId].children = map[pId].children || []
            map[pId].children.push(map[item.id])
        }
    })
    Object.keys(map).forEach(key => {
        if (map[key]['pId'] == '0' || map[key]['pId'] == undefined) {
            result.push(map[key])
        }
    })
    return result
}

/**
 * 获取常量配置
 * @param constants
 * @param key
 * @returns array
 */
export const getConstants = function(constants: any = [], key: any): [] {
    const result = constants.filter((item: any) => {
        return item.key === key
    })
    console.log(1, constants, key, result)
    if (result[0]) {
        return result[0].options || []
    } else {
        return []
    }
}
/**
 * url重定向
 * @param uri
 */
export const redirectTo = function(uri: string): void {
    const isHash = location.href.indexOf('#') > -1
    let BASE_URL = process.env.BASE_URL
    BASE_URL = BASE_URL.substring(0, BASE_URL.length - 1)
    if (isHash) {
        location.href = location.origin + '/#' + uri
    } else {
        location.href = BASE_URL + uri
    }
}
export const reduceTableFields = function(config = []) {
    config = Array.isArray(config) ? config : [config]
    const fields = [
        {
            label: '企业名',
            prop: 'entname',
            width: '200px',
            render: (h: any, context: any) => {
                const { row } = context
                return [
                    h(
                        'a',
                        {
                            class: 'sg-link el-button--text',
                            attrs: {
                                target: '_blank',
                                href: row.detailUrl,
                            },
                        },
                        row.entname,
                    ),
                ]
            },
        },

        {
            label: '注册资金',
            prop: 'regCap',

            render: (h: any, context: any) => {
                const { row } = context
                //console.log(row.gridState, this.$const)
                return formatNumber(row.regCap)
            },
        },
    ]
    let result: any = []
    config.forEach((value: any) => {
        if (typeof value === 'string') {
            let target = fields.filter(item => item.prop === value)[0]
            result.push(target)
        } else if (value.key) {
            let { key, ...rest } = value
            let target = fields.filter(item => item.prop === key)[0]
            result.push({
                ...target,
                ...rest,
            })
        }
    })

    return result.filter((item: any) => item)
}
