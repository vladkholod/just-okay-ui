const { merge } = require('webpack-merge');
const common = require('../webpack.common.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    entry: './live/index.ts',
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        static: './dist',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
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
