<!-- 
   单一list组件
-->
<template>
    <div class="components-single-list">
        <template v-if="list.length">
            <template v-if="!isNeedRefresh">
                <van-list
                    class="list-wrap"
                    v-model="isMoreLoading"
                    :finished="isFinished"
                    :finished-text="finishedText"
                    :error.sync="isMoreError"
                    :error-text="errorText"
                    :offset="offset"
                    :immediate-check="immediateCheck"
                    @load="onLoad"
                >
                    <div class="item-group" v-for="(item, index) in list" :key="index">
                        <slot :item="item" :index="index" />
                    </div>
                </van-list>
            </template>
            <template v-else>
                <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
                    <van-list
                        class="list-wrap"
                        v-model="isMoreLoading"
                        :finished="isFinished"
                        :finished-text="finishedText"
                        :error.sync="isMoreError"
                        :error-text="errorText"
                        :offset="offset"
                        :immediate-check="immediateCheck"
                        @load="onLoad"
                    >
                        <div class="item-group" v-for="(item, index) in list" :key="index">
                            <slot :item="item" :index="index" />
                        </div>
                    </van-list>
                </van-pull-refresh>
            </template>
        </template>

        <template v-else>
            <van-empty class="custom-image" v-bind="emptyBaseAttr" />
        </template>
    </div>
</template>

<script>
export default {
    name: 'SingleList',
    components: {},
    data() {
        return {
            pageNum: 1,
            // 是否出错状态
            isErrorType: false,
            // 是否数据全部加载完
            isFinished: false,
            // 是否正在刷新
            isRefreshing: false,
            optionsAttr: {
                image: require('@/assets/images/common/no-data.png'),
                description: '没有数据!',
            },
        }
    },
    props: {
        // 滚动条与底部距离小于 offset 时触发load事件
        offset: {
            type: Number,
            default: 300,
        },
        // 加载完成后的提示文案
        finishedText: {
            type: String,
            default: '没有更多了',
        },
        // 加载失败后的提示文案
        errorText: {
            type: String,
            default: '请求失败，点击重新加载',
        },
        // 是否在初始化时立即执行滚动位置检查
        // todo 此属性有问题暂不推荐使用
        immediateCheck: {
            type: Boolean,
            default: false,
        },
        // 每页条数，注意：每页条数需要铺满全屏(以铺满iphoneX来算)
        pageSize: {
            type: [Number, String],
            default: 10,
        },
        // 是否正在加载中，默认为 false
        isLoading: {
            type: Boolean,
            required: true,
            default: false,
        },
        // 是否出错了，默认为 false
        isError: {
            type: Boolean,
            default: false,
        },
        // 是否需要下拉刷新，默认为 false
        isNeedRefresh: {
            type: Boolean,
            default: false,
        },
        // 是否需要分页，默认为 true
        isNeedPaging: {
            type: Boolean,
            default: true,
        },
        // 总数据条数，当后端接口没有返回 total 的话，初始可以设置为无限大
        total: {
            type: [Number, String],
            required: true,
        },
        list: {
            type: Array,
            required: true,
            default() {
                return []
            },
        },
        // 相关配置，目前只有空数据的配置
        emptyConfig: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    computed: {
        isMoreLoading: {
            get() {
                return this.isLoading
            },
            set(val) {
                this.$emit('update:isLoading', val)
            },
        },
        isMoreError: {
            get() {
                return this.isError
            },
            set(val) {
                this.$emit('update:isError', val)
            },
        },
        emptyBaseAttr() {
            return { ...this.optionsAttr, ...this.emptyConfig }
        },
    },
    watch: {
        isLoading(newV) {
            console.log('watch-isLoading', newV)
            if (newV) {
                console.log('加载中...')
            } else {
                console.log('加载完成')
                // todo: 此处可以处理一下加载完成的相关逻辑
                this.isRefreshing = false
            }
        },
        isError(newV) {
            console.log('watch-isError:', newV)
            if (newV) {
                this.isErrorType = true
            }
        },
        list: {
            handler(val) {
                console.log('watch-list:', val)
                if (this.list.length >= this.total) {
                    console.log('数据全部加载完成')
                    this.isFinished = true
                }
            },
            deep: true,
        },
    },
    created() {
        // todo: 缺陷，初始化数据会出现没有数据时候的icon显示
    },
    mounted() {
        this.$nextTick(() => {
            // console.log('isNeedPaging :>> ', this.isNeedPaging)
            !this.isNeedPaging && (this.isFinished = true)
        })
    },
    methods: {
        // 初始化
        initData() {
            console.log('初始化数据 :>> ')
            this.pageNum = 1
            this.isErrorType = false
            this.isFinished = !this.isNeedPaging
            this.$emit('init')
        },
        // 下拉刷新
        onRefresh() {
            console.log('下拉刷新')
            this.pageNum = 1
            this.isErrorType = false
            this.isMoreLoading = true
            this.isFinished = !this.isNeedPaging
            this.$emit('refresh')
        },
        // 上拉加载
        onLoad() {
            console.log('start loading :>>')
            if (this.isErrorType) {
                // todo: 出错了,重新加载当前页数据
                this.isErrorType = false
            } else {
                // todo: 没有出错,加载下一页
                this.pageNum++
            }
            this.isMoreLoading = true
            const params = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
            }
            console.log('params :>> ', params)
            this.$emit('load', params)
        },
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
/deep/ .van-empty {
    padding: 80px 0;

    .van-empty__image {
        width: 180px;
        height: auto;
    }
}
</style>
