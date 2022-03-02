<!--
   图片/预览 - 全局组件
-->
<template>
    <div class="page-components-image">
        <van-image v-bind="bindAttr" :src="src" @click="onClick" />

        <van-image-preview
            v-model="isShowPreview"
            :images="previewList"
            @change="changePreview"
            v-if="hasPreview"
        ></van-image-preview>
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
        return {
            isShowPreview: false,
            previewList: [],
            optionsAttr: {
                width: 80,
                height: 80,
                fit: 'contain',
            },
        }
    },
    props: {
        // 相关配置（例如：width/height/fit 等）
        config: {
            type: Object,
            default() {
                return {}
            },
        },
        src: {
            type: String,
            default: '',
        },
        // 是否有预览
        hasPreview: {
            type: Boolean,
            default: true,
        },

        previewData: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    computed: {
        bindAttr() {
            return { ...this.optionsAttr, ...this.config }
        },
    },
    created() {},
    mounted() {},
    methods: {
        onClick() {
            console.log('click-image :>> ')
            if (!this.hasPreview) return
            this.isShowPreview = true
            this.previewList = [this.src]
            console.log('previewList :>> ', this.previewList)
        },
        changePreview(index) {
            console.log('change-index :>> ', index)
        },
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
