const {app, BrowserWindow} = require('electron')
const {ipcMain} = require('electron')
import MySQLlDoc from './mysql'
import db from '../datastore'

ipcMain.on('getTableLists', (event) => {
    let mysqlDoc = new MySQLlDoc(db.read().get('mysqlConfig').value())
    mysqlDoc.openConnection()
        .then(() => {
            mysqlDoc.getTableLists().then(() => {
                event.returnValue = {
                    data: mysqlDoc.tableLists,
                    status: 0,
                    msg: '数据库表获取成功'
                }
            }).catch(err => {
                event.returnValue = {
                    data: '',
                    status: 1,
                    msg: '数据库表获取失败：' + err
                }
            })
        }).catch(err => {
        console.log('连接数据库时出错：'+ err)
        event.returnValue = {
            status: 1,
            msg: '连接数据库时出错：' + err
        }
    }).finally(() => {
        mysqlDoc.closeConnection().catch(err => {
            console.log('关闭连接时出错'+ err)
        })
    })
})
ipcMain.on('getTableStructure', (event, tableName) => {
    let mysqlDoc = new MySQLlDoc(db.read().get('mysqlConfig').value())
    mysqlDoc.openConnection()
        .then(() => {
            mysqlDoc.getTableStructure(tableName).then(() => {
                event.returnValue = {
                    data: mysqlDoc.tableStructure,
                    status: 0,
                    msg: '数据库表结构获取成功'
                }
            }).catch(err => {
                event.returnValue = {
                    data: mysqlDoc.tableStructure,
                    status: 1,
                    msg: '数据库表结构获取失败：'+err
                }
            })
        }).catch(err => {
        event.returnValue = {
            data: mysqlDoc.tableStructure,
            status: 1,
            msg: '连接数据库时出错：'+err
        }
    }).finally(() =>{
        mysqlDoc.closeConnection().catch(err => {
            console.log('关闭连接时出错'+ err)
        })
    })
})

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

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 1020,
        useContentSize: true,
        width: 1920
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
