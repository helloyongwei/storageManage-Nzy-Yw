/**
 * @module 供应商处理sql
 */
const sequelize = require('./sequelize')
const errMsg = require('../static/errMsg')
const consoleUtil = require('../util/console')

const selectSql = 'SELECT * FROM supplier LIMIT :offset, :limit'
const defaultOffset = 0
const defaultLength = 5

const selectByIdSql = 'SELECT * FROM supplier WHERE supplier_id=:id'

const insertSql = 'INSERT INTO supplier (name, tel, address) VALUES (:name, :tel, :address)'

module.exports = {
  selectSuppliers,
  selectSupplierById,
  insertSuppliers
}

/**
 * 获取供应商信息
 * @param {number} offset 起点
 * @param {number} limit 长度
 * @return {Promise}
 * @example
 * [{ supplier_id: 1, name: '阿里巴巴', tel: '111111', address: '杭州'},
  { supplier_id: 2, name: '百度', tel: '222222', address: '上海' }]
 */
function selectSuppliers (offset, limit) {
  offset = offset || defaultOffset
  limit = limit || defaultLength
  offset = offset - 0
  limit = limit - 0
  return new Promise((resolve, reject) => {
    sequelize.query(selectSql, {
      replacements: {offset, limit},
      type: sequelize.QueryTypes.SELECT
    }).then(suppliers => {
      resolve(suppliers)
    }).catch(err => {
      consoleUtil.consoleError(err)
      reject(JSON.stringify(errMsg.errSqlSystemError))
    })
  })
}

/**
 * 查询指定id供应商
 * @param {number|string} id supplier的id
 * @returns {Promise}
 * @example [{supplier_id: 3, name: '亚马逊', tel: '333333', address: '纽约'}]
 */
function selectSupplierById (id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject(new Error(JSON.stringify(errMsg.errSqlInsertParamLack)))
      return
    }
    sequelize.query(selectByIdSql, {
      replacements: {id},
      type: sequelize.QueryTypes.SELECT
    }).then(supplier => {
      resolve(supplier)
    }).catch(err => {
      consoleUtil.consoleError(err)
      reject(JSON.stringify(errMsg.errSqlSystemError))
    })
  })
}

/**
 * 插入一个供应商息
 * @param {Object} supplier - 供应商
 * @param {string} supplier.name - 名称
 * @param {string} supplier.tel - 电话
 * @param {string} supplier.address - 地址
 * @returns {Promise} supplier
 */
function insertSuppliers (supplier) {
  return new Promise((resolve, reject) => {
    if (!supplier || !supplier.name || !supplier.tel || !supplier.address) {
      reject(new Error(JSON.stringify(errMsg.errSqlInsertParamLack)))
      return
    }
    sequelize.query(insertSql, {
      replacements: {name: supplier.name, tel: supplier.tel, address: supplier.address},
      type: sequelize.QueryTypes.INSERT
    })
      .then(result => {
        supplier.supplier_id = result[0]
        resolve(supplier)
      })
      .catch(err => {
        consoleUtil.consoleError(err)
        reject(new Error(JSON.stringify(errMsg.errSqlSystemError)))
      })
  })
}
