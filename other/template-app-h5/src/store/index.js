import Vue from 'vue'
import Vuex from 'vuex'

const moduleFiles = require.context('./modules', false, /\.js$/)

const modules = moduleFiles.keys().reduce((modules, modulePath) => {
    // console.log(modules, modulePath)
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    // console.log('-module-name-', moduleName)
    const value = moduleFiles(modulePath)
    // console.log(value)
    modules[moduleName] = value.default
    return modules
}, {})

// console.log('-modules-', modules)

Vue.use(Vuex)

export default new Vuex.Store({
    modules,
})
