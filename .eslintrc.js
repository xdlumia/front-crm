// https://eslint.org/docs/user-guide/configuring
/* eslint-disable */
module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    plugins: ['vue'],
    rules: {
        'generator-star-spacing': 'off',
        'no-trailing-spaces': 2,
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        "no-undef": 0,
        'indent': ['error', 'tab'],
        'no-tabs': 'off'
    },
    globals: {
        "uni": true
    }
}
