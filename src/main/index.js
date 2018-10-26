const {app, BrowserWindow} = require('electron')
const {ipcMain} = require('electron')
import MySQLlDoc from './mysql'
import db from '../datastore'

ipcMain.on('getTableLists', (event) => {
    let mysqlDoc = new MySQLlDoc(db.read().get('mysqlConfig').value())
    mysqlDoc.openConnection()
        .then(() => {
            mysqlDoc.getTableLists().then(() => {
                event.sender.send('getTableLists', mysqlDoc.tableLists);
                mysqlDoc.closeConnection()
            }).catch(err => {
                mysqlDoc.closeConnection()
                throw new Error(err)
            })
        }).catch(err => {
        mysqlDoc.closeConnection()
        throw new Error(err)
    })
})
ipcMain.on('getTableStructure', (event, tableName) => {
    let mysqlDoc = new MySQLlDoc(db.read().get('mysqlConfig').value())
    mysqlDoc.openConnection()
        .then(() => {
            mysqlDoc.getTableStructure(tableName).then(() => {
                console.log(mysqlDoc.tableStructure);
                event.sender.send('getTableStructure', mysqlDoc.tableStructure);
                mysqlDoc.closeConnection()
            }).catch(err => {
                mysqlDoc.closeConnection()
                throw new Error(err)
            })
        }).catch(err => {
        mysqlDoc.closeConnection()
        throw new Error(err)
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
