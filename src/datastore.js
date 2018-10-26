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
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '',
        // 数据库名字
        database: 'tset',
    }).write()
}
if (!db.has('generateConfig').value()) {
    db.set('generateConfig', {
        columnPrefix: 't_',
        tablePrefix: 't_',
        pojoPackage: 'com.ken.mall.pojo',
        daoPackage: 'com.ken.mall.dao',
        daoSuffix: 'Mapper',
        mapperSuffix: 'Mapper',
        JavaType: {
            'int': 'Integer',
            'varchar': 'String',
            'datetime': 'Date'
        }
    }).write()
}

export default db
