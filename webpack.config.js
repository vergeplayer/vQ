/**
 * webpack.config
 * Copyright 2016 1VERGE Inc, webpack.config.js
 * MIT Licensed
 * @since 2016/4/7.
 * @modify 2016/4/7.
 * @author zhengzk
 **/
var webpack = require('webpack'),
    path = require('path'),
    pkg = require('./package.json'),
    debug = (process.env.NODE_ENV !== 'production');

/**
 * 获取版本信息
 * @returns {string}
 */
var getNoteStr = function () {
    var timeStr = ( new Date() ).toISOString().replace( /:\d+\.\d+Z$/, "Z" );

    return pkg.name + ' <' + pkg.version + '@' + timeStr + '>' +
        ' | Copyright (c) 2015-2016 1VERGE, Inc' +
        ' | Released under the MIT license' +
        ' | https://github.com/vergeplayer/vQ/blob/master/LICENSE';
};

var config = {
    entry: "src/js/index.js",
    output: {
        path: debug ? 'dest':'build/',
        filename: pkg.name + (debug ? '':'.min') + '.js',
        library: pkg.name,
        libraryTarget:"umd"//"umd" "commonjs"
    },
    resolve: {
        alias: {
            js: "src/js",
            js$: "src/js"
        },
        root: [path.resolve('.')],
        extensions: ['', '.js']
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loaders: ["jscs-loader", "eslint-loader"],
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'replace-loader',
                query: {
                    replace:[{
                        from: '@VERSION',
                        to: pkg.version
                    },{
                        from: '@NAME',
                        to: pkg.name
                    }]
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(getNoteStr())
    ],
    eslint: {
        configFile: '.eslintrc',
        emitError: true
    }
};

if (!debug) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                drop_console: true
            },
            preserveComments: 'some'
        })
    );
}

module.exports = config;