'use strict';
/**
 *
 * @type {MySQLlDoc}
 * @author Konata9
 * github_addr: https://github.com/Konata9/mysql-doc
 */
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

module.exports = MySQLlDoc;