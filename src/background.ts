import { app, Tray } from 'electron'

let tray: Tray | null

app.on('ready', () => {
  console.log(__dirname, process.env.NODE_ENV)
  const iconPath =
    process.env.NODE_ENV === 'development'
      ? __dirname + '/../public/img/icons/app-icon.png'
      : __dirname + '/bundled/img/icons/app-icon.png'
  console.log(iconPath)
  tray = new Tray(iconPath)
})
