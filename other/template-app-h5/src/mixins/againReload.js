/*
 * @Author: wangshengxian
 * @Date: 2021-01-28 18:41:23
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-28 19:05:03
 * @Desc: 刷新当前界面
 */
import openNative from '@/scripts/native/openNative'
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState('globalStatus', ['loadErrorCount']),
    },
    methods: {
        handleReload(msg, fn) {
            this.$dialog
                .confirm({
                    title: '服务器开小差了!',
                    message: msg,
                    cancelButtonText: '返回',
                    confirmButtonText: '重新加载',
                })
                .then(() => {
                    this.$store.commit('globalStatus/setLoadErrorCount')
                    console.log('-load-count-', this.loadErrorCount)
                    if (this.loadErrorCount > 3) {
                        this.$toast({
                            message: '服务器开小差了，请稍后再重试!',
                            onClose: () => {
                                openNative.closeWebview()
                            },
                        })
                        return
                    }
                    console.log('刷新当前页', this)
                    fn()
                })
                .catch(() => {
                    openNative.closeWebview()
                })
        },
    },
}
