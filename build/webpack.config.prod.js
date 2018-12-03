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
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    index: "@/index.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),//编译输出的文件目录绝对路径
    filename: "js/[name].[chunkhash].js",
    publicPath: "/"
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
  ]

};