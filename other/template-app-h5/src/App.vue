<template>
    <div id="app">
        <router-view class="app-view" v-if="isRouterAlive" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'App',
    provide() {
        return {
            reload: this.reload,
        }
    },
    data() {
        return {
            isRouterAlive: true,
            // 初始过度动画方向
            transitionName: 'slide-right',
        }
    },
    computed: {
        ...mapState('user', ['count', 'token']),
    },
    watch: {
        $route(to, from) {
            // 切换动画
            // console.log(to, from)
            let isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退
            this.transitionName = isBack ? 'slide-left' : 'slide-right'
            this.$router.isBack = false
            // console.log(this.$router.isBack)
        },
        token(newVal, oldVal) {
            // console.log('-watch-token-')
            // console.log('-new-', newVal)
            // console.log('-old-', oldVal)
            if (!oldVal) {
                // console.log('-开始登录-')
                return
            }
            if (!newVal) {
                // console.log('-refreshToken失效了-')
                return
            }
            // this.reload()
        },
        count(newVal, oldVal) {
            console.log('-watch-count-', newVal, oldVal)
        },
    },
    methods: {
        // 重新加载当前页
        reload() {
            console.log('重新加载...')
            this.isRouterAlive = false
            this.$nextTick(() => {
                this.isRouterAlive = true
            })
        },
    },
}
</script>

<style lang="less">
#app {
    height: 100%;
    font-size: 14px;
    background-color: #fff;
    -webkit-overflow-scrolling: touch;
}
.loading-transition-enter {
    opacity: 1;
    transition: all 100ms;
}
.loading-transition-leave-active {
    opacity: 0;
    transition: all 100ms;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
}
.slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
</style>
