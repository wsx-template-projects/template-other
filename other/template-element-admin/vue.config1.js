const LocalConfig = require('./config.js')
const autoprefixer = require('autoprefixer')
const postcssPxtorem = require('postcss-pxtorem') // @H5 将 px 转成 rem
const CompressionPlugin = require('compression-webpack-plugin')
const _ = require('lodash')
const { join } = require('path')
const { handleHtml, getPages, externals } = require('./build/utils')
const env = process.env
const VUE_APP_ENTRY = process.env.VUE_APP_ENTRY
const isDev = env.VUE_APP_ENV === 'dev'
const isMock = env.VUE_APP_MOCK === 'true'
const isSPA = LocalConfig.mode === 'SPA'
const isH5 = LocalConfig.platform === 'h5'
const pages = getPages(VUE_APP_ENTRY)

const entry = isSPA ? {} : { pages }
console.log('isSPA', isSPA)
console.log('isH5', isH5)
console.log('isMock', isMock)
console.log('VUE_APP_ENV', env.VUE_APP_ENV)

/* 当代理的前缀为空时 */
if (isDev) {
    const isEmpty = prefix => prefix === '' || prefix === '/'
    if (isEmpty(env.VUE_APP_BASEURL_API) && env.DEV_PROXY_TARGET_API) env.VUE_APP_BASEURL_API = '/@API'
}
// 多项目API代理采用 DEV_PROXY_TARGET_APIS 默认使用 DEV_PROXY_TARGET_API
const devProxyTargetApis = env.DEV_PROXY_TARGET_APIS
    ? JSON.parse(env.DEV_PROXY_TARGET_APIS)
    : env.DEV_PROXY_TARGET_API
    ? {
          [env.VUE_APP_BASEURL_API]: {
              changeOrigin: true,
              pathRewrite: { '^/@API': '' },
              target: env.DEV_PROXY_TARGET_API
          }
      }
    : null
console.log('devProxyTargetApis:', devProxyTargetApis)
console.log('env.DEV_PROXY_TARGET_API', env.DEV_PROXY_TARGET_API)

console.log('entry', entry)

/**
 * @type {import('@vue/cli-service').ConfigFunction}
 */
