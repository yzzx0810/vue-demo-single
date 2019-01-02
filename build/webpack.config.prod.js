const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//样式文件分别打包
const ExtractTextPluginCss = new ExtractTextPlugin('css/[name]/[name]-one.[chunkhash].css');
const ExtractTextPluginScss = new ExtractTextPlugin('css/[name]/[name]-two.[chunkhash].css');
const ExtractTextPluginLess = new ExtractTextPlugin('css/[name]/[name]-three.[chunkhash].css');

module.exports = {
    mode: "production",
    devtool: "cheap-module-source-map",
    entry: {
        index: "@/index.js"
    },
    output: {
        path: path.resolve(__dirname, "../dist"),//编译输出的文件目录绝对路径
        filename: "js/[name].[chunkhash].js",
        publicPath: "./"//引入资源文件的前缀公共路径
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.css', '.scss'],
        alias: {
            "vue": 'vue/dist/vue.js',
            "@": path.join(__dirname, "..")
        }
    },
    module: {//loader加载执行顺序从右往左
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.css/,
                use: ExtractTextPluginCss.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {importLoaders: 1}//1代表css-loader后还需要几个loader
                        },
                        {
                            loader: "px2rem-loader",
                            options: {
                                remUnit: 40//设计稿/10
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {plugins: [require("autoprefixer")("last 100 versions")]}
                        }
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPluginScss.extract({
                    use: [
                        {
                            loader: "css-loader",
                            // options: {importLoaders: 1}
                        },
                        {
                            loader: "px2rem-loader",
                            options: {
                                remUnit: 40//设计稿/10
                            }
                        },
                        {
                            loader: "sass-loader"
                        },
                        {
                            loader: 'postcss-loader',
                            options: {plugins: [require("autoprefixer")("last 100 versions")]}
                        }
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPluginLess.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {importLoaders: 2}
                        },
                        {
                            loader: "px2rem-loader",
                            options: {
                                remUnit: 40//设计稿/10
                            }
                        },
                        {
                            loader: "less-loader"
                        },
                        {
                            loader: 'postcss-loader',
                            options: {plugins: [require("autoprefixer")("last 100 versions")]}
                        }
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "fonts/[name].[ext]"
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "image/[name].[ext]"
                }
            },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({}),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(
                ["dist"],//匹配删除的文件
                {
                    root: path.join(__dirname, ".."),//删除文件前缀根目录
                    verbose: true,//开启在控制台输出信息,将log写到 console.
                    dry: false//启用删除文件（不要删除任何东西，主要用于测试），true表示不删除，false表示删除
                }
        ),
        new HtmlWebpackPlugin({
            template: "index.html",//模板
            filename: "index.html",//文件名
            inject: true,//true: 默认值,script标签位于html文件的body底部;body:script标签位于html文件的body底部;head: script标签位于html文件的head中;false: 不插入生成的js文件，这个几乎不会用到的
        }),
        ExtractTextPluginCss,
        ExtractTextPluginScss,
        ExtractTextPluginLess,
    ],
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'all',//表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)(default=all);
            name: true,//拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
            minChunks: 1,//在分割之前模块的被引用次数(default=1)
            minSize: 30000,//代码块的最小尺寸(default=30000)
            maxAsyncRequests: 5,//按需加载最大并行请求数量(default=5)
            maxInitialRequests: 3,//一个入口的最大并行请求数量(default=3)
            automaticNameDelimiter: '~',
            cacheGroups: {//可以继承/覆盖上面 splitChunks 中所有的参数值
                vendors: {
                    name: "vendors",
                    chunks: "all",
                    test: /node_modules\//,//表示要过滤 modules，默认为所有的 modules，可匹配模块路径或 chunk 名字，当匹配的是 chunk 名字的时候，其里面的所有 modules 都会选中；
                    priority: 10,//表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，那么抽取到哪个就由权重最高的说了算；
                    reuseExistingChunk: true//表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
                },
            }
        },
        runtimeChunk: {
            name: "manifest"
        }
    }

};