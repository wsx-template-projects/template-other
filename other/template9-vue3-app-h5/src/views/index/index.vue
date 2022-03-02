<!--
   首页
-->
<template>
    <div class="index">
        <headerBar />
        <div class="main">
            <van-button type="primary" @click="onOpen">打开demo</van-button>
        </div>
    </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
    components: { headerBar },
    setup() {
        const router = useRouter()
        const onOpen = () => {
            router.push('/demo')
        }
        onMounted(() => {})
        return {
            onOpen
        }
    }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.main {
    padding: 20px 20px 0;
}
</style>
