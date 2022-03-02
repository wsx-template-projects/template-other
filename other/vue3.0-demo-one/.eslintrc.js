module.exports = {
    root: true,
    env: {
        node: true,
    },
    // extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
    // extends: ['plugin:vue/essential', '@vue/standard'],
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        // indent: ['off', 2], // 缩进
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-new-func': 'off',
        'space-before-function-paren': 0,
        'no-unused-vars': 'off',
        'vue/no-v-model-argument': 'off',
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true,
            },
        },
    ],
}
