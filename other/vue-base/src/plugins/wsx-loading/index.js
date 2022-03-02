/**
 * loading 插件
 */
import LoadingComponent from './index.vue'

let $vm

const myLoading = {
    install: function(Vue, options) {
        if (!$vm) {
            // 生成vue的子类
            const LoadingPlugins = Vue.extend(LoadingComponent)
            // 生成一个改子类的实例
            $vm = new LoadingPlugins({ el: document.createElement('div') })
            document.body.appendChild($vm.$el)
        }
        const loading = {
            show(message) {
                $vm.isShow = true
                $vm.message = message
            },
            hide() {
                $vm.isShow = false
                $vm.message = ''
            }
        }
        // 通过vue的原型注册一个方法，让所有的实例共享这个方法
        Vue.prototype.$loading = loading
        return Vue
    }
}

export default myLoading
