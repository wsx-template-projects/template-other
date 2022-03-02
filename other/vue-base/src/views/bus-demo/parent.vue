<!-- 
   bus - demo
-->
<template>
    <div class="bus-demo">
        bus
        <div class="item" v-for="(itemOptions, i) in list" :key="i">
            <div v-for="(item, j) in itemOptions" :key="j">
                <span>{{ item.label }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BusDemo',
    components: {},
    data() {
        return {
            count: 0,
            // 源数据
            list: [
                { lianDongHao: 0, yuanMuLuID: '2', label: '红细胞' },
                { lianDongHao: 0, yuanMuLuID: '1000', label: '纤维蛋白' },
                { lianDongHao: 0, yuanMuLuID: '1000', label: '二聚体' },
                { lianDongHao: 60, yuanMuLuID: '1000', label: '二聚体-ABD' },
                { lianDongHao: 60, yuanMuLuID: '100', label: '二聚体-BD' },
                { lianDongHao: 60, yuanMuLuID: '900', label: '二聚体-AB' }
            ]
        }
    },
    computed: {},
    created() {},
    mounted() {
        this.list = this.deepTree(this.list)
        console.log('-list-init-', this.list)
    },
    methods: {
        /**
         * 数组对象属性(lianDongHao和yuanMuLuID)相同 放到同一个数组中
         * 改算法的时间复杂度为 O(n2)
         */
        deepTree(list, init = [], count = 0) {
            console.log('-list-', list)
            let result = [...init]
            const copyList = [...list]
            list.forEach((item, index) => {
                if (index === 0) {
                    item = { children: [], ...item }
                    result.push([item])
                } else {
                    let temp = result[count][0]
                    if (temp.lianDongHao === item.lianDongHao && temp.yuanMuLuID === item.yuanMuLuID) {
                        result[count].push(item)
                    } else {
                        result[count][0].children.push(item)
                    }
                    console.log('-888-', copyList, copyList.length)
                    if (copyList.length > 1) {
                        if (index === copyList.length - 1) {
                            console.log('-start-')
                            let childs = result[count][0].children
                            console.log('-childs-', childs)
                            count++
                            console.log('-10000-', result)
                            result = this.deepTree(childs, result, count)
                        }
                    }
                }
            })
            console.log('-result-999-', result)
            return result
        }
    }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.item {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}
</style>
