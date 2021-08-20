const path = require('path')

module.exports = (phase, { defaultConfig }) => {
  defaultConfig['reactStrictMode'] = true

  if ('sassOptions' in defaultConfig) {
    defaultConfig['sassOptions'] = {
      includePaths: [path.join(__dirname, 'styles')],
      prependData: `@import "config.sass"`,
    }
  }

  return defaultConfig
}
