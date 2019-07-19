'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';


module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : false,
  entry: {
    index: './src/index.jsx',
  },
  output: {
    path: path.join(__dirname, './build/'),
    publicPath: '/build/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(s)?css$/,
        loader: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            'postcss-loader',
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                sourceMapContents: false,
              },
            },
          ],
        }),
      },
      {
        test: /\.(bmp|png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf|svg)((\?|#).*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'img/[name].[ext]',
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.scss'],
    alias: {

    },
  },
  externals: {
    react: 'React',
    'react-dom': 'var ReactDOM',
    'react-redux': 'var ReactRedux',
    'redux-thunk': 'var ReduxThunk.default',
    'react-router-dom': 'var ReactRouterDOM',
    redux: 'Redux',
    '@alife/aisc': 'var Aisc',
    '@alife/aisc-widgets': 'var AiscWidgets',
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true,
    }),
    new BrowserSyncPlugin({
      host: '127.0.0.1',
      port: 9002,
      proxy: 'http://127.0.0.1:9000/',
    }),
    !isDevelopment && process.env.CLEAR === 'true' && new CleanWebpackPlugin(), // 清空output.path目录
    !isDevelopment && new UglifyJsPlugin(),
    !isDevelopment && new OptimizeCssAssetsPlugin(),
  ].filter(Boolean),
};
