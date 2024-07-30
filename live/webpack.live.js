const { merge } = require('webpack-merge');
const common = require('../webpack.common.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    entry: './live/index.ts',
    mode: 'development',
    watch: true,
    devtool: 'eval-source-map',
    devServer: {
        static: '../dist-live',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist-live'),
        clean: true,
    },
    plugins: [
        ...common.plugins,
        new HtmlWebpackPlugin({
            title: 'JO live',
            template: './live/index.html',
        }),
    ]
});
