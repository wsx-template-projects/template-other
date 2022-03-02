<!-- 
   tab-list组件
-->
<template>
    <div class="components-tab-list">
        <van-tabs v-model="activeTab" v-bind="tabsBind" @click="onTab">
            <van-tab :title="item.title" v-for="item in tabData" :key="item.title">
                <template v-if="list.length">
                    <van-list
                        class="list-wrap"
                        v-model="isLoading"
                        :finished="isFinished"
                        finished-text="没有更多了"
                        :error.sync="isError"
                        error-text="请求失败，点击重新加载"
                        offset="30"
                        @load="handleLoading"
                    >
                        <div class="group-item" v-for="(item, index) in list" :key="index">
                            <slot name="item" :item="item" :index="index" />
                        </div>
                    </van-list>
                </template>

                <template v-else>
                    <empty-item :config="emptyConfig" />
                </template>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import EmptyItem from './empty-item.vue'
export default {
    name: '',
    components: { EmptyItem },
    data() {
        return {
            count: 10,

            activeTab: '',
            isLoading: false,
            isFinished: false,
            isError: false,
            total: 0,
            list: [],

            currTabIndex: 0,
            totalData: {},

            resData: [],

            tabAttr: {
                sticky: true,
            },
        }
    },
    props: {
        // 初始页码
        initPageNum: {
            type: [Number, String],
            default: 1,
        },
        pageNum: {
            type: [Number, String],
            default: 1,
        },
        pageSize: {
            type: [Number, String],
            default: 10,
        },
        tabData: {
            type: Array,
            default() {
                return []
            },
        },
        // 标签配置
        tabConfig: {
            type: Object,
            default() {
                return {}
            },
        },
        // 列表配置
        listConfig: {
            type: Object,
            default() {
                return {}
            },
        },
        // 空数据配置
        emptyConfig: {
            type: Object,
            default() {
                return {}
            },
        },
        change: {
            type: Function,
        },
    },
    computed: {
        currPageNum: {
            get() {
                return this.pageNum
            },
            set(val) {
                this.$emit('update:pageNum', val)
            },
        },
        tabsBind() {
            return { ...this.tabAttr, ...this.tabConfig }
        },
    },
    watch: {
        pageNum(newV, oldV) {
            console.log('page-num-new :>> ', newV)
            console.log('page-num-old :>> ', oldV)
        },
        tabList: {
            handler(newV, oldV) {
                console.log('newV :>> ', newV)
                console.log('oldV :>> ', oldV)
            },
        },
    },
    created() {
        // todo: 功能
        // 1: 列表切换
        // 2: 上拉加载
        // 3: 下拉刷新
        // 4: 初始化
        // 5: 条件搜索
    },
    mounted() {
        this.totalData = this.setTotalData(this.tabData)
        console.log('totalData :>> ', this.totalData)
        this.resData[this.currTabIndex] = this.initResData()
        this.getData()
    },
    methods: {
        setTotalData(list) {
            const baseObj = {
                total: 0,
                list: [],
                pageNum: this.initPageNum,
            }
            return list.map(item => ({ ...item, ...baseObj }))
        },
        onTab(index, title) {
            console.log('index :>> ', index)
            console.log('title :>> ', title)
            this.currTabIndex = index
            const currData = this.totalData[this.currTabIndex]
            if (currData.list.length) {
                console.log('有数据 :>> ')
                this.isFinished = false
                this.list = currData.list
                this.isFinished = this.list.length >= currData.total
            } else {
                console.log('初始化 :>> ')
                this.resData[this.currTabIndex] = this.initResData()
                this.getInitData()
            }
        },
        handleLoading() {
            console.log('加载下一页 :>> ')
            this.getData(false)
        },
        getInitData() {
            console.log('初始化list')
            this.isFinished = false
            this.totalData[this.currTabIndex].pageNum = this.initPageNum
            this.getData()
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
            return res
        },
        /**
         * @param {boolean} isInit 是否初始化
         */
        getData(isInit = true) {
            console.log('isInit :>> ', isInit)
            this.count++
            this.isLoading = true
            // todo
            const params = {
                pageSize: this.pageSize,
                pageNum: this.totalData[this.currTabIndex].pageNum,
            }
            this.reqFunc(params)
                .then(res => {
                    console.log('res :>> ', res)
                    const { total, list } = res
                    // const { total, list } = { total: 0, list: [] }
                    this.isLoading = false
                    if (isInit) {
                        this.list = list
                        this.totalData[this.activeTab].list = list
                        this.totalData[this.activeTab].total = total
                    } else {
                        this.list = [...this.list, ...list]
                        this.totalData[this.activeTab].list = [...this.totalData[this.activeTab].list, ...list]
                    }
                    console.log('list :>> ', this.list)
                    console.log('totalData :>> ', this.totalData)
                    if (this.list.length >= total) {
                        console.log('全部加载完成... :>> ')
                        this.isFinished = true
                    }
                    this.totalData[this.currTabIndex].pageNum++
                })
                .catch(err => {
                    console.log('err:', err)
                    this.isLoading = false
                    this.isMoreError = true
                })
        },
        reqFunc(params) {
            console.log('params:', params)
            return new Promise((resolve, reject) => {
                const { total, list } = this.resData[this.currTabIndex]
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
.list-wrap {
    padding-top: 16px;
}

/deep/ .van-sticky--fixed {
    // top: 44px;
    z-index: 9999;
}
</style>
