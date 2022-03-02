<!--
 * @Author: wangshengxian
 * @Date: 2021-01-30 10:08:14
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-30 10:08:55
 * @Desc: 列表 -- 没有数据
-->
<template>
    <div class="noData">
        <span></span>
        <p>暂无数据!</p>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {}
    },
    mounted() {},
    methods: {},
    components: {},
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
@imgUrl: '~@/assets/images/common/';
.noData {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 56px 0 100px 0;
    span {
        width: 100px;
        height: 100px;
        background: url('@{imgUrl}noData.png') no-repeat center / cover;
    }
    p {
        padding-top: 33px;
        color: #999;
    }
}
</style>
