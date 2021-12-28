const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");
const webpack = require("webpack");

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: `todo_${require("./package.json").version}.js`,
    },
});