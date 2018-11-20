function buildConfig(env) {
  return require('./configs/webpack.' + env.environment + '.config.js')({ env: env })
}

module.exports = buildConfig;