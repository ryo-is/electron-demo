module.exports = {
  transpileDependencies: ['vuetify'],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        files: ['**/*', 'build/icon.*'],
        extraResources: ['public/app-icon.png'],
      },
    },
  },
}
