const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { library } = require('../config');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}
module.exports = {
  mode: 'none',
  // 读取library.entry 里配置的node_module
  entry: library,
  // 输出到static文件夹下面， 补充知识[vue项目目录之static]
  output: {
    path: path.resolve(__dirname, '../static'),
    filename: '[name].dll.js',
    library: '[name]_library',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('/node_modules/react'),
          resolve('/node_modules/react-dom'),
          resolve('/node_modules/mobx-react'),
          resolve('/node_modules/mobx'),
          resolve('/node_modules/react-router'),
          resolve('/node_modules/react-router-dom'),
        ],
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                useBuiltIns: 'entry',
                corejs: { version: 3, proposals: true },
                shippedProposals: true,
                targets: { ie: 9 }
              }
            ],
            ['@babel/preset-react'],
          ],
          plugins: [
            ['@babel/plugin-syntax-dynamic-import'],
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            [
              '@babel/plugin-transform-runtime',
              {
                corejs: { version: 3, proposals: true },
              }
            ],
            '@babel/plugin-proposal-class-properties',
          ],
          cacheDirectory: true, // 将 Babel 编译过的文件缓存起来
        },
      }
    ]
  },
  plugins: [
    // 文件输出到 ./build/manifest.json 中
    new webpack.DllPlugin({
      path: path.resolve(
        __dirname, './',
        '[name].manifest.json'
      ),
      name: '[name]_library',
    }),
    // 压缩打包的文件
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
    })
  ]
};
