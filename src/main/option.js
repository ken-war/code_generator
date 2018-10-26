/**
 * @author Konata9
 * github_addr: https://github.com/Konata9/mysql-doc
 * 用于配置excel相关的文件
 */

module.exports = {
    COLUMNS_CN: {
        TABLE_NAME: '表名',
        COLUMN_NAME: '字段名',
        COLUMN_TYPE: '字段类型',
        DATA_TYPE: '数据类型',
        IS_NULLABLE: '是否为空',
        COLUMN_DEFAULT: '默认值',
        COLUMN_KEY: '键值',
        EXTRA: '特殊',
        COLUMN_COMMENT: '注释',
        CHARACTER_SET_NAME: '字符集'
    },
    COLUMNS: { //EN
        TABLE_NAME: 'tableName',
        COLUMN_NAME: 'name',
        COLUMN_TYPE: 'columnName',
        DATA_TYPE: 'typeName',
        IS_NULLABLE: 'isNullable',
        COLUMN_DEFAULT: 'columnDefault',
        COLUMN_KEY: 'columnKey',
        EXTRA: 'extra',
        COLUMN_COMMENT: 'remark',
        CHARACTER_SET_NAME: 'characterSetName'
    },
    INDEX: {
        TABLE_NAME: '表名',
        COLUMN_NAME: '字段名',
        INDEX_NAME: '索引',
        NON_UNIQUE: '是否唯一',
        SEQ_IN_INDEX: '索引顺序',
        NULLABLE: '是否为空',
        INDEX_TYPE: '索引类型',
        SUB_PART: '索引长度',
        INDEX_COMMENT: '注释'
    }
}