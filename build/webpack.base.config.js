const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
   src: path.join(__dirname, '../src'),
   dist: path.join(__dirname, '../dist')
}

module.exports = {
   externals: {
      paths: PATHS 
   },
   entry: {
      app: `${PATHS.src}/js`
   },
   output: {
      filename: 'js/[name].[hash].js',
      path: PATHS.dist,
      publicPath: '/'
   },
   optimization: {
      splitChunks: {
         cacheGroups: {
            vendor: {
               name: 'vendors',
               test: /node_modules/,
               chunks: 'all',
               enforce: true
            }
         }
      }
   },
   module: {
      rules: [{
         test: /\.js$/,
         loader: 'babel-loader',
         exclude: '/node_modules'
      }, {
         test: /\.(jpg|png|svg|gif)$/,
         loader: 'file-loader',
         options: {
            name: '[name].[ext]'
         }
      },{
         test: /\.(woff|woff2|eot|ttf)$/,
         loader: 'file-loader',
         options: {
            name: '[name].[ext]'
         }
      }, {
         test: /\.css$/,
         use: [
            "style-loader",
            MiniCssExtractPlugin.loader,
            {
               loader: "css-loader",
               options: { sourceMap: true }
            }, {
               loader: "postcss-loader",
               options: { sourceMap: true, config: {path: './build/postcss.config.js'} }
            }
         ]
      }, {
         test: /\.s[ac]ss$/,
         use: [
            "style-loader",
            MiniCssExtractPlugin.loader,
            {
               loader: "css-loader",
               options: { sourceMap: true }
            }, {
               loader: "postcss-loader",
               options: { sourceMap: true, config: {path: './build/postcss.config.js'} }
            }, {
               loader: "sass-loader",
               options: { sourceMap: true }
            }
         ]
      }]
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: 'css/[name].[hash].css'
      }),
      new HtmlWebpackPlugin({
         template: `${PATHS.src}/index.html`,
         filename: './index.html'
      }),
      new CopyWebpackPlugin([
         { from: `${PATHS.src}/img`, to: 'img' },
         { from: `${PATHS.src}/fonts`, to: 'fonts' }
      ]),
      new CleanWebpackPlugin()
   ]
}