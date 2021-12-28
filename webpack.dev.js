const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        static: path.resolve(__dirname, './dist'),
        proxy: {
            '/api/': {
                target: 'http://localhost:8096/',
            },
        }
    },
});