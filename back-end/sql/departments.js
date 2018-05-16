/**
 * @module 部门处理sql
 */
const sequelize = require('./sequelize')
const errMsg = require('../static/errMsg')
const consoleUtil = require('../util/console')

const selectSql = 'SELECT * FROM department LIMIT :offset, :limit'
const defaultOffset = 0
const defaultLength = 5

const selectByIdSql = 'SELECT * FROM department WHERE department_id=:id'
const insertSql = 'INSERT INTO department (name) VALUES (:name)'

module.exports = {
  selectDepartments,
  selectDepartmentById,
  insertDepartment
}

/**
 * 获取部门信息
 * @param {number|string} offset 起点
 * @param {number|string} limit 长度
 * @example [{ department_id: 1, name: '人事管理'},
  { department_id: 2, name: '财务' },
  { department_id: 3, name: '人力资源' },
  { department_id: 4, name: '后勤管理' },
  { department_id: 5, name: '安全技术' } ]
 */
function selectDepartments (offset, limit) {
  offset = offset || defaultOffset
  limit = limit || defaultLength
  offset -= 0
  limit -= 0
  return new Promise((resolve, reject) => {
    sequelize.query(selectSql, {
      replacements: {offset, limit},
      type: sequelize.QueryTypes.SELECT
    }).then(departments => {
      resolve(departments)
    }).catch(err => {
      consoleUtil.consoleError(err)
      reject(JSON.stringify(errMsg.errSqlSystemError))
    })
  })
}

/**
 * 查询指定id部门
 * @param {number|string} id 部门的id
 * @returns {Promise}
 * @example [{department_id: 5, name: '安全技术'}]
 */
function selectDepartmentById (id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject(new Error(JSON.stringify(errMsg.errSqlInsertParamLack)))
      return
    }
    sequelize.query(selectByIdSql, {
      replacements: {id},
      type: sequelize.QueryTypes.SELECT
    }).then(department => {
      resolve(department)
    }).catch(err => {
      consoleUtil.consoleError(err)
      reject(JSON.stringify(errMsg.errSqlSystemError))
    })
  })
}

/**
 * 插入一个部门信息
 * @param {string} name - 部门名称
 * @returns {Promise} 返回[a,b] a--id b--count
 */
function insertDepartment (name) {
  return new Promise((resolve, reject) => {
    if (!name) {
      reject(new Error(JSON.stringify(errMsg.errSqlInsertParamLack)))
      return
    }
    sequelize.query(insertSql, {
      replacements: {name},
      type: sequelize.QueryTypes.INSERT
    })
      .then(result => {
        const newDepartment = {name: name, department_id: result[0]}
        resolve(newDepartment)
      })
      .catch(err => {
        consoleUtil.consoleError(err)
        reject(new Error(JSON.stringify(errMsg.errSqlSystemError)))
      })
  })
}
