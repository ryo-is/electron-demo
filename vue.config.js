module.exports = {
  transpileDependencies: ['vuetify'],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      buildResources: 'electron-build',
      files: ['**/*', 'public/img/icons/**/*'],
    },
  },
}
