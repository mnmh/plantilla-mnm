var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'assets/js'),
        filename: 'index.js'
    },
    mode: 'development',
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};