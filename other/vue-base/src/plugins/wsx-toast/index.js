/**
 * toast 插件
 */
import ToastComponent from './index.vue'

let $vm

const myTost = {
    install: function(Vue, options) {
        if (!$vm) {
            // 生成vue的子类
            const ToastPlugins = Vue.extend(ToastComponent)
            // 生成一个改子类的实例
            $vm = new ToastPlugins()
            // 讲这个实例挂载到创建的div上
            $vm.$mount(document.createElement('div'))
            document.body.appendChild($vm.$el)
        }
        const toast = function(message, duration = 2000) {
            console.log('-toast-', message, duration)
            $vm.message = message
            $vm.isShow = true

            setTimeout(() => {
                $vm.isShow = false
            }, duration)
        }
        // 通过vue的原型注册一个方法，让所有的实例共享这个方法
        Vue.prototype.$toast = toast
        return Vue
    }
}

export default myTost
