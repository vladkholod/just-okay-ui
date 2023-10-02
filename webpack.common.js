const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }, {
                test: /\.s[ac]ss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            }, {
                test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                use: 'base64-inline-loader?limit=1000&name=[name].[ext]',
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new ESLintPlugin({
            fix: true,
            extensions: ['ts'],
            exclude: '/node_modules/',
            // Output ESLint results to console or file
            emitError: true,
            emitWarning: true,
            failOnError: true,
            failOnWarning: false,
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        library: 'just-okay-ui',
        libraryTarget: 'umd',
        globalObject: 'this',
        clean: true,
    },
};
