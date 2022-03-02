<!--
   dialog组件
-->
<template>
    <div class="dialogWrap">
        <template v-if="type === 'one'">
            <van-dialog v-model:show="dialogVisible" title="标题" show-cancel-button>
                <img class="img" src="https://img.yzcdn.cn/vant/apple-3.jpg" />
            </van-dialog>
        </template>
        <template v-else-if="type === 'two'">
            <van-dialog v-model:show="dialogVisible" title="标题" show-cancel-button :before-close="beforeClose">
                <img class="img" src="https://img.yzcdn.cn/vant/apple-3.jpg" />
            </van-dialog>
        </template>
        <template v-else>
            <van-dialog v-model:show="dialogVisible" title="标题" show-cancel-button :before-close="onBeforeClose">
                <img class="img" src="https://img.yzcdn.cn/vant/apple-3.jpg" />
            </van-dialog>
        </template>
    </div>
</template>

<script>
import { onMounted, toRef } from 'vue'
import { useVisible } from '@/hooks/childApi'
export default {
    props: {
        type: {
            type: String,
            default: 'one'
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    setup(props, ctx) {
        const visible = toRef(props, 'visible')
        const { dialogVisible, beforeClose } = useVisible(visible, ctx)

        const onBeforeClose = (action) => {
            console.log('-action-', action)
            return beforeClose(action, (resolve) => {
                setTimeout(() => {
                    // TODO: 异步关闭，请求接口在此处执行
                    resolve(true)
                }, 500)
            })
        }

        onMounted(() => {})
        return {
            dialogVisible,
            beforeClose,
            onBeforeClose
        }
    }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.dialogWrap {
    .img {
        display: block;
        width: 100%;
        padding: 25px 20px 0;
    }
}
</style>
