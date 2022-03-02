# 单列表组件

## 基本使用

:::demo

```html
<template>
    <div class="mobile-single-list">
        <header-bar />
        <div class="page-main">
            <single-list
                :is-loading.sync="isMoreLoading"
                :is-error.sync="isMoreError"
                :list="list"
                :total="total"
                :page-num.sync="pageNum"
                @load="handleLoading"
            >
                <template v-slot="{ item }">
                    <div class="item">
                        {{ item }}
                    </div>
                </template>
            </single-list>
        </div>
    </div>
</template>

<script>
    // import HeaderBar from '@/components/header-bar'
    // import SingleList from '@/components/global/single-list'
    export default {
        name: 'MobileSingleList',
        // components: { HeaderBar, SingleList },
        data() {
            return {
                count: 1,
                pageNum: 1,
                pageSize: 10,
                isMoreLoading: false,
                isMoreError: false,
                total: 0,
                list: [],
                resData: {},
            }
        },
        computed: {},
        created() {
            // todo: 当设置组件设置 immediateCheck 属性,可以不手动执行 getData 方法
            this.initResData()
            this.getData({ pageNum: 1, pageSize: 10 })
        },
        mounted() {},
        methods: {
            handleLoading(params) {
                // console.log('loading...')
                this.getData(params, false)
            },
            initResData() {
                const res = {
                    total: 0,
                    list: [],
                }
                let len = Math.floor(Math.random() * 100)
                for (let i = 0; i < len; i++) {
                    res.list.push(i)
                }
                res.total = res.list.length
                console.log('init-res:', res)
                this.resData = res
            },
            /**
             * @param {object} params
             * @param {boolean} isInit 是否初始化
             */
            getData(params, isInit = true) {
                this.count++
                this.isMoreLoading = true
                this.reqFunc(params)
                    .then(res => {
                        const { total, list } = res
                        this.isMoreLoading = false
                        this.total = total
                        if (this.isInit) {
                            this.list = list
                        } else {
                            this.list = [...this.list, ...list]
                        }
                    })
                    .catch(err => {
                        console.log('err:', err)
                        this.isMoreLoading = false
                        this.isMoreError = true
                    })
            },
            reqFunc(params) {
                // console.log('params:', params)
                return new Promise((resolve, reject) => {
                    const { total, list } = this.resData
                    const res = { total, list }
                    const start = (params.pageNum - 1) * params.pageSize
                    const end = params.pageNum * params.pageSize
                    res.list = res.list.slice(start, end)
                    console.log('res:', res)
                    setTimeout(() => {
                        this.count > 1 ? resolve(res) : reject(new Error('出错了'))
                    }, 500)
                })
            },
        },
    }
</script>
<style lang="less" scoped>
    //@import url(); 引入公共css类
    .page-main {
        background: #fff;

        .item {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            // padding: 50px 0;
            border: 1px solid #ccc;
            border-radius: 6px;
            margin-bottom: 10px;
        }
    }
</style>
```
