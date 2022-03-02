// module.exports = {
//   root: true,
//   env: {
//     node: true
//   },
//   extends: ['plugin:vue/essential', '@vue/standard'],
//   rules: {
//     'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//     'no-new-func': 'off',
//     'space-before-function-paren': 0
//   },
//   parserOptions: {
//     parser: 'babel-eslint'
//   }
// }

module.exports = {
    root: true,
    env: { node: true },

    globals: {
        BMap: true,
        BMapGL: true
    },

    extends: [
        'plugin:vue/strongly-recommended', // 使用严谨模式
        'eslint:recommended',
        '@vue/prettier' // 结合 .prettierrc.js
    ],

    rules: {
        'vue/no-unused-components': 'warn',
        'no-useless-escape': 'warn',
        'no-undef': 'warn',
        'no-prototype-builtins': 'warn',
        'no-console': 'off',
        'no-debugger': 'warn',
        'no-unused-vars': [
            'off',
            {
                ignoreRestSiblings: true /* 解构剩余变量时不检查 */,
                varsIgnorePattern: '^h$' // 支持 JSX 的 h 变量
            }
        ],
        'no-var': 'warn',
        'prefer-const': ['off', { destructuring: 'all' }],
        'no-empty': 'warn',

        semi: 0, //  结尾有分号

        parser: 'vue-eslint-parser'
    },

    parserOptions: {
        // parser: '@typescript-eslint/parser'
        // ecmaVersion: 7,
        // sourceType: 'module'
        parser: 'babel-eslint',
        sourceType: 'module'
    },

    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: { jest: true }
        }
    ],
    // extends: ['plugin:vue/essential', '@vue/standard'],
    extends: ['plugin:vue/strongly-recommended', 'eslint:recommended', '@vue/prettier']
    // extends: ['plugin:vue/strongly-recommended', 'eslint:recommended', '@vue/prettier', '@vue/typescript']
}
