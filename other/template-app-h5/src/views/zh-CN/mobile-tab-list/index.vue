<!-- 
   mobile-tab-list
-->
<template>
    <div class="page">
        <headerBar />
        <div class="page-main">
            <van-button @click="onNextPage('/mobile-single-list')">下一页</van-button>
            <my-tab-list :page-num.sync="pageNum" :tab-data="tabList">
                <template v-slot:item="{ item, index }">
                    <div class="item">
                        <p>item:{{ item }}</p>
                        <p>index:{{ index }}</p>
                    </div>
                </template>
            </my-tab-list>
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/header-bar'
import MyTabList from '@/components/global/my-tab-list'

export default {
    name: '',
    data() {
        return {
            pageNum: 1,
            tabList: [
                {
                    title: 'tab1',
                    list: [],
                },
                {
                    title: 'tab2',
                    list: [],
                },
                {
                    title: 'tab3',
                    list: [],
                },
                {
                    title: 'tab4',
                    list: [],
                },
                {
                    title: 'tab5',
                    list: [],
                },
                {
                    title: 'tab6',
                    list: [],
                },
                {
                    title: 'tab7',
                    list: [],
                },
            ],
        }
    },
    computed: {},
    components: { HeaderBar, MyTabList },
    created() {},
    beforeRouteEnter(to, from, next) {
        // console.log('to', to, 'from', from)
        // todo 判断from路由是不是当前页面的前一页路由
        // todo 注意此处没有this
        next(vm => {
            //
            // console.log('this:', vm)
        })
    },
    mounted() {},
    methods: {
        onNextPage(path) {
            this.$router.push(path)
        },
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.item {
    display: flex;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 16px 0;
    margin-bottom: 10px;
}
</style>
