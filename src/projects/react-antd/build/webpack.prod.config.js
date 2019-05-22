const path = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const safeParser = require('postcss-safe-parser');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const utils = require('./utils');
const config = require('../config');
const baseWebpackConfig = require('./webpack.base.config');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}
const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('/node_modules/@babel/polyfill')],
        options: {
          configFile: resolve('babel.config.js'), // 很重要 不然uc-fun，vis不会编译
          cacheDirectory: true, // 将 Babel 编译过的文件缓存起来
        },
      },
      ...utils.styleLoaders({
        sourceMap: config.build.productionSourceMap,
        extract: true,
        usePostCSS: true
      })]
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[hash].js'),
    chunkFilename: utils.assetsPath('js/[id].[hash].js')
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          // drop_console: true // 打包之后的文件删除所有console.log
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),

    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[hash].css'),
      allChunks: true
    }),

    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        parser: safeParser,
        discardComments: {
          removeAll: true
        }
      }
    }),

    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: path.resolve(__dirname, '../public', 'index.html'),
      favicon: path.resolve(__dirname, '../favicon.ico'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),

    // eslint-disable-next-line
    new AddAssetHtmlPlugin(Object.keys(config.library).map((name) => {
      return {
        filepath: require.resolve(path.resolve(`./static/${name}.dll.js`)),
        includeSourcemap: false
      };
    })),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['*.dll.js']
      }
    ])
  ]
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(`\\.(${config.build.productionGzipExtensions.join('|')})$`),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

if (config.build.bundleAnalyzerReport) {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  webpackConfig.plugins.push(new BundleAnalyzerPlugin(
    // 自动部署环境下要用static模式
    {
      analyzerMode: 'static', openAnalyzer: false,
    }
  ));
}

module.exports = webpackConfig;