module.exports = () => {
    let VUE_APP_ENTRY_CONFIG = {}
    try {
        VUE_APP_ENTRY_CONFIG =
            VUE_APP_ENTRY && VUE_APP_ENTRY.indexOf(',') === -1
                ? require(`./src/entry/${VUE_APP_ENTRY}/vue.config.js`)
                : {}
    } catch (err) {
        console.warn(err)
    }
    const devServerOptions = devProxyTargetApis
        ? {
              devServer: {
                  host: '0.0.0.0',
                  /* 更详细的配置规则：https://webpack.docschina.org/configuration/dev-server/#devserver-proxy */
                  proxy: {
                      '/old': {
                          changeOrigin: true,
                          pathRewrite: { '^/@API': '' },
                          target: env.DEV_PROXY_TARGET_API
                      }
                  }
              }
          }
        : {}
    return ({
        ...entry,
        outputDir: env.outputDir || 'dist',
        lintOnSave: false, // 是否开启eslint保存检测 ,它的有效值为 true || false || 'error'
        devServer: {
            host: '0.0.0.0',
            /* 更详细的配置规则：https://webpack.docschina.org/configuration/dev-server/#devserver-proxy */
            proxy: {
                '/old': {
                    changeOrigin: true,
                    pathRewrite: { '^/old': '' },
                    target: env.DEV_PROXY_TARGET_API
                }
                // ['/v1']: {
                //     changeOrigin: true,
                //     pathRewrite: { '^/@API': '' },
                //     target: env.DEV_PROXY_TARGET_API2,
                // },
            }
        },
        // ...devServerOptions,
        assetsDir: 'static-hash',

        publicPath: env.BASE_URL,

        css: {
            extract: false,
            loaderOptions: {
                less: {
                    globalVars: {
                        hack: `true; @import '${join(__dirname, './src/styles/vars.less')}'`
                    }
                },
                postcss: {
                    plugins: function({ resourcePath: path }) {
                        const pxtorem = postcssPxtorem({ propList: ['*'] }) // @H5 将 px 转成 rem
                        // if (
                        //     /* 跳过 autoprefixer */
                        //     /[\\/]node_modules[\\/].+\.css$/.test(path) ||
                        //     /[\\/]src[\\/]libs[\\/].+\.css$/.test(path) ||
                        //     (isDev && env.DEV_CSS_AUTOPREFIXER !== 'true')
                        // ) {
                        //     return [pxtorem]
                        // }
                        if (isH5) {
                            return [pxtorem, autoprefixer]
                        }
                        // return [pxtorem, autoprefixer]
                        // if (isDev && env.DEV_CSS_AUTOPREFIXER !== 'true') {
                        //     return []
                        // }
                        return [autoprefixer]
                    }
                }
            },
            sourceMap: isDev ? env.DEV_CSS_SOURCEMAP === 'true' : false
        },

        productionSourceMap: env.VUE_APP_ENV === 'stage',

        configureWebpack: config => {
            if (isDev) config.devtool = 'source-map'
            // 不打包固定的第三方依赖
            Object.assign(config, {
                externals: env.VUE_APP_ENV === 'dev' ? {} : externals
                // externals: externals,
            })
            if (process.env.NODE_ENV !== 'production') return
            config.optimization = {
                // 默认命名 连接符~
                splitChunks: {
                    automaticNameDelimiter: '.'
                }
            }
            // config.optimization.splitChunks.cacheGroups.vendors.test = module => {
            //     const { resource: path } = module
            //     if (!path) return false
            //     if (
            //         /* 为了 chunk-vendors*.js 的稳定性，需要排除掉经过 babel 插件处理成按需引入的模块（详见 babel.config.js） */
            //         /[\\/]node_modules[\\/]element-ui[\\/]/.test(path) || // @PC.element-ui
            //         /[\\/]node_modules[\\/]vant[\\/]/.test(path) || // @H5.vant
            //         /[\\/]node_modules[\\/]lodash[\\/]/.test(path)
            //     ) {
            //         return false
            //     }
            //     return /[\\/]node_modules[\\/]|[\\/]src[\\/]libs[\\/]/.test(path) // 将这些初始化时的依赖包纳入 chunk-vendors*.js（其它的则纳入 app*.js）
            // }

            // if (process.env.NODE_ENV !== 'production') return
            // SEO
            // const PrerenderSPAPlugin = require('prerender-spa-plugin')
            // const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
            // return {
            //     plugins: [
            //         new PrerenderSPAPlugin({
            //             // 生成文件的路径，也可以与webpakc打包的一致。
            //             // 下面这句话非常重要！！！
            //             // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
            //             staticDir: path.join(__dirname, 'dist'),
            //             // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
            //             routes: ['/company/my/my-auth', '/company/my/my-index'],
            //             // 这个很重要，如果没有配置这段，也不会进行预编译
            //             server: {
            //                 proxy: {
            //                     '/api': {
            //                         target: 'http://192.168.1.72:9000',
            //                         // target: 'https://www.wzjrfw.com/',
            //                         secure: false,
            //                     },
            //                 },
            //             },
            //             // 这个很重要，如果没有配置这段，也不会进行预编译
            //             renderer: new Renderer({
            //                 inject: {
            //                     foo: 'bar',
            //                 },
            //                 // headless: false,
            //                 renderAfterDocumentEvent: 'render-event', // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
            //                 args: ['--no-sandbox', '--disable-setuid-sandbox'],
            //             }),
            //         }),
            //     ],
            // }
        },

        chainWebpack: config => {
            // 多页面处理
            if (isSPA) {
                handleHtml(config, null)
            } else {
                handleHtml(config, pages)
            }

            /* 跳过 babel-loader */
            config.module.rule('js').exclude.add(path => {
                return /[\\/]src[\\/]libs[\\/].+\.js$/.test(path)
            })

            const svgSpriteIconsDir = join(__dirname, './src/components/SvgIcon/icons/')
            config.module.rule('svg').exclude.add(svgSpriteIconsDir)
            config.module
                .rule('svg-sprite')
                .after('svg')
                .test(/\.(svg)(\?.*)?$/)
                .include.add(svgSpriteIconsDir)
                .end()
                .use('svg-sprite-loader')
                .loader('svg-sprite-loader')
                .options({ symbolId: 'svgSpriteIcon__[name]' })
                .end()
                .use('svgo-loader')
                .loader('svgo-loader')

            // /* @H5.vant */
            const vant = config.module
                .rule('less')
                .oneOf('vant')
                .before('vue-modules')
                .test(/[\\/]node_modules[\\/]vant[\\/]/)
            config.module
                .rule('less')
                .oneOf('normal')
                .toConfig()
                .use.forEach(({ __useName, loader, options = {} }) => {
                    const ops = _.cloneDeep(options)
                    if (__useName === 'less-loader') {
                        delete ops.globalVars
                        ops.modifyVars = {
                            hack: `true; @import '${join(__dirname, './src/vant/vars.less')}'`
                        }
                    }
                    vant.use(__useName)
                        .loader(loader)
                        .options(ops)
                })

            // if (config.plugins.has('copy')) {
            //     config.plugin('copy').tap(args => {
            //         args[0][0].ignore.push('.eslintrc.js', '.prettierrc.js')
            //         args[0][0].transform = function(content, path) {
            //             if (
            //                 /* 让 public 中的其它文件也支持 EJS 语法（传入运行时可用的环境变量） */
            //                 /\.(html|htm|js|json)$/.test(path) &&
            //                 /[\\/]public[\\/]libs[\\/]/.test(path) === false
            //             ) {
            //                 const options = {
            //                     interpolate: /<%=([\s\S]+?)%>/g,
            //                     sourceURL: path,
            //                 }
            //                 const obj = _.pickBy(env, (val, key) =>
            //                     /^(NODE_ENV|BASE_URL|VUE_APP_.*)$/.test(key),
            //                 )
            //                 content = _.template(`${content}`, options)(obj)
            //             }
            //             return content
            //         }
            //         return args
            //     })
            // }

            if (process.env.VUE_APP_GZIP === 'true') {
                const productionGzipExtensions = ['js', 'css']
                config.plugin('compressionPlugin').use(
                    new CompressionPlugin({
                        filename: '[path][base].gz', // 注意: compress版本不同配置不同
                        algorithm: 'gzip',
                        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                        threshold: 10240,
                        minRatio: 0.8
                    })
                )
            }
        },
        ...VUE_APP_ENTRY_CONFIG
    })
}

// if (env.NODE_ENV) {
//     if (
//         /^(development|production|test)$/.test(env.NODE_ENV) === false ||
//         /^(dev|stage|prod|test)$/.test(env.VUE_APP_ENV) === false ||
//         (env.NODE_ENV === 'development' && env.VUE_APP_ENV !== 'dev') ||
//         (env.NODE_ENV === 'production' && env.VUE_APP_ENV === 'dev') ||
//         (env.NODE_ENV === 'production' && env.VUE_APP_MOCK === undefined)
//     ) {
//         throw new Error('环境变量配置错误或不兼容或缺失')
//     }
// }
