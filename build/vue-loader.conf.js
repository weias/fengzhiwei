var utils = require('./utils')
var config = require('../config')

function isProduction () {
  return (process.env.NODE_ENV === 'production');
}

function getSourceMap () {
  if (process.env.NODE_ENV === 'production') {
    return config.build.productionSourceMap;
  }

  return config.dev.cssSourceMap;
}

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: getSourceMap(),
    extract: isProduction()
  })
}
