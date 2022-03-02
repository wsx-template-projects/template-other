<!--
   api 之 自定义hooks
-->
<template>
    <div class="api-hooks">
        <headerBar />
        <div class="main">hooks</div>
    </div>
</template>

<script>
import headerBar from '@/components/headerBar'
import { onMounted } from 'vue'
export default {
    components: { headerBar },
    setup() {
        onMounted(() => {})
        return {}
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
