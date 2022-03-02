import { createStore } from 'vuex'

const modulesFiles = require.context('./modules', false, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // console.log(module, modulePath)
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  // console.log(moduleName)
  const value = modulesFiles(modulePath)
  // console.log(value)
  modules[moduleName] = value.default
  return modules
}, {})

// console.log('-store-modules-', modules)

export default createStore({
  modules
})
