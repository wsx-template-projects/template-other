'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

// const TerserPlugin = require('terser-webpack-plugin')

// console.log(path.resolve(__dirname, './src'))
// console.log(path.resolve(__dirname, '/src'))
// console.log(path.resolve(__dirname, 'src'))
// console.log(path.resolve(__dirname, '../src'))
// console.log(path.join(__dirname, './src'))

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title // page title

// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9000 // dev port

const target = {
    url: 'http://127.0.0.1'
}

console.log('-----serverEnv', process.env.VUE_APP_SERVER_ENV)
console.log('-----nodeEnv', process.env.NODE_ENV)
console.log('-----serverUrl', process.env.VUE_APP_SERVER_URL)

const projectName = 'project'

const staticResource = {
    // #region 忽略生成环境打包的文件
    externals: {
        vue: 'Vue',
        axios: 'axios',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        // xlsx: 'XLSX',
        echarts: 'echarts',
        'element-ui': 'ELEMENT'
    },
    // 在html文件中引入相关CDN
    // cdn: {
    //     css: [
    //         // element-ui css
    //         'https://cdn.bootcss.com/element-ui/2.13.0/theme-chalk/index.css',
    //     ],
    //     js: [
    //         // vue
    //         'https://cdn.staticfile.org/vue/2.5.22/vue.min.js',
    //         // vue-router
    //         'https://cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js',
    //         // vuex
    //         'https://cdn.staticfile.org/vuex/3.1.0/vuex.min.js',
    //         // axios
    //         'https://cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js',
    //         // element-ui js
    //         'https://cdn.bootcss.com/element-ui/2.13.0/index.js',
    //         //echarts
    //         'https://cdn.bootcss.com/echarts/4.6.0/echarts-en.common.js',
    //         // xlsx
    //         // 'static/assets/npm/xlsx/0.16.8/xlsx.full.min.js',
    //     ],
    // },
    cdn: {
        css: [process.env.BASE_URL + 'static/assets/npm/vant/2.12.6/index.css'],
        js: [
            process.env.BASE_URL + 'static/assets/npm/vue/2.6.11/vue.min.js',
            process.env.BASE_URL + 'static/assets/npm/vue-router/3.3.4/vue-router.min.js',
            process.env.BASE_URL + 'static/assets/npm/axios/0.19.2/axios.min.js',
            process.env.BASE_URL + 'static/assets/npm/vuex/3.4.0/vuex.min.js',
            process.env.BASE_URL + 'static/assets/npm/echarts/4.8.0/echarts.min.js',
            process.env.BASE_URL + 'static/assets/npm/element-ui/2.13.2/index.js',
            process.env.BASE_URL + 'static/assets/npm/xlsx/0.16.8/xlsx.full.min.js',
            process.env.BASE_URL + 'static/assets/npm/quill/1.3.7/quill.min.js',
            process.env.BASE_URL + 'static/assets/npm/quill/image-resize.min.js'
        ]
    }
}

console.log('staticResource :>> ', staticResource)

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? `/${projectName}/` : '/', // 基本路径
    outputDir: projectName, // 打包后输出文件目录
    assetsDir: 'static', // 静态资源目录
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        host: '0.0.0.0',
        port: port,
        open: false,
        https: false,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/provider': {
                target: process.env.VUE_APP_SERVER_URL,
                ws: true,
                changeOrigin: true,
                secure: false
                // pathRewrite: {
                //   '^/livelms': ''
                // }
            }
        }
    },
    // 添加webpack配置
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
        // if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_SERVER_ENV === 'prod') {
        //   // 返回一个将会被合并的对象
        //   return {
        //     optimization: {
        //       minimizer: [
        //         new TerserPlugin({
        //           sourceMap: false,
        //           terserOptions: {
        //             compress: {
        //               drop_console: true
        //             }
        //           }
        //         })
        //       ]
        //     }
        //   }
        // }
    },
    // 修改webpack配置
    chainWebpack(config) {
        // 忽略 staticResource['externals']配置的相关模块
        // config.externals(staticResource['externals'])
        // // 修改 HtmlWebpackPlugin 插件参数，植入 cdns 这个模板参数，值为 Vue3 和 Moment.js 的 cdn 链接
        // config.plugin('html').tap(args => {
        //     console.log('args :>> ', args)
        //     args[0].cdn = staticResource['cdn']
        //     return args
        // })

        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test

        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        // set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()

        config.when(process.env.NODE_ENV === 'development', config => config.devtool('source-map'))
        // config.when(process.env.NODE_ENV === 'development', config => config.devtool('cheap-source-map'))

        // 设置performance预警
        config.when(process.env.NODE_ENV === 'production', config =>
            config.performance
                .hints('warning')
                .maxEntrypointSize(2048000)
                .maxAssetSize(1024000)
        )

        config.when(process.env.NODE_ENV !== 'development', config => {
            config
                .plugin('ScriptExtHtmlWebpackPlugin')
                .after('html')
                .use('script-ext-html-webpack-plugin', [
                    {
                        // `runtime` must same as runtimeChunk name. default is `runtime`
                        inline: /runtime\..*\.js$/
                    }
                ])
                .end()
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    echarts: {
                        name: 'chunk-echarts',
                        priority: 30,
                        test: /[\\/]node_modules[\\/]_?echarts(.*)/
                    },
                    zrender: {
                        name: 'chunk-zrender',
                        priority: 29,
                        test: /[\\/]node_modules[\\/]_?zrender(.*)/
                    },
                    elementUI: {
                        name: 'chunk-elementUI', // split elementUI into a single package
                        priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                    },
                    vuedraggableAndLrz: {
                        name: 'chunk-vuedraggableAndLrz',
                        priority: 15,
                        test: /([\\/]node_modules[\\/]_?vuedraggable(.*))|([\\/]node_modules[\\/]_?lrz(.*))/
                    },
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial' // only package third parties that are initially dependent
                    },
                    utils: {
                        name: 'chunk-utils',
                        test: resolve('src/utils'),
                        minChunks: 3,
                        priority: 8,
                        reuseExistingChunk: true
                    },
                    components: {
                        name: 'chunk-components',
                        test: resolve('src/components'), // can customize your rules
                        minChunks: 3, //  minimum common number
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            })
            config.optimization.runtimeChunk('single')
        })
    }
}
