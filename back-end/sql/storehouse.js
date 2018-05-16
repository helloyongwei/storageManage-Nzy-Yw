/**
 * @module 仓库处理sql
 */
const sequelize = require('./sequelize')
const errMsg = require('../static/errMsg')
const consoleUtil = require('../util/console')

const selectSql = 'SELECT * FROM storehouse LIMIT :offset, :limit'
const defaultOffset = 0
const defaultLength = 5

const selectByIdSql = 'SELECT * FROM storehouse WHERE storeHouse_id=:id'

const insertSql = 'INSERT INTO storehouse (name, location, size) VALUES (:name, :location, :size)'

module.exports = {
  selectStorehouses,
  selectStorehouseById,
  insertStorehouse
}

/**
 * 获取仓库信息
 * @param {number|string} offset 起点
 * @param {number|string} limit 长度
 * @return {Promise}
 * @example
 * [ { storeHouse_id: 3, name: '香樟园', location: '南', size: '850平方米' },
 *   {....}]
 */
function selectStorehouses (offset, limit) {
  offset = offset || defaultOffset
  limit = limit || defaultLength
  offset -= 0
  limit -= 0

  return new Promise((resolve, reject) => {
    sequelize.query(selectSql, {
      replacements: {offset, limit},
      type: sequelize.QueryTypes.SELECT
    }).then(storehouses => {
      resolve(storehouses)
    }).catch(err => {
      consoleUtil.consoleError(err)
      reject(JSON.stringify(errMsg.errSqlSystemError))
    })
  })
}

/**
 * 查询指定id仓库
 * @param {number|string} id storehouse的id
 * @returns {Promise}
 * @example[ { storeHouse_id: 3, name: '香樟园', location: '南', size: '850平方米' }]
 */
function selectStorehouseById (id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject(new Error(JSON.stringify(errMsg.errSqlInsertParamLack)))
      return
    }
    sequelize.query(selectByIdSql, {
      replacements: {id},
      type: sequelize.QueryTypes.SELECT
    }).then(storehouse => {
      resolve(storehouse)
    }).catch(err => {
      consoleUtil.consoleError(err)
      reject(JSON.stringify(errMsg.errSqlSystemError))
    })
  })
}

/**
 * 插入一个仓库信息
 * @param {Object} storehouse - 仓库
 * @param {string} storehouse.name - 名称
 * @param {string} storehouse.location - 地址
 * @param {string} storehouse.size - 大小
 * @returns {Promise} 返回[a,b] a--id b--count
 */
function insertStorehouse (storehouse) {
  return new Promise((resolve, reject) => {
    if (!storehouse || !storehouse.name || !storehouse.location || !storehouse.size) {
      reject(new Error(JSON.stringify(errMsg.errSqlInsertParamLack)))
      return
    }
    sequelize.query(insertSql, {
      replacements: {name: storehouse.name, location: storehouse.location, size: storehouse.size},
      type: sequelize.QueryTypes.INSERT
    })
      .then(result => {
        storehouse.storeHouse_id = result[0]
        resolve(storehouse)
      })
      .catch(err => {
        consoleUtil.consoleError(err)
        reject(new Error(JSON.stringify(errMsg.errSqlSystemError)))
      })
  })
}
