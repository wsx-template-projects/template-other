<!-- 
   mobile-single-list
-->
<template>
    <div class="mobile-single-list">
        <header-bar />
        <div class="page-main">
            <div class="">
                <van-search v-model="searchVal" placeholder="请输入搜索关键字" @blur="handleSearchBlur" />
            </div>
            <div class="list-wrap">
                <my-list
                    ref="listRef"
                    :is-loading.sync="isMoreLoading"
                    :is-error.sync="isMoreError"
                    :is-need-refresh="true"
                    :list="list"
                    :total="total"
                    :empty-config="{
                        image: 'https://img01.yzcdn.cn/vant/custom-empty-image.png',
                        description: '啥都没有了!',
                    }"
                    @load="handleLoading"
                    @init="handleInit"
                    @refresh="handleRefresh"
                >
                    <template v-slot="{ item }">
                        <div class="item">
                            {{ item }}
                        </div>
                    </template>
                </my-list>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/header-bar'
import MyList from '@/components/global/my-list'
export default {
    name: 'MobileMyList',
    components: { HeaderBar, MyList },
    data() {
        return {
            searchVal: '',

            count: 1,
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
        this.getInitData()
    },
    mounted() {},
    methods: {
        getInitData() {
            this.getData({ pageNum: 1, pageSize: this.pageSize })
        },
        handleSearchBlur(event) {
            console.log('失去焦点', this.searchVal)
            console.log('event :>> ', event)
            console.log('ref :>> ', this.$refs.listRef)
            this.$refs.listRef.initData()
        },
        handleLoading(params) {
            // console.log('loading...')
            this.getData(params, false)
        },
        handleInit() {
            this.getInitData()
        },
        handleRefresh() {
            // this.list = []
            this.getInitData()
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
            // console.log('init-res:', res)
            this.resData = res
        },
        /**
         * @param {object} params
         * @param {boolean} isInit 是否初始化
         */
        getData(params, isInit = true) {
            console.log('isInit :>> ', isInit)
            this.count++
            this.isMoreLoading = true
            this.reqFunc(params)
                .then(res => {
                    console.log('res :>> ', res)
                    const { total, list } = res
                    // const { total, list } = { total: 0, list: [] }
                    this.isMoreLoading = false
                    this.total = total
                    if (isInit) {
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
        padding: 40px 0;
        // padding: 15px 0;
        border: 1px solid #ccc;
        border-radius: 6px;
        margin-bottom: 10px;
    }
}
</style>
