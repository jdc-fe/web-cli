const basePrefix = 'http://101.124.11.248:8092';

const urls = [
  '/'
];
const proxy = {};

urls.forEach((url) => {
  const prefix = basePrefix;
  proxy[url] = {
    target: prefix + url,
    changeOrigin: true,
    pathRewrite: {
      [`^${url}`]: ''
    }
  };
});

module.exports = proxy;
