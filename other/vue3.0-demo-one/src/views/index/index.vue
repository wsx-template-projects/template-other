<!--
   首页
-->
<template>
    <div class="index">
        <headerBar />
        <div class="main">
            <div class="group">
                <p class="group-title">API相关</p>
                <van-button class="group-btn" type="primary" @click="onOpen('/api-data')">api-data</van-button>
                <van-button class="group-btn" type="primary" @click="onOpen('/api-computed')">api-computed</van-button>
                <van-button class="group-btn" type="primary" @click="onOpen('/api-watch')">api-watch</van-button>
                <van-button class="group-btn" type="primary" @click="onOpen('/api-hooks')">api-hooks</van-button>
            </div>
            <div class="group">
                <p class="group-title">业务相关</p>
                <van-button class="group-btn" type="primary" @click="onOpen('/demo')">demo</van-button>
                <div class="icon"></div>
            </div>
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
        const onOpen = (path) => {
            router.push(path)
        }
        const getData = () => {}
        onMounted(() => {})
        return {
            onOpen,
        }
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.main {
    padding: 0 20px;

    .icon {
        display: block;
        width: 0;
        height: 0;
        // background: #00a3af;
        border-bottom: 20px solid #00a3af;
        border-left: 20px solid transparent; /*transparent 表示透明*/
        border-right: 20px solid transparent;
    }

    .group {
        margin-bottom: 20px;

        .group-title {
            font-size: 18px;
            font-weight: 600;
            line-height: 42px;
        }

        .group-btn {
            margin-right: 10px;
            margin-bottom: 10px;
        }
    }
}
</style>
