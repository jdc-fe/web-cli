const path = require('path');
const notifier = require('node-notifier');
const config = require('../config');
const packageConfig = require('../package.json');
const theme = require('../src/theme');

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoader = function (op) {
  const options = op;
  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap,
    }
  };
  if (op.cssModule) {
    Object.assign(cssLoader.options, {
      importLoaders: 1,
      modules: true,
    });
  }
  return cssLoader;
};

exports.cssLoaders = function (op) {
  let options = op;
  options = options || {};

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  function generateLoaders(loader, loaderOptions) {
    const { cssLoader } = exports;
    const loaders = options.usePostCSS
      ? [cssLoader(options), postcssLoader] : [cssLoader(options)];
    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        })
      });
    }
    return ['style-loader'].concat(loaders);
  }
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less',
      {
        javascriptEnabled: true,
        modifyVars: theme,
      }),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  };
};

exports.styleLoaders = function (options) {
  const output = [];
  const loaders = exports.cssLoaders(options);
  const keys = Object.keys(loaders);
  function overrideLoader(l, arr) { // l for loaders, o for replace loader array
    const clonel = JSON.parse(JSON.stringify(l));
    arr.forEach((lod) => {
      clonel.forEach((ele) => {
        const item = ele;
        if (item.loader === lod.loader) {
          Object.assign(item, lod);
        }
      });
    });
    return clonel;
  }
  keys.forEach((extension) => {
    const loader = loaders[extension];
    if (extension === 'less') {
      output.push({
        include: /node_modules/,
        test: new RegExp(`\\.${extension}$`),
        use: loader
      }, {
        exclude: /node_modules/,
        test: new RegExp(`\\.${extension}$`),
        use: overrideLoader(loader,
          [exports.cssLoader({
            ...options,
            cssModule: true
          }), {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: theme,
              relativeUrls: true,
            }
          }])
      });
    } else {
      output.push({
        test: new RegExp(`\\.${extension}$`),
        use: loader
      });
    }
  });
  return output;
};

exports.createNotifierCallback = () => (severity, errors) => {
  if (severity !== 'error') return;

  const error = errors[0];
  const filename = error.file && error.file.split('!').pop();

  notifier.notify({
    title: packageConfig.name,
    message: `${severity}: ${error.name}`,
    subtitle: filename || '',
    icon: path.join(__dirname, '../favicon.ico')
  });
};
