module.exports = {
    root: true,
    env: {
        node: true,
    },
    // 全局实例配置,如下为百度地图全局实例 BMap
    globals: {
        BMap: true,
        AMap: true,
        qq: true,
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-unused-vars': 'off',
    },
}
