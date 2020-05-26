'use strict'

import path from 'path'
import {
  app,
  protocol,
  BrowserWindow,
  Tray,
  powerMonitor,
  Notification,
} from 'electron'
import {
  createProtocol,
  /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null
let tray: Tray
let notification: Notification

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 300,
    height: 600,
    x: 0,
    y: 0,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION as
        | boolean
        | undefined,
    },
    show: false,
    minimizable: false,
    maximizable: false,
    center: true,
    resizable: false,
    movable: false,
    frame: false,
    icon: path.join(__dirname, '/../build/icon.icns'),
  })
  notification = new Notification()

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('blur', () => {
    if (win !== null) win.hide()
  })

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }
  createWindow()

  // powerMonitor.on('suspend', () => {
  //   console.log('suspend')
  // })

  // powerMonitor.on('resume', () => {
  //   console.log('resume')
  // })

  // powerMonitor.on('lock-screen', () => {
  //   console.log('lock screen')
  // })

  powerMonitor.on('unlock-screen', () => {
    // console.log('unlock screen')
    notification.title = 'Pomodoro Timer'
    notification.body = 'Welcome back'
    notification.show()
  })

  const iconPath = path.join(__dirname, '/../public/app-icon.png')
  tray = new Tray(iconPath)
  tray.on('click', (_event, bounds) => {
    if (win === null) createWindow()
    const window: BrowserWindow = win as BrowserWindow
    if (window.isVisible()) {
      window.hide()
    } else {
      window.setBounds({
        x: bounds.x - 138,
        y: bounds.y + 28,
      })
      window.show()
    }
  })
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
