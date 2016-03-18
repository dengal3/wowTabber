var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: {
        bundle: './src/js/app.js',
        background: './src/js/background.js'
    },
    output: {
        path: path.resolve(__dirname + '/build'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.less$/,
                loader: 'style!css!less!'
            }
        ]
    },
    devtool: "source-map"
};