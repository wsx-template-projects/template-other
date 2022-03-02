/*
 * 打包配置文件
 */
const Path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

console.log('-----proxyCode:', process.env.VUE_APP_PROXY_CODE)
console.log('-----nodeEnv:', process.env.NODE_ENV)
console.log('-----serverENV:', process.env.VUE_APP_SERVER_ENV)
console.log('-----serverURL:', process.env.VUE_APP_SERVER_URL)

const projectName = 'project_h5'

/**
 * CDN方式引入框架文件，减少打包文件的体积（优化项）
 * */

const staticResource = {
    // #region 忽略生成环境打包的文件
    externals: {
        vue: 'Vue',
        axios: 'axios',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
    },
    // 在html文件中引入相关CDN
    cdn: {
        css: [
            // vant css
            'https://cdn.jsdelivr.net/npm/vant@2.12/lib/index.css',
        ],
        js: [
            // vant
            'https://cdn.jsdelivr.net/npm/vant@2.12/lib/vant.min.js',
            // vue
            'https://cdn.jsdelivr.net/npm/vue@2.6/dist/vue.min.js',
            // vue-router
            'https://cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js',
            // vuex
            'https://cdn.staticfile.org/vuex/3.1.0/vuex.min.js',
            // axios
            'https://cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js',
        ],
    },
    // cdn: {
    //     css: [process.env.BASE_URL + 'static/assets/npm/vant/2.12.6/index.css'],
    //     js: [
    //         process.env.BASE_URL + 'static/assets/npm/vant/2.12.6/vant.min.js',
    //         process.env.BASE_URL + 'static/assets/npm/vue/2.6.11/vue.min.js',
    //         process.env.BASE_URL + 'static/assets/npm/vue-router/3.1.6/vue-router.min.js',
    //         process.env.BASE_URL + 'static/assets/npm/vuex/3.1.3/vuex.min.js',
    //         process.env.BASE_URL + 'static/assets/npm/axios/0.19.2/axios.min.js',
    //     ],
    // },
}

console.log('staticResource :>> ', staticResource)

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? `/${projectName}/` : './',
    outputDir: projectName,
    assetsDir: 'static',
    lintOnSave: true, // 是否在保存的时候检查
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
    // 开发环境服务配置
    devServer: {
        host: '0.0.0.0',
        port: '8899',
        open: false, // 项目启动后自动打开浏览器
        https: false,
        // progress: false
        proxy: {
            '/blockchain': {
                target: process.env.VUE_APP_SERVER_URL,
                ws: true,
                changeOrigin: true,
                secure: false,
                // pathRewrite: {
                //   "^/live": ''
                // }
            },
        },
    },
    // 添加webpack配置
    configureWebpack: config => {
        // 配置生产环境的日志清除
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
        // 定义快捷路径标识
        const myAlias = {
            '@': Path.resolve(__dirname, './src'),
            public: Path.resolve(__dirname, './public'),
        }
        // 性能提示
        let myPerformance = {}
        if (process.env.NODE_ENV === 'production') {
            myPerformance = {
                hints: 'warning',
                maxEntrypointSize: 1024000,
                maxAssetSize: 1024000,
            }
            // todo 清除console
            // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
        // 更新config
        config.resolve.alias = { ...config.resolve.alias, ...myAlias }
        config.performance = { ...config.performance, ...myPerformance }

        // todo 清除console，配置全局环境变量控制
        // config.optimization.minimizer[0].options.terserOptions.compress.drop_console =
        //     process.env.DIST_REMOVE_CONSOLE === 'true'
    },
    // 修改webpack配置
    chainWebpack: config => {
        // 打包后文件分析相关配置
        if (process.env.NODE_ENV === 'production') {
            if (process.env.npm_config_report) {
                config
                    .plugin('webpack-bundle-analyzer')
                    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                    .end()
                config.plugins.delete('prefetch')
            }

            // 忽略 staticResource['externals']配置的相关模块
            config.externals(staticResource['externals'])
            // 修改 HtmlWebpackPlugin 插件参数，植入 cdns 这个模板参数，值为 Vue3 和 Moment.js 的 cdn 链接
            config.plugin('html').tap(args => {
                console.log('args :>> ', args)
                args[0].cdn = staticResource['cdn']
                return args
            })
        }

        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
        // 修复HMR,实现热更新(修改代码后，不用再刷新页面，自动更新修改的内容)
        config.resolve.symlinks(true)
        // swf的配置
        // config.module
        //   .rule('swf')
        //   .test(/\.swf$/)
        //   .use('url-loader')
        //   .loader('url-loader')
        //   .options({
        //     limit: 10000
        //   })
    },
}
