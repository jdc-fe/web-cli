const path = require('path');

const { mode = 'dev' } = process.env;
// eslint-disable-next-line
const env = require(`./${mode}.env`);
// eslint-disable-next-line
console.log('mode =', mode, '\n');
module.exports = {
  env,
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // bundleAnalyzerReport: false
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    // Paths
    assetsSubDirectory: 'public',
    assetsPublicPath: '/',
    proxyTable: require('./dev.proxy'),

    // Various Dev Server settings
    host: '0.0.0.0',
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,
    /**
     * Source Maps
     */
    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    cacheBusting: true,

    cssSourceMap: false,
  },
  library: {
    lib: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'mobx-react',
      'mobx'
    ]
  }
};
