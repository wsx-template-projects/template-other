<template>
    <div id="app">
        <router-view class="app-view" />
    </div>
</template>
<script>
import { onMounted } from 'vue'
export default {
    setup() {
        onMounted(() => {
            // console.log('-app组件-')
        })
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
