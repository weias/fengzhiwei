// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../preview/app/index.html'),
    assetsRoot: path.resolve(__dirname, '../preview/app'),
    assetsSubDirectory: 'static',
    // 上线资源路径配置
    // assetsPublicPath: 'http://xx.xx.xx.xx/',
    // 本地开发资源路径
    assetsPublicPath: '',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8086,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/upload_clouds': {//有毒
        target: 'https://cloudtest.baoxuntech.com/v1',
        changeOrigin: true,
        pathRewrite:{
          '/upload_clouds': '/'
        }
      },
      '/clouds': {
        target: 'https://cloudtest.baoxuntech.com/clouds',
        changeOrigin: true,
        pathRewrite:{
          '/clouds': '/'
        }
      },
      '/v1': {
        target: 'https://apipowingerp.baoxuntech.com/v1',
        changeOrigin: true,
        pathRewrite:{
          '/v1': '/'
        }
      },
      '/v2': {
        target: 'https://apipowingerp.baoxuntech.com/v2',
        changeOrigin: true,
        pathRewrite:{
          '/v2': '/'
        }
      },
      '/powingerpImages': {
        target: 'https://apipowingerp.baoxuntech.com/powingerpImages',
        changeOrigin: true,
        pathRewrite:{
          '/powingerpImages': '/'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
