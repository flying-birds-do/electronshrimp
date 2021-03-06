import { app, BrowserWindow, ipcMain , Tray, dialog} from 'electron'

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
let musicWin = null;
function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 800,
    useContentSize: true,
    width: 800,
    transparent:false,
    // 禁用系统默认窗口
    frame: false,
    show:false,
    // fullscreen: true,
    // 启用node
    // resizable:false,
    webPreferences: {
      // nodeIntegration: true,
      webSecurity:false
    },
    // 会导致无法关闭没有默认的按钮了
    fullscreen: true
  })
  mainWindow.loadURL(winURL)
  // mainWindow.maximize()
  mainWindow.show()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
let fs = require('fs-extra');
let path = require('path');
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
  if(arg ==='close') {
    if (process.platform !== 'darwin') {
      app.quit()
      // mainWindow.hide(); 
      // mainWindow.setSkipTaskbar(true);
      // event.preventDefault();
      
    }
  } else if(arg=== 'min') {
    mainWindow.minimize();
  } else if(arg === 'max') {
    mainWindow.maximize();
  }
  // event.sender.send('asynchronous-reply', 'pong');
  });
ipcMain.on('musicWords', (event) => {
 musicWin = new BrowserWindow({
    width:800,
    height:120,
    frame:false,
    resizable:true,
    transparent: true,
    // parent:mainWindow
  })
  musicWin.loadURL(winURL +`#/musicword`)
  // musicWin.webContents.closeDevTools();
})
// 关闭歌词
ipcMain.on('closemusicWords', (event) => {
  musicWin.close();
})
let configDir = app.getPath('userData')
console.log(configDir)
console.log('我是路径')
// 写入名字
ipcMain.on('setting-file', (event,name) => {
  let obj = JSON.stringify({
    name:name
  })
 fs.writeFile(configDir+'config.txt',obj,(err)=>{
  if(err) {
    console.log('err')
  } else {
    console.log('file sucess')
  }
 })
})


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
