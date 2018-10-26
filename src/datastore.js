import Datastore from 'lowdb'
import LodashId from 'lodash-id'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import fs from 'fs-extra'
import {remote, app} from 'electron'

const APP = process.type === 'renderer' ? remote.app : app
const STORE_PATH = APP.getPath('userData')

if (process.type !== 'renderer') {
    if (!fs.pathExistsSync(STORE_PATH)) {
        fs.mkdirpSync(STORE_PATH)
    }
}
console.log(STORE_PATH);
const adapter = new FileSync(path.join(STORE_PATH, '/data.json'))

const db = Datastore(adapter)
db._.mixin(LodashId)

if (!db.has('mysqlConfig').value()) {
    db.set('mysqlConfig', {
        host: '118.25.40.157',
        port: '3306',
        user: 'ceshi',
        password: 'ken@ceshimysql',
        // 数据库名字
        database: 'roomservice',
    }).write()
}

export default db
