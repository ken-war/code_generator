const {app, BrowserWindow} = require('electron')
const {ipcMain} = require('electron')
var mysql = require('mysql')
var async = require('async')
var queryModel = require('./queryModel')

class MySQLlDoc {
    constructor(config) {
        if (!config) {
            throw new Error(`缺少数据库配置参数`)
        } else {
            this.dbConfig = config.mysql
            this.database = this.dbConfig.database
            this.connection = mysql.createConnection(this.dbConfig)
            this.tableLists = []
            this.tableCollection = {}
        }
    }

    openConnection() {
        return new Promise((resolve, reject) => {
            this.connection.connect(err => {
                if (err) {
                    console.log(`数据库 ${this.database} 连接时发生异常`)
                    reject(new Error(err))
                } else {
                    console.log(` === 数据库 ${this.database} 连接成功 ===`)
                    resolve()
                }
            })
        })
    }

    closeConnection() {
        console.log(` === 数据库 ${this.database} 连接关闭 ===`)
        this.connection.end(err => {
            if (err) {
                throw new Error(err)
            }
        })
    }

    getTableLists() {
        return new Promise((resolve, reject) => {
            this.connection.query(queryModel.tableQuery, (err, result, fields) => {
                if (err) {
                    console.log(`获取表信息时发生错误`)
                    reject(new Error(err))
                } else {
                    result.forEach(item => {
                        for (var key in item) {
                            this.tableLists.push(item[key])
                        }
                    })
                    resolve()
                }
            })
        })
    }

    getTableStructure() {
        return new Promise((resolve, reject) => {
            async.map(this.tableLists, (table, callback) => {
                this.connection.query(queryModel.tableStructureQuery, [this.database, table], (err, result, fields) => {
                    if (err) {
                        console.log(`获取表结构时发生错误`)
                        throw new Error(err)
                    } else {
                        this.tableCollection[table] = {}
                        this.tableCollection[table]['table'] = this.dataClean(result)
                        this.getIndexStructure(table, () => {
                            callback()
                        })
                    }
                })
            }, (err, result) => {
                if (err) {
                    console.log(`获取表结构时发生错误`)
                    reject(new Error(err))
                } else {
                    resolve()
                }
            })
        })
    }

}

ipcMain.on('getTableLists', (event, arg) => {
    console.log(arg) // prints "ping"
    let mysqlDoc = new MySQLlDoc(arg)
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
        height: 563,
        useContentSize: true,
        width: 1000
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
