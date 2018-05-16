/**
 * @module 物资处理sql
 */
const sequelize = require('./sequelize')
const errMsg = require('../static/errMsg')
const consoleUtil = require('../util/console')

const selectSql = 'SELECT * FROM material LIMIT :offset, :limit'
const defaultOffset = 0
const defaultLength = 5

const selectByIdSql = 'SELECT * FROM material WHERE materials_id=:id'

const insertSql = 'INSERT INTO material (name, description) VALUES (:name, :description)'

module.exports = {
  selectMaterials,
  selectMaterialById,
  insertMaterial
}

/**
 * 获取物资信息
 * @param {number|string} offset 起点
 * @param {number|string} limit 长度
 * @return {Promise}
 * @example
 * [ { materials_id: 3, name: '电脑', dekscription: '苹果, 联想, 雷神' },
  { materials_id: 5, name: '风扇', dekscription: '小功率' } ]
 */
function selectMaterials (offset, limit) {
  offset = offset || defaultOffset
  limit = limit || defaultLength
  offset -= 0
  limit -= 0

  return new Promise((resolve, reject) => {
    sequelize.query(selectSql, {
      replacements: {offset, limit},
      type: sequelize.QueryTypes.SELECT
    }).then(materials => {
      resolve(materials)
    }).catch(err => {
      consoleUtil.consoleError(err)
      reject(JSON.stringify(errMsg.errSqlSystemError))
    })
  })
}

/**
 * 查询指定id物资
 * @param {number|string} id 物资的id
 * @returns {Promise}
 * @example [ { materials_id: 2, name: '长椅', dekscription: null } ]
 */
function selectMaterialById (id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject(new Error(JSON.stringify(errMsg.errSqlInsertParamLack)))
      return
    }
    sequelize.query(selectByIdSql, {
      replacements: {id},
      type: sequelize.QueryTypes.SELECT
    }).then(material => {
      resolve(material)
    }).catch(err => {
      consoleUtil.consoleError(err)
      reject(JSON.stringify(errMsg.errSqlSystemError))
    })
  })
}

/**
 * 插入一个物资
 * @param {Object} material - 新物资
 * @param {string} material.name - 物资名称
 * @param {string} material.description - 描述
 * @returns {Promise} 返回[a,b] a--id b--count
 */
function insertMaterial (material) {
  return new Promise((resolve, reject) => {
    if (!material || !material.name || !material.description) {
      reject(new Error(JSON.stringify(errMsg.errSqlInsertParamLack)))
      return
    }
    sequelize.query(insertSql, {
      replacements: {name: material.name, description: material.description},
      type: sequelize.QueryTypes.INSERT
    })
      .then(result => {
        material.materials_id = result[0]
        resolve(material)
      })
      .catch(err => {
        consoleUtil.consoleError(err)
        reject(new Error(JSON.stringify(errMsg.errSqlSystemError)))
      })
  })
}
