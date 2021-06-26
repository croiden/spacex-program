require('ignore-styles')

require('@babel/register')({
    ignore: [/(node_modules)/],
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
    plugins: ['@babel/plugin-syntax-dynamic-import', 'dynamic-import-node'],
})

require('./index')
