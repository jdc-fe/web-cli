const path = require('path');
const webpack = require('webpack');
const utils = require('./utils');
const config = require('../config');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    // path: 表示生成文件的根目录
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      src: path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        include: [resolve('src')],
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
        exclude: /node_modules/,
        options: {
          configFile: resolve('babel.config.js'),
          cacheDirectory: true, // 将 Babel 编译过的文件缓存起来
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
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
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.env,
    }),
    // eslint-disable-next-line
    ...Object.keys(config.library).map(name => new webpack.DllReferencePlugin({
      context: '',
      // eslint-disable-next-line
      manifest: require(`./${name}.manifest.json`),
    })),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|zh-cn/),
    new webpack.ProvidePlugin({
      request: ['src/util/request', 'default'],
    }),

  ]
};
