const path = require('path')

module.exports = (_, { defaultConfig }) => {
  defaultConfig['reactStrictMode'] = true

  if ('sassOptions' in defaultConfig) {
    defaultConfig['sassOptions'] = {
      includePaths: [path.join(__dirname, 'styles')],
      prependData: '@import "config.sass"',
    }
  }

  defaultConfig['webpack'] = (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      loader: '@svgr/webpack',
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [{ removeViewBox: false }],
        },
      },
    })
    return config
  }

  return defaultConfig
}
