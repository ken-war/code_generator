/**
 * 数据库查询语句
 * @author Konata9
 * github_addr: https://github.com/Konata9/mysql-doc
 */

var option = require('./option')

module.exports = {
    tableQuery: `SHOW TABLES`,
    tableStructureQuery: `
  SELECT 
    TABLE_NAME AS ${option.COLUMNS.TABLE_NAME}, 
    COLUMN_NAME AS ${option.COLUMNS.COLUMN_NAME}, 
    COLUMN_TYPE AS ${option.COLUMNS.COLUMN_TYPE}, 
    IS_NULLABLE AS ${option.COLUMNS.IS_NULLABLE}, 
    COLUMN_DEFAULT AS ${option.COLUMNS.COLUMN_DEFAULT}, 
    COLUMN_KEY AS ${option.COLUMNS.COLUMN_KEY}, 
    EXTRA AS ${option.COLUMNS.EXTRA}, 
    COLUMN_COMMENT AS ${option.COLUMNS.COLUMN_COMMENT}, 
    CHARACTER_SET_NAME AS ${option.COLUMNS.CHARACTER_SET_NAME} 
  FROM 
    information_schema. COLUMNS 
  WHERE 
    TABLE_SCHEMA = ? 
  AND TABLE_NAME = ?`,
    indexQuery: `
  SELECT
    TABLE_NAME AS ${option.INDEX.TABLE_NAME},
    COLUMN_NAME AS ${option.INDEX.COLUMN_NAME},
    INDEX_NAME AS ${option.INDEX.INDEX_NAME},
    (CASE
      WHEN NON_UNIQUE = 0 THEN '是'
      WHEN NON_UNIQUE = 1 THEN '否'
    END)
    AS ${option.INDEX.NON_UNIQUE},
    SEQ_IN_INDEX AS ${option.INDEX.SEQ_IN_INDEX},
    NULLABLE AS ${option.INDEX.NULLABLE},
    INDEX_TYPE AS ${option.INDEX.INDEX_TYPE},
    SUB_PART AS ${option.INDEX.SUB_PART},
    INDEX_COMMENT AS ${option.INDEX.INDEX_COMMENT}
FROM
	information_schema.STATISTICS
WHERE
	TABLE_SCHEMA = ?
AND TABLE_NAME = ?`
}