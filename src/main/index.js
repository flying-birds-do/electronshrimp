import { app, BrowserWindow, ipcMain , Tray} from 'electron'
const appIcon = null;
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  appIcon = new Tray('@/assets/images/logo.jpg');
  console.log(appIcon)
  console.log('000')
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ]);
  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu);
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 800,
    useContentSize: true,
    width: 1000,
    frame: false,
    // fullscreen: true,
    webPreferences: {
      nodeIntegration: true
    },
    // 会导致无法关闭没有默认的按钮了
    // fullscreen: true
  })
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// 主进程接收 发送 消息
ipcMain.on('synchronous-message', function(event, arg) {
  if(arg =='close') {
    if (process.platform !== 'darwin') {
      // app.quit()
      // mainWindow.hide(); 
      mainWindow.setSkipTaskbar(true);
      event.preventDefault();
      
    }
  }
  // event.sender.send('asynchronous-reply', 'pong');
  });
// ipcMain.on('synchronous-message', function(event, arg) {
//   console.log(arg); // prints "ping"
//   event.returnValue = 'pong';
//   });
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
