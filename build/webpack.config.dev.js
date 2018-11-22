const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
//样式文件分别打包
const ExtractTextPluginCss = new ExtractTextPlugin('scss/[name]/[name]-one.css');
const ExtractTextPluginScss = new ExtractTextPlugin('scss/[name]/[name]-two.css');
const ExtractTextPluginLess = new ExtractTextPlugin('scss/[name]/[name]-three.css');

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    index: "@/index.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),//编译输出的文件目录绝对路径
    filename: "js/index.js",
    publicPath: "/"
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', 'css', '.scss'],
    alias: {
      "vue": 'vue/dist/vue.js',
      "@": path.join(__dirname, "..")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.css/,
        use: ExtractTextPluginCss.extract({
          use: [
            {
              loader: "scss-loader",
              options: {importLoaders: 1}//1代表css-loader后还需要几个loader
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
              loader: "scss-loader",
              options: {importLoaders: 2}
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
              loader: "scss-loader",
              options: {importLoaders: 2}
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
    ]
  },
  devServer: {
    clientLogLevel: 'warning',//日志级别
    contentBase: false,//告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
    compress: true,//当它被设置为true的时候对所有的服务器资源采用gzip压缩
    historyApiFallback: false,//404页面是否跳转
    hot: true,//热替换加载
    host: "localhost",//域名
    port: 8080,//端口号
    open: false,//server启动后是否自动打开浏览器
    overlay: {//用来在编译出错的时候，在浏览器页面上显示错误
      warnings: false,
      errors: true
    },
    publicPath: "/",//此路径下的打包文件可在浏览器中访问
    quiet: false,//启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。意味着来自 webpack 的错误或警告在控制台不可见。
    watchOptions: {//监听文件变化，当它们修改后会重新编译。
      aggregateTimeout: 500,//当第一个文件更改，会在重新构建前增加延迟。以毫秒为单位
      poll: false,//是否开启轮询，如果开启则设置定时间隔时间
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),//实现页面自动刷新，与hot：true配对使用
    new HtmlWebpackPlugin({
      template: "index.html",//模板
      filename: "index.html",//文件名
      inject: true,//true: 默认值,script标签位于html文件的body底部;body:script标签位于html文件的body底部;head: script标签位于html文件的head中;false: 不插入生成的js文件，这个几乎不会用到的
    }),
    ExtractTextPluginCss,
    ExtractTextPluginScss,
    ExtractTextPluginLess
  ]

};