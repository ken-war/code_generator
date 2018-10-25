'use strict';
/**
 *
 * @type {MySQLlDoc}
 * @author Konata9
 * github_addr: https://github.com/Konata9/mysql-doc
 */

module.exports = class MySQLlDoc {
    constructor(config) {
        if (!config) {
            throw new Error(`缺少数据库配置参数`)
        } else {
            this.dbConfig = config.mysql
            this.database = this.dbConfig.database
            this.tableLists = []
            this.tableCollection = {}
        }
    }
}