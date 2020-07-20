
const path = require('path');
const Webpack = require('webpack'); //访问内置的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HappyPackPlugin = require('./happypack.plugin');
let utils = require('./utils')
// let config = require('./index')

// const commonConfig
module.exports = {
    mode: 'production',
    context: utils.resolve('/'),
    name: "vendor",
    //要打包的模块的数组
    entry: {
        vendor: [
            '@babel/polyfill',
            'core-js',
            'vue',
            'vue-router',
            'vuex',
            'vuex-router-sync',
            'axios',
            'lodash',
            'immer',
            // 'iview',
        ]
    },
    output: {
        path: utils.resolve('libs'),  // config.build.assetsRoot+
        filename: '[name].dll.js',
        // filename: '[name].[hash]js',
        chunkFilename: '[name].dll.[chunkhash].js',  //决定 non-entry chunk(非入口 chunk) 的名称
        library: '[name]_dll_[hash]',
        libraryTarget: 'umd',
        publicPath: "/"
    },
    module: {
        rules: [
            // Disable require.ensure as it's not a standard language feature.
            { parser: { requireEnsure: false } },
            {
                test: /\.vue$/,
                // loader: 'vue-loader',
                // options: vueLoaderConfig
                loader: 'happypack/loader?id=vue'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /\/node_modules\//,
                include: [
                    utils.resolve('src'),
                    utils.resolve('test'),
                ],
                // loader: 'babel-loader',
                use: 'happypack/loader?id=babel'
            },
            // {
            //     test: /\.(css|less|stylus)$/,
            //     // 现在用下面的方式替换成 happypack/loader，并使用 id 指定创建的 HappyPack 插件
            //     use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=styles']
            // },
            // {
            //     test: /\.s[ac]ss$/i,
            //     // use: [...utils.styleLoaders({ usePostCSS: false })]
            //     use: [MiniCssExtractPlugin.loader, "happypack/loader?id=sass"],
            // },
            // {
            //     test: /\.(css|less|sass|scss|stylus)$/,
            //     use: [MiniCssExtractPlugin.loader, 'happypack/loader?id=styles'],
            // },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('images/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    // optimization: {
    //     // 如果所有代码都不包含 side effect，我们就可以简单地将该属性标记为 false，来告知 webpack，它可以安全地删除未用到的 export。
    //     sideEffects: true
	// },
    plugins: [
        new Webpack.ProgressPlugin(),
        // 清除上一次生成的文件
        new CleanWebpackPlugin({
            root: utils.resolve('libs'), // 绝对路径 utils.resolve('/dist'),
            verbose: true, // 是否显示到控制台
            dry: false // 不删除所有
        }),
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            chunkFilename: "static/css/[id].[contenthash].css"
        }),
        new Webpack.DllPlugin({
            context: utils.resolve('libs'),
            path: utils.resolve('libs/[name]-dll-manifest.json'),
            name: '[name]_dll_[hash]',
        }),
        // ...HappyPackPlugin
    ],
};