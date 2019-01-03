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
    // 此处为初始化数据，需要在前端提供相应的配置
    db.set('generateConfig', {
        columnPrefix: 't_',
        tablePrefix: 't_',
        javaPackage: 'com.ken.mall',
        daoSuffix: 'Mapper',
        mapperSuffix: 'Mapper',
        JavaType: [
            {
                mysqlType: 'int',
                javaType: 'Integer'
            },
            {
                mysqlType: 'varchar',
                javaType: 'String'
            },
            {
                mysqlType: 'datetime',
                javaType: 'Date'
            },
            {
                mysqlType: 'bigint',
                javaType: 'Long'
            },
            {
                mysqlType: 'decimal',
                javaType: 'BigDecimal'
            }
        ],
        addMethod: 'add',
        deleteMethod: 'delete',
        updateMethod: 'update',
        selectMethod: 'select',
        serviceName: 'DemoService'
    }).write()
}

export default db
