const path = require('path')
module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@schemas': path.resolve(__dirname, 'src/schemas'),
      '@': path.resolve(__dirname, 'src/'),
    },
  }
  return config
}
