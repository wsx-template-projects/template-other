import { mock } from 'mockjs'

// mock语法
//  '@date('yyyy-MM-dd)'
//  '@name'
//  '@string(number,10)'

export default [
    {
        api: '/mock/tab-list',
        method: 'get',
        description: 'mockTab列表数据',
        onMock(params) {
            console.log('params :>> ', params)
            return mock({
                code: 200,
                'data|30': [
                    {
                        'itemId|+1': 1,
                        itemTitle: '商品名',
                        itemDesc: '商品描述',
                        itemPrice: '126.0',
                        itemImg: '',
                    },
                ],
            })
        },
    },
]
